<template>
	<div ref="portalElement" data-portal>
		<slot />
	</div>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue"
import raf from "raf"

export default {
	name: "MdPortal",
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
	emits: ["md-destroy", "md-initial-parent"],
	setup(props, { emit }) {
		const portalElement = ref(null)
		const leaveTimeout = ref(null)
		const originalParentEl = ref(null)

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
				el.parentNode.removeChild(el)
			}
		}

		const initDestroy = (manualCall) => {
			let el = portalElement.value

			if (manualCall && portalElement.value.nodeType === Node.COMMENT_NODE) {
				el = portalElement.value
			}

			el.classList.add("v-leave")
			el.classList.add("v-leave-active")

			nextTick().then(() => {
				el.classList.add("v-leave-to")

				clearTimeout(leaveTimeout.value)
				leaveTimeout.value = setTimeout(() => {
					destroyElement(el)
				}, getTransitionDuration(el))
			})
		}

		const destroyElement = (el) => {
			raf(() => {
				el.classList.remove("v-leave")
				el.classList.remove("v-leave-active")
				el.classList.remove("v-leave-to")
				emit("md-destroy")
				killGhostElement(el)
			})
		}

		const changeParentEl = (newTarget) => {
			if (newTarget && portalElement.value) {
				newTarget.appendChild(portalElement.value)
			}
		}

		onMounted(() => {
			if (!originalParentEl.value) {
				originalParentEl.value = portalElement.value.parentNode
				emit("md-initial-parent", portalElement.value.parentNode)
			}

			if (props.mdAttachToParent && portalElement.value.parentNode.parentNode) {
				changeParentEl(portalElement.value.parentNode.parentNode)
			} else if (document) {
				changeParentEl(props.mdTarget || document.body)
			}
		})

		onBeforeUnmount(() => {
			if (portalElement.value && portalElement.value.classList) {
				initDestroy()
			} else if (portalElement.value) {
				killGhostElement(portalElement.value)
			}
		})

		watch(
			() => props.mdTarget,
			(newTarget, oldTarget) => {
				changeParentEl(newTarget)

				if (oldTarget) {
					// Force re-render
					nextTick()
				}
			}
		)

		return {
			portalElement,
		}
	},
}
</script>
