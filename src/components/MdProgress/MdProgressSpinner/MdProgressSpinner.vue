<script>
import { h, Transition } from "vue"
import MdComponent from "@/core/MdComponent"
import MdPropValidator from "@/core/utils/MdPropValidator"

const MdProgressSpinner = {
	styleTag: null,
	diameters: new Set(),
}

export default MdComponent({
	name: "MdProgressSpinner",
	props: {
		mdValue: {
			type: Number,
			default: 0,
		},
		mdDiameter: {
			type: Number,
			default: 60,
		},
		mdStroke: {
			type: Number,
			default: 6,
		},
		mdMode: {
			type: String,
			default: "determinate",
			...MdPropValidator("md-mode", ["determinate", "indeterminate"]),
		},
	},
	computed: {
		isDeterminate() {
			return this.mdMode === "determinate"
		},
		isIndeterminate() {
			return this.mdMode === "indeterminate"
		},
		isIE() {
			if (typeof navigator !== "undefined") {
				return navigator.userAgent.toLowerCase().includes("trident")
			}
			return false
		},
		progressClasses() {
			let animationClass = "md-progress-spinner-indeterminate"

			if (this.isIE) {
				animationClass += "-fallback"
			}

			return {
				[animationClass]: true,
				["md-" + this.mdMode]: true,
			}
		},
		circleRadius() {
			return (this.mdDiameter - this.mdStroke) / 2
		},
		circleStrokeWidth() {
			return this.mdStroke + "px"
		},
		circleCircumference() {
			return 2 * Math.PI * this.circleRadius
		},
		circleStrokeDashArray() {
			return this.circleCircumference + "px"
		},
		circleStrokeDashOffset() {
			if (this.isDeterminate) {
				return (this.circleCircumference * (100 - this.mdValue)) / 100 + "px"
			}

			if (this.isIndeterminate && this.isIE) {
				return this.circleCircumference * 0.2 + "px"
			}

			return null
		},
		viewBox() {
			return `0 0 ${this.mdDiameter} ${this.mdDiameter}`
		},
		svgStyles() {
			const size = `${this.mdDiameter}px`
			return {
				width: size,
				height: size
			}
		},
		circleStyles() {
			const styles = {
				strokeDashoffset: this.circleStrokeDashOffset,
				strokeDasharray: this.circleStrokeDashArray,
				strokeWidth: this.circleStrokeWidth,
				'--md-progress-spinner-start-value': 0.95 * this.circleCircumference + 'px',
				'--md-progress-spinner-end-value': 0.2 * this.circleCircumference + 'px'
			}
			return styles
		},
	},
	render() {
		return h(
			Transition,
			{
				name: "md-progress-spinner",
				appear: true,
			},
			{
				default: () =>
					h(
						"div",
						{
							class: [
								"md-progress-spinner",
								this.progressClasses,
								this.$mdActiveTheme,
							],
						},
						[
							h(
								"svg",
								{
									class: "md-progress-spinner-draw",
									preserveAspectRatio: "xMidYMid meet",
									focusable: "false",
									viewBox: this.viewBox,
									style: this.svgStyles,
								},
								[
									h("circle", {
										class: "md-progress-spinner-circle",
										cx: "50%",
										cy: "50%",
										r: this.circleRadius,
										style: this.circleStyles,
									}),
								]
							),
						]
					),
			}
		)
	},
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

@keyframes md-progress-spinner-rotate {
	0% {
		transform: rotate(0);
	}

	100% {
		transform: rotate(360deg);
	}
}

@keyframes md-progress-spinner-initial-rotate {
	0% {
		opacity: 0;
		transform: rotate(-90deg) translateZ(0);
	}

	20% {
		opacity: 1;
	}

	100% {
		transform: rotate(270deg) translateZ(0);
	}
}

@keyframes md-progress-spinner-stroke-rotate-fallback {
	0% {
		transform: rotate(0);
	}
	25% {
		transform: rotate(1170deg);
	}
	50% {
		transform: rotate(2340deg);
	}
	75% {
		transform: rotate(3510deg);
	}
	100% {
		transform: rotate(4680deg);
	}
}

@keyframes md-progress-spinner-stroke-rotate {
	0% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotate(0);
	}

	12.5% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotate(0);
	}

	12.51% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotateX(180deg) rotate(72.5deg);
	}

	25% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotateX(180deg) rotate(72.5deg);
	}

	25.1% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotate(270deg);
	}

	37.5% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotate(270deg);
	}

	37.51% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotateX(180deg) rotate(161.5deg);
	}

	50% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotateX(180deg) rotate(161.5deg);
	}

	50.01% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotate(180deg);
	}

	62.5% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotate(180deg);
	}

	62.51% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotateX(180deg) rotate(251.5deg);
	}

	75% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotateX(180deg) rotate(251.5deg);
	}

	75.01% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotate(90deg);
	}

	87.5% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotate(90deg);
	}

	87.51% {
		stroke-dashoffset: var(--md-progress-spinner-end-value);
		transform: rotateX(180deg) rotate(341.5deg);
	}

	100% {
		stroke-dashoffset: var(--md-progress-spinner-start-value);
		transform: rotateX(180deg) rotate(341.5deg);
	}
}

.md-progress-spinner {
	display: inline-flex;
	position: relative;

	&.md-indeterminate {
		animation: md-progress-spinner-rotate 2s linear infinite;

		&.md-progress-spinner-enter,
		&.md-progress-spinner-leave-to {
			.md-progress-spinner-draw {
				opacity: 0;
				transform: scale(0.1);
			}
		}

		&.md-progress-spinner-enter-active,
		&.md-progress-spinner-leave-active {
			transition-duration: 0.4s;
			animation: none;
		}

		.md-progress-spinner-circle {
			animation: 4s infinite $md-transition-stand-timing;
			animation-name: md-progress-spinner-stroke-rotate;
		}
	}

	&.md-determinate {
		&.md-progress-spinner-enter-active {
			transition-duration: 2s;

			.md-progress-spinner-draw {
				animation: md-progress-spinner-initial-rotate 1.98s
					$md-transition-stand-timing forwards;
			}
		}

		&.md-progress-spinner-leave-active {
			transition-duration: 2s;

			.md-progress-spinner-draw {
				animation: md-progress-spinner-initial-rotate reverse 1.98s
					$md-transition-stand-timing forwards;
			}
		}

		.md-progress-spinner-draw {
			transition: none;
		}
	}
}

.md-progress-spinner-draw {
	overflow: visible;
	transform: scale(1) rotate(-90deg);
	transform-origin: center;
	transition: 0.4s $md-transition-stand-timing;
	will-change: opacity, transform;
}

.md-progress-spinner-circle {
	fill: none;
	transform-origin: center;
	transition: stroke-dashoffset 0.25s $md-transition-stand-timing;
	will-change: stroke-dashoffset, stroke-dasharray, stroke-width, animation-name,
		r;
}
</style>
