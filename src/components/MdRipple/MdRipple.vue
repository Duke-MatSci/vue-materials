<template>
	<div
		class="md-ripple"
		:class="rippleClasses"
		@touchstart="onTouchStart"
		@touchend="onTouchEnd"
		@mousedown="onMouseDown"
		@mouseup="onMouseUp"
		@mouseleave="onMouseLeave"
	>
		<slot />
		<transition-group name="md-ripple-wave" tag="div" class="md-ripple-waves">
			<div
				v-for="wave in waves"
				:key="wave.id"
				class="md-ripple-wave"
				:style="wave.style"
				@animationend="removeWave(wave.id)"
			/>
		</transition-group>
	</div>
</template>

<script>
import { ref, computed, watch } from "vue"

export default {
	name: "MdRipple",
	props: {
		mdDisabled: {
			type: Boolean,
			default: false,
		},
		mdEventTrigger: {
			type: Boolean,
			default: true,
		},
		mdActive: {
			type: [Boolean, Object],
			default: false,
		},
	},
	emits: ["update:mdActive"],
	setup(props, { emit }) {
		const waves = ref([])
		const isActive = ref(false)
		const waveId = ref(0)

		const rippleClasses = computed(() => ({
			"md-ripple-disabled": props.mdDisabled,
			"md-ripple-active": isActive.value,
		}))

		const getRippleElement = () => {
			return document.querySelector(".md-ripple")
		}

		const getRippleRect = () => {
			const element = getRippleElement()
			if (!element) return null

			const rect = element.getBoundingClientRect()
			return {
				width: rect.width,
				height: rect.height,
				left: rect.left,
				top: rect.top,
			}
		}

		const getRippleSize = (rect) => {
			const size = Math.max(rect.width, rect.height)
			return size * 2
		}

		const getRipplePosition = (event, rect) => {
			let x, y

			if (event.touches && event.touches.length) {
				x = event.touches[0].clientX
				y = event.touches[0].clientY
			} else {
				x = event.clientX
				y = event.clientY
			}

			return {
				x: x - rect.left - rect.width / 2,
				y: y - rect.top - rect.height / 2,
			}
		}

		const createWave = (event) => {
			if (props.mdDisabled) return

			const rect = getRippleRect()
			if (!rect) return

			const size = getRippleSize(rect)
			const position = getRipplePosition(event, rect)

			const wave = {
				id: waveId.value++,
				style: {
					width: `${size}px`,
					height: `${size}px`,
					left: `${position.x}px`,
					top: `${position.y}px`,
				},
			}

			waves.value.push(wave)
			isActive.value = true
			emit("update:mdActive", true)
		}

		const removeWave = (id) => {
			const index = waves.value.findIndex((wave) => wave.id === id)
			if (index > -1) {
				waves.value.splice(index, 1)
			}

			if (waves.value.length === 0) {
				isActive.value = false
				emit("update:mdActive", false)
			}
		}

		const onTouchStart = (event) => {
			if (props.mdEventTrigger) {
				createWave(event)
			}
		}

		const onTouchEnd = () => {
			// Touch events are handled by animationend
		}

		const onMouseDown = (event) => {
			if (props.mdEventTrigger) {
				createWave(event)
			}
		}

		const onMouseUp = () => {
			// Mouse events are handled by animationend
		}

		const onMouseLeave = () => {
			// Mouse events are handled by animationend
		}

		// Watch for mdActive prop changes
		watch(
			() => props.mdActive,
			(newValue) => {
				if (newValue) {
					isActive.value = true
				}
			},
			{ immediate: true }
		)

		return {
			waves,
			isActive,
			rippleClasses,
			createWave,
			removeWave,
			onTouchStart,
			onTouchEnd,
			onMouseDown,
			onMouseUp,
			onMouseLeave,
		}
	},
}
</script>

<style lang="scss">
@import "../MdAnimation/variables";

.md-ripple {
	position: relative;
	overflow: hidden;
	display: block;
	width: 100%;
	height: 100%;

	&.md-ripple-disabled {
		pointer-events: none;
	}

	&.md-ripple-active {
		pointer-events: none;
	}
}

.md-ripple-waves {
	position: absolute;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	pointer-events: none;
}

.md-ripple-wave {
	position: absolute;
	border-radius: 50%;
	background-color: currentColor;
	opacity: 0.3;
	transform: scale(0);
	animation: md-ripple-wave 0.6s ease-out;
	pointer-events: none;
}

@keyframes md-ripple-wave {
	0% {
		transform: scale(0);
		opacity: 0.3;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}

.md-ripple-wave-enter-active {
	transition: all 0.6s ease-out;
}

.md-ripple-wave-leave-active {
	transition: all 0.6s ease-out;
}

.md-ripple-wave-enter-from {
	transform: scale(0);
	opacity: 0.3;
}

.md-ripple-wave-leave-to {
	transform: scale(1);
	opacity: 0;
}
</style>
