import raf from "raf"
import {
	ref,
	computed,
	watch,
	onMounted,
	onBeforeUnmount,
	nextTick,
	getCurrentInstance,
} from "vue"

export default {
	name: "MdPortal",
	abstract: true,
	props: {
		mdAttachToParent: Boolean,
		mdTarget: {
			type: null,
			validator(value) {
				if (HTMLElement && value && value instanceof HTMLElement) {
					return true
				}

				console.warn(
					"The md-target-el prop is invalid. You should pass a valid HTMLElement."
				)
				return false
			},
		},
	},
	setup(props, { emit, slots }) {
		const instance = getCurrentInstance()
		const leaveTimeout = ref(null)
		const originalParentEl = ref(null)
		const portalEl = ref(null)

		const transitionName = computed(() => {
			const childrenComponent = instance.vnode.componentOptions?.children?.[0]

			if (childrenComponent) {
				const transition = childrenComponent.data?.transition

				if (transition) {
					return transition.name
				} else {
					const transition = childrenComponent.componentOptions?.propsData?.name

					if (transition) {
						return transition
					}
				}
			}

			return "v"
		})

		const leaveClass = computed(() => {
			return transitionName.value + "-leave"
		})

		const leaveActiveClass = computed(() => {
			return transitionName.value + "-leave-active"
		})

		const leaveToClass = computed(() => {
			return transitionName.value + "-leave-to"
		})

		const getTransitionDuration = (el) => {
			const duration = window.getComputedStyle(el).transitionDuration
			const num = parseFloat(duration, 10)
			let unit = duration.match(/m?s/)

			if (unit) {
				unit = unit[0]
			}

			if (unit === "s") {
				return num * 1000
			}

			if (unit === "ms") {
				return num
			}

			return 0
		}

		const killGhostElement = (el) => {
			if (el.parentNode) {
				changeParentEl(originalParentEl.value)
				instance.vnode.el = originalParentEl.value
				el.parentNode.removeChild(el)
			}
		}

		const initDestroy = (manualCall) => {
			let el = portalEl.value

			if (manualCall && portalEl.value.nodeType === Node.COMMENT_NODE) {
				el = instance.vnode.elm
			}

			el.classList.add(leaveClass.value)
			el.classList.add(leaveActiveClass.value)

			nextTick().then(() => {
				el.classList.add(leaveToClass.value)

				clearTimeout(leaveTimeout.value)
				leaveTimeout.value = setTimeout(() => {
					destroyElement(el)
				}, getTransitionDuration(el))
			})
		}

		const destroyElement = (el) => {
			raf(() => {
				el.classList.remove(leaveClass.value)
				el.classList.remove(leaveActiveClass.value)
				el.classList.remove(leaveToClass.value)
				emit("md-destroy")
				killGhostElement(el)
			})
		}

		const changeParentEl = (newTarget) => {
			newTarget && newTarget.appendChild(portalEl.value)
		}

		watch(
			() => props.mdTarget,
			(newTarget, oldTarget) => {
				changeParentEl(newTarget)

				if (oldTarget) {
					instance.proxy.$forceUpdate()
				}
			}
		)

		onMounted(() => {
			portalEl.value = instance.proxy.$el

			if (!originalParentEl.value) {
				originalParentEl.value = portalEl.value.parentNode
				emit("md-initial-parent", portalEl.value.parentNode)
			}

			if (props.mdAttachToParent && portalEl.value.parentNode.parentNode) {
				changeParentEl(portalEl.value.parentNode.parentNode)
			} else if (document) {
				changeParentEl(props.mdTarget || document.body)
			}
		})

		onBeforeUnmount(() => {
			if (portalEl.value?.classList) {
				initDestroy()
			} else {
				killGhostElement(portalEl.value)
			}
		})

		return () => {
			const defaultSlot = slots.default

			if (defaultSlot && defaultSlot[0]) {
				return defaultSlot[0]
			}
		}
	},
}
