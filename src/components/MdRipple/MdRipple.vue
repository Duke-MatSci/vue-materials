<template>
	<div
		:class="['md-ripple', rippleClasses]"
		@touchstart.passive="(event) => mdEventTrigger && touchStartCheck(event)"
		@touchmove.passive="(event) => mdEventTrigger && touchMoveCheck(event)"
		@mousedown.passive="(event) => mdEventTrigger && startRipple(event)"
	>
		<slot />
		<div v-if="!isDisabled">
			<md-wave
				v-for="ripple in ripples"
				:key="ripple.uuid"
				:class="['md-ripple-wave', waveClasses]"
				:style="ripple.waveStyles"
				@md-end="clearWave(ripple.uuid)"
			/>
		</div>
	</div>
</template>

<script>
import { ref, computed, watch, onMounted } from "vue"
import MdWave from "./MdWave.vue"

export default {
	name: "MdRipple",
	components: {
		MdWave,
	},
	props: {
		mdActive: null,
		mdDisabled: Boolean,
		mdCentered: Boolean,
		mdEventTrigger: {
			type: Boolean,
			default: true,
		},
	},
	emits: ["update:mdActive"],
	setup(props, { emit }) {
		const ripples = ref([])
		const touchTimeout = ref(null)
		const eventType = ref(null)

		const isDisabled = computed(() => {
			return props.mdDisabled
		})

		const rippleClasses = computed(() => {
			return {
				"md-disabled": isDisabled.value,
			}
		})

		const waveClasses = computed(() => {
			return {
				"md-centered": props.mdCentered,
			}
		})

		watch(
			() => props.mdActive,
			(active) => {
				const isBoolean = typeof active === "boolean"
				const isEvent = active instanceof MouseEvent

				if (isBoolean && props.mdCentered && active) {
					startRipple({
						type: "mousedown",
					})
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
					let size = getSize()
					let position = null

					if (props.mdCentered) {
						position = getCenteredPosition(size)
					} else {
						position = getHitPosition($event, size)
					}

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

			return {
				...position,
				width: size,
				height: size,
			}
		}

		const clearWave = (uuid) => {
			if (uuid) {
				ripples.value = ripples.value.filter((ripple) => ripple.uuid !== uuid)
			} else {
				ripples.value = []
			}
		}

		const getSize = () => {
			// This would need to be implemented with template refs in Vue 3
			return 100 // Default size
		}

		const getCenteredPosition = (size) => {
			const halfSize = -size / 2 + "px"

			return {
				"margin-top": halfSize,
				"margin-left": halfSize,
			}
		}

		const getHitPosition = ($event, elementSize) => {
			// This would need to be implemented with template refs in Vue 3
			return {
				top: "50%",
				left: "50%",
			}
		}

		const generateUuid = () => {
			return Math.random().toString(36).substr(2, 9)
		}

		return {
			ripples,
			touchTimeout,
			eventType,
			isDisabled,
			rippleClasses,
			waveClasses,
			touchMoveCheck,
			touchStartCheck,
			startRipple,
			clearWave,
		}
	},
}
</script>

<style lang="scss" scoped>
@import "../../components/MdAnimation/variables";

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
