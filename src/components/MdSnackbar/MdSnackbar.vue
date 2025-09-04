<script>
import { h, KeepAlive } from "vue"
import MdComponent from "@/core/MdComponent"
import MdPortal from "@/components/MdPortal/MdPortal.vue"
import MdSnackbarContent from "./MdSnackbarContent.vue"
import { createSnackbar, destroySnackbar } from "./MdSnackbarQueue"

export default MdComponent({
	name: "MdSnackbar",
	components: { MdPortal, MdSnackbarContent },
	props: {
		mdActive: Boolean,
		mdPersistent: Boolean,
		mdDuration: { type: Number, default: 4000 },
		mdPosition: { type: String, default: "center" },
	},
	data() {
		return {
			renderActive: false,
		}
	},
	computed: {
		snackbarClasses() {
			return { ["md-position-" + this.mdPosition]: true }
		},
	},
	watch: {
		mdActive(isActive) {
			if (isActive) {
				this.renderActive = true
				createSnackbar(this.mdDuration, this.mdPersistent, this).then(() => {
					this.$emit("update:mdActive", false)
					this.$emit("md-opened")
				})
			} else {
				this.renderActive = false
				destroySnackbar()
				this.$emit("md-closed")
			}
		},
	},
	methods: {
		__startLeave() {
			this.renderActive = false
		},
	},
	render() {
		const contentVNode = this.renderActive
			? h(
					MdSnackbarContent,
					{ mdClasses: [this.snackbarClasses, this.$mdActiveTheme] },
					this.$slots.default
						? { default: () => this.$slots.default() }
						: undefined
			  )
			: null

		if (this.mdPersistent && this.mdDuration !== Infinity) {
			// keep-alive wrapper for persistent timed snackbars
			return h(MdPortal, null, {
				default: () => h(KeepAlive, null, { default: () => contentVNode }),
			})
		}

		return h(MdPortal, null, { default: () => contentVNode })
	},
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdLayout/mixins";
@import "@/components/MdElevation/mixins";
@import "@/components/MdCard/base";

.md-snackbar {
	@include md-elevation(6);
	min-width: 288px;
	max-width: 568px;
	min-height: 48px;
	max-height: 80px;
	padding: 14px 24px;
	display: flex;
	align-items: center;
	position: fixed;
	z-index: 1000;
	border-radius: 2px;
	transition: 0.4s $md-transition-default-timing;
	will-change: background-color, color, opacity, transform;

	&.md-position-center {
		margin: 0 auto;
		right: 0;
		bottom: 0;
		left: 0;
		&.md-snackbar-enter,
		&.md-snackbar-leave-active {
			transform: translate3D(0, calc(100% + 8px), 0);
		}
	}

	&.md-position-left {
		bottom: 24px;
		left: 24px;
		&.md-snackbar-enter,
		&.md-snackbar-leave-active {
			transform: translate3D(0, calc(100% + 32px), 0);
		}
	}

	@include md-layout-xsmall {
		left: 0;
		transform: none;
		border-radius: 0;
	}
}

.md-snackbar-enter,
.md-snackbar-leave-active {
	opacity: 0;
	.md-snackbar-content {
		opacity: 0;
	}
}

.md-snackbar-content {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: opacity 0.38s $md-transition-drop-timing;
	.md-button {
		min-width: 0;
		margin: -8px -8px -8px 36px;
		@include md-layout-xsmall {
			margin-left: 12px;
		}
		+ .md-button {
			margin-left: 16px;
		}
	}
}
</style>
