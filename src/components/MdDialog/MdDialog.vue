<script>
import { h, KeepAlive, Transition } from "vue"
import MdComponent from "@/core/MdComponent"
import MdPortal from "@/components/MdPortal/MdPortal.vue"
import MdOverlay from "@/components/MdOverlay/MdOverlay.vue"
import MdFocusTrap from "@/components/MdFocusTrap/MdFocusTrap.vue"

export default MdComponent({
	name: "MdDialog",
	inheritAttrs: false,
	components: { MdPortal, MdOverlay, MdFocusTrap },
	props: {
		mdActive: Boolean,
		mdBackdrop: { type: Boolean, default: true },
		mdBackdropClass: { type: String, default: "md-dialog-overlay" },
		mdCloseOnEsc: { type: Boolean, default: true },
		mdClickOutsideToClose: { type: Boolean, default: true },
		mdFullscreen: { type: Boolean, default: true },
		mdKeepAlive: { type: Boolean, default: false },
		mdAnimateFromSource: Boolean,
	},
	computed: {
		dialogClasses() {
			return { "md-active": this.mdActive }
		},
		dialogContainerClasses() {
			return { "md-dialog-fullscreen": this.mdFullscreen }
		},
	},
	watch: {
		mdActive(isActive) {
			this.$nextTick().then(() => {
				this.$emit(isActive ? "md-opened" : "md-closed")
				if (isActive && this.mdKeepAlive) {
					// Mirror old behavior: dispatch resize when showing a kept-alive dialog
					if (typeof window !== "undefined") {
						window.dispatchEvent(new Event("resize"))
					}
				}
			})
		},
	},
	methods: {
		closeDialog() {
			this.$emit("update:mdActive", false)
		},
		onClick() {
			if (this.mdClickOutsideToClose) this.closeDialog()
			this.$emit("md-clicked-outside")
		},
		onEsc(e) {
			if (this.mdCloseOnEsc && (e.key === "Escape" || e.keyCode === 27))
				this.closeDialog()
		},
	},
	render() {
		const overlay = this.mdBackdrop
			? h(KeepAlive, null, {
					default: () =>
						h(
							MdOverlay,
							{
								class: this.mdBackdropClass,
								mdFixed: true,
								mdActive: this.mdActive,
								onClick: this.onClick,
							},
							null
						),
			  })
			: null

		const container = h(
			"div",
			{
				class: [
					"md-dialog-container",
					this.dialogContainerClasses,
					this.$mdActiveTheme,
				],
				onKeydown: this.onEsc,
				...this.$attrs,
			},
			[this.$slots.default ? this.$slots.default() : null, overlay]
		)

    const body = h(
      "div",
      { class: "md-dialog", style: this.mdActive ? undefined : { display: "none" } },
      [
        h(MdFocusTrap, null, { default: () => [container] }),
      ]
    )

		// Always keep Transition and Teleport (MdPortal) mounted to avoid unmount glitches.
		// Toggle visibility with v-show on the dialog body. Using `persisted` ensures v-show transitions behave correctly.
    const content = h(
      Transition,
      { name: "md-dialog", appear: this.mdActive, persisted: true },
      { default: () => body }
    )

		return h(MdPortal, null, { default: () => [content] })
	},
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdLayout/mixins";
@import "@/components/MdElevation/mixins";

$opacity-transition-duration: 0.15s;
$transform-transition-duration: 0.2s;
$max-duration: max(
	$opacity-transition-duration,
	$transform-transition-duration
);

.md-dialog {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	align-items: center;
	justify-content: center;
	pointer-events: none;
	display: flex;
	transition-duration: $max-duration;
	z-index: 110;
}
.md-dialog.md-dialog-leave,
.md-dialog.md-dialog-enter-to {
	.md-dialog-container {
		opacity: 1;
		transform: scale(1);
	}
	.md-dialog-fullscreen {
		@include md-layout-xsmall {
			opacity: 0;
			transform: translate(0, 30%);
		}
	}
}
.md-dialog.md-dialog-enter,
.md-dialog.md-dialog-leave-to {
	.md-dialog-container {
		opacity: 0;
		transform: scale(0.9);
	}
	.md-dialog-fullscreen {
		@include md-layout-xsmall {
			opacity: 1;
			transform: translate(0, 0);
		}
	}
}

.md-dialog-container {
	@include md-elevation(24);
	min-width: 280px;
	max-width: 80%;
	max-height: 80%;
	margin: auto;
	display: flex;
	flex-flow: column;
	overflow: hidden;
	border-radius: 2px;
	backface-visibility: hidden;
	pointer-events: auto;
	opacity: 1;
	transform-origin: center center;
	transition: opacity $opacity-transition-duration $md-transition-stand-timing,
		transform $transform-transition-duration $md-transition-stand-timing;
	will-change: opacity, transform;
}
.md-dialog-container.md-dialog-leave,
.md-dialog-container.md-dialog-enter-to {
	opacity: 1;
	transform: translate(-50%, -50%) scale(1);
}
.md-dialog-container.md-dialog-enter,
.md-dialog-container.md-dialog-leave-to {
	opacity: 0;
	transform: translate(-50%, -50%) scale(0.9);
}

.md-dialog-container .md-tabs {
	flex: 1;
	max-width: 100%;
}
.md-dialog-container .md-tabs-navigation {
	padding: 0 12px;
}
.md-dialog-container .md-tab {
	@include md-layout-xsmall {
		padding: 12px;
	}
}

.md-dialog-fullscreen {
	@include md-layout-xsmall {
		width: 100%;
		height: 100%;
		max-width: 100%;
		max-height: 100%;
		border-radius: 0;
		transform: none;
		&.md-dialog-enter,
		&.md-dialog-leave-to {
			opacity: 0;
			transform: translate3D(0, 30%, 0);
		}
		&.md-dialog-leave,
		&.md-dialog-enter-to {
			opacity: 1;
			transform: translate3D(0, 0, 0);
		}
	}
}
</style>
