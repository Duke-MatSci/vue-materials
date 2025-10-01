<script>
import { ref, computed, watch, h } from "vue"
import MdWave from "./MdWave.vue"

export default {
	name: "MdRipple",
	inheritAttrs: false,
	components: { MdWave },
	props: {
		mdActive: null,
		mdDisabled: Boolean,
		mdCentered: Boolean,
		mdEventTrigger: { type: Boolean, default: true },
	},
	emits: ["update:mdActive"],
	setup(props, { emit, slots, attrs }) {
		const ripples = ref([])
		const touchTimeout = ref(null)
		const eventType = ref(null)
		const rootEl = ref(null)

		const isDisabled = computed(() => props.mdDisabled)
		const rippleClasses = computed(() => ({ "md-disabled": isDisabled.value }))
		const waveClasses = computed(() => ({ "md-centered": props.mdCentered }))

		watch(
			() => props.mdActive,
			(active) => {
				const isBoolean = typeof active === "boolean"
				const isEvent = active instanceof MouseEvent
				if (isBoolean && props.mdCentered && active) {
					startRipple({ type: "mousedown" })
				} else if (isEvent) {
					startRipple(active)
				}
				emit("update:mdActive", false)
			}
		)

		const touchMoveCheck = () => {
			window.clearTimeout(touchTimeout.value)
		}
		const touchStartCheck = ($event) => {
			touchTimeout.value = window.setTimeout(() => {
				startRipple($event)
			}, 100)
		}
		const startRipple = ($event) => {
			requestAnimationFrame(() => {
				if (
					!isDisabled.value &&
					(!eventType.value || eventType.value === $event.type)
				) {
					const size = getSize()
					const position = props.mdCentered
						? getCenteredPosition(size)
						: getHitPosition($event, size)
					eventType.value = $event.type
					ripples.value.push({
						waveStyles: applyStyles(position, size),
						uuid: generateUuid(),
					})
				}
			})
		}
		const applyStyles = (position, size) => {
			size += "px"
			return { ...position, width: size, height: size }
		}
		const clearWave = (uuid) => {
			if (uuid) {
				ripples.value = ripples.value.filter((ripple) => ripple.uuid !== uuid)
			} else {
				ripples.value = []
			}
		}
		const getSize = () => {
			const el = rootEl.value
			if (!el) return 0
			const { offsetWidth, offsetHeight } = el
			return Math.round(Math.max(offsetWidth, offsetHeight))
		}
		const getCenteredPosition = (size) => ({
			"margin-top": -size / 2 + "px",
			"margin-left": -size / 2 + "px",
		})
		const getHitPosition = ($event, elementSize) => {
			const el = rootEl.value
			if (!el) return { top: "50%", left: "50%" }
			const rect = el.getBoundingClientRect()
			let top = $event.pageY
			let left = $event.pageX
			if (
				$event.type === "touchstart" &&
				$event.changedTouches &&
				$event.changedTouches[0]
			) {
				top = $event.changedTouches[0].pageY
				left = $event.changedTouches[0].pageX
			}
			return {
				top:
					top -
					rect.top -
					elementSize / 2 -
					document.documentElement.scrollTop +
					"px",
				left:
					left -
					rect.left -
					elementSize / 2 -
					document.documentElement.scrollLeft +
					"px",
			}
		}
		const generateUuid = () => Math.random().toString(36).substr(2, 9)

		return () =>
			h(
				"div",
				{
					// Merge incoming attrs (including class/style) into the root
					...(() => {
						const { class: externalClass, ...rest } = attrs || {}
						return {
							...rest,
							// Ensure external classes come first for expected order
							class: [externalClass, "md-ripple", rippleClasses.value],
						}
					})(),
					onVnodeMounted: (vnode) => {
						rootEl.value = vnode && vnode.el ? vnode.el : null
					},
					onVnodeUnmounted: () => {
						rootEl.value = null
					},
					onTouchstartPassive: (event) =>
						props.mdEventTrigger && touchStartCheck(event),
					onTouchmovePassive: (event) =>
						props.mdEventTrigger && touchMoveCheck(event),
					onMousedownPassive: (event) =>
						props.mdEventTrigger && startRipple(event),
				},
				[
					...(slots.default ? slots.default() : []),
					!isDisabled.value
						? h(
								"div",
								null,
								ripples.value.map((ripple) =>
									h(MdWave, {
										key: ripple.uuid,
										class: ["md-ripple-wave", waveClasses.value],
										style: ripple.waveStyles,
										onMdEnd: () => clearWave(ripple.uuid),
									})
								)
						  )
						: null,
				]
			)
	},
}
</script>

<style lang="scss" scoped>
@import "@/components/MdAnimation/variables";

.md-ripple {
	width: 100%;
	height: 100%;
	position: relative;
	z-index: 10;
	overflow: hidden;
	-webkit-mask-image: radial-gradient(circle, #fff 100%, #000 100%);
}

.md-ripple-wave {
	position: absolute;
	z-index: 1;
	pointer-events: none;
	background: currentColor;
	border-radius: 50%;
	opacity: 0;
	transform: scale(2) translateZ(0);

	&.md-centered {
		animation-duration: 1.2s;
		top: 50%;
		left: 50%;
	}
	~ *:not(.md-ripple-wave) {
		position: relative;
		z-index: 2;
	}
}
</style>
