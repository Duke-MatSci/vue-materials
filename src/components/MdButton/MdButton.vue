<script>
import { h, resolveComponent } from "vue"
import MdComponent from "../../core/MdComponent"
import MdFocused from "../../core/mixins/MdFocused/MdFocused"
import MdRipple from "../../core/mixins/MdRipple/MdRipple"
import MdRouterLink from "../../core/mixins/MdRouterLink/MdRouterLink"

export default MdComponent({
	name: "MdButton",
	mixins: [MdRipple, MdFocused, MdRouterLink],
  props: {
		href: String,
		type: {
			type: String,
			default: "button",
		},
		disabled: Boolean,
		mdRipple: {
			type: Boolean,
			default: true,
		},
		to: [String, Object],
		replace: Boolean,
		append: Boolean,
		activeClass: String,
		exact: Boolean,
		event: [String, Array],
		exactActiveClass: String,
  },
  emits: [
		"click",
		"touchstart",
		"touchmove",
		"mousedown",
		"update:mdRippleActive",
	],
	data() {
		return {
			rippleActive: false,
		}
	},
  computed: {
		rippleWorks() {
			return this.mdRipple && !this.disabled
		},
    isRouterLink() {
      const gp =
        (this.$ &&
          this.$.appContext &&
          this.$.appContext.config &&
          this.$.appContext.config.globalProperties) ||
        {}
      return !!gp.$router && !!this.to
    },
		tag() {
			if (this.href) {
				return "a"
			} else if (this.isRouterLink) {
				return "router-link"
			}
			return "button"
		},
		buttonType() {
			if (this.href || this.to) {
				return undefined
			}
			return this.type || "button"
		},
		buttonClasses() {
			return [
				"md-button",
				this.$mdActiveTheme,
				{
					"md-ripple-off": !this.mdRipple,
					"md-focused": this.mdHasFocus,
				},
			]
		},
  },
  watch: {},
  methods: {
		handleTouchStart(event) {
			if (this.rippleWorks) {
				this.rippleActive = event
			}
			// Emit the event for parent components to handle
			this.$emit("touchstart", event)
		},
		handleTouchMove(event) {
			if (this.rippleWorks) {
				this.rippleActive = event
			}
			// Emit the event for parent components to handle
			this.$emit("touchmove", event)
		},
		handleMouseDown(event) {
			if (this.rippleWorks) {
				this.rippleActive = event
			}
			// Emit the event for parent components to handle
			this.$emit("mousedown", event)
		},
		handleRippleActiveUpdate(active) {
			this.rippleActive = active
			// Emit the update for parent components
			this.$emit("update:mdRippleActive", active)
		},
  },
  render() {
    // Inherit external attrs and merge classes cleanly
    const { class: externalClass, ...externalAttrs } = this.$attrs || {}
    // Build the ripple content structure directly
    const rippleContent = h("div", { class: "md-ripple" }, [
      h(
        "div",
        { class: "md-button-content" },
        this.$slots.default ? this.$slots.default() : []
      ),
      h("div"), // Empty div for ripple wave
    ])

		// Build the ripple component with proper props
		const rippleComponent = h(
			"md-ripple",
			{
				mdDisabled: !this.mdRipple || this.disabled,
				mdEventTrigger: false,
				mdActive: this.rippleActive,
				onUpdateMdActive: this.handleRippleActiveUpdate,
			},
			[rippleContent]
		)

		// Build button attributes - separate props from events
    const baseClass = [this.buttonClasses, externalClass]
    const buttonProps = {
      ...externalAttrs,
      class: baseClass,
      href: this.href,
      disabled: this.disabled,
      type: this.buttonType,
    }

		// Build event handlers using Vue 3 event system
		const buttonEvents = {
			onTouchstart: this.handleTouchStart,
			onTouchmove: this.handleTouchMove,
			onMousedown: this.handleMouseDown,
			onClick: (event) => this.$emit("click", event),
		}

		// Add router-specific props if needed
    if (this.isRouterLink) {
      const activeClass = this.$props.activeClass || this.$material.router.linkActiveClass
      const baseExact = this.$props.exactActiveClass || 'router-link-exact-active'
      const exactActiveClass = `${baseExact} md-active`
      // RouterLink expects its props at the root in Vue 3
      Object.assign(buttonProps, {
        to: this.$props.to,
        replace: this.$props.replace,
        // append is a Vue Router v3 prop; safe to pass if users still rely on it
        append: this.$props.append,
        // exact is a Vue Router v3 prop; ignored by v4
        exact: this.$props.exact,
        activeClass,
        exactActiveClass,
      })
      // Remove conflicting native props
      delete buttonProps.type
      delete buttonProps.href
      // Do not forward `disabled` to RouterLink/anchor to avoid pointer-events:none CSS
      if (!this.disabled) {
        delete buttonProps.disabled
      }
    }

		// Create the button element with proper Vue 3 h function structure
    const tag = this.tag === "router-link" ? resolveComponent("RouterLink") : this.tag
    if (this.isRouterLink && typeof tag === 'object') {
      return h(tag, { ...buttonProps, ...buttonEvents }, { default: () => [rippleComponent] })
    }
    return h(tag, { ...buttonProps, ...buttonEvents }, [rippleComponent])
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdElevation/mixins";
@import "@/components/MdElevation/variables";

$md-button-min-width: 88px;
$md-button-height: 36px;
$md-button-radius: 2px;
$md-button-font-size: 14px;

$md-button-dense-height: 32px;

$md-button-icon-size: 40px;

$md-button-fab-size: 56px;
$md-button-fab-size-mini: $md-button-icon-size;

.md-button-clean {
	margin: 0;
	padding: 0;
	display: inline-block;
	position: relative;
	overflow: hidden;
	outline: none;
	background: transparent;
	border: 0;
	border-radius: 0;
	transition: $md-transition-default;
	font-family: inherit;
	line-height: normal;
	text-decoration: none;
	vertical-align: top;
	white-space: nowrap;
}

.md-button {
	@extend .md-button-clean;
	min-width: $md-button-min-width;
	height: $md-button-height;
	margin: 6px 8px;
	user-select: none;
	border-radius: $md-button-radius;
	font-size: $md-button-font-size;
	font-weight: 500;
	text-transform: uppercase;

	&:active {
		outline: none;
	}

	&[disabled] {
		pointer-events: none;
	}

	&:not([disabled]) {
		cursor: pointer;

		&:hover,
		&:active,
		&.md-focused {
			&:before {
				background-color: currentColor;
				opacity: 0.12;
			}
		}

		&.md-focused {
			&.md-primary,
			&.md-accent {
				&:before {
					opacity: 0.2;
				}
			}
		}

		&:active {
			&:before {
				opacity: 0.2;
			}
		}

		&.md-ripple-off:active:before {
			opacity: 0.26;
		}
	}

	&.md-plain.md-button.md-raised:not([disabled]) {
		color: rgba(#000, 0.87);
		background-color: #fff;

		.md-icon-font {
			color: rgba(#000, 0.87);
		}

		.md-icon-image {
			fill: rgba(#000, 0.87);
		}
	}

	&::-moz-focus-inner {
		padding: 0;
		border: 0;
	}

	&:before {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 1;
		opacity: 0;
		transition: $md-transition-default;
		will-change: background-color, opacity;
		content: " ";
	}

	&.md-dense {
		height: $md-button-dense-height;
		font-size: 13px;
	}

	&.md-raised:not([disabled]) {
		@include md-elevation(2);

		&:active {
			@include md-elevation(8);
		}

		&.md-ripple-off:active:before {
			opacity: 0.2;
		}
	}

	+ .md-button {
		margin-left: 0;
	}

	.md-ripple {
		padding: 0 8px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
}

.md-button-spaced .md-ripple {
	padding: 0 16px;
}

.md-icon-button,
.md-fab {
	border-radius: 50%;
	z-index: 10;

	&:before {
		border-radius: 50%;
	}

	.md-ripple {
		border-radius: 50%;
	}
}

.md-icon-button,
.md-fab.md-mini,
.md-fab.md-dense {
	.md-ripple-wave {
		top: 0 !important;
		right: 0 !important;
		bottom: 0 !important;
		left: 0 !important;
	}
}

.md-icon-button {
	width: $md-button-icon-size;
	min-width: $md-button-icon-size;
	height: $md-button-icon-size;
	margin: 0 6px;

	&.md-dense {
		width: $md-button-dense-height;
		min-width: $md-button-dense-height;
		height: $md-button-dense-height;
	}

	.md-ripple-enter-active {
		transition-duration: 1.2s;
	}
}

.md-fab {
	@include md-elevation(6);

	width: $md-button-fab-size;
	height: $md-button-fab-size;
	min-width: 0;
	overflow: hidden;

	&:active {
		@include md-elevation(12);
	}

	&.md-mini,
	&.md-dense {
		width: $md-button-fab-size-mini;
		height: $md-button-fab-size-mini;
	}

	&.md-fab-top-right,
	&.md-fab-top-left {
		position: absolute;
		top: 24px;
	}

	&.md-fab-bottom-right,
	&.md-fab-bottom-left {
		position: absolute;
		bottom: 24px;
	}

	&.md-fab-top-center,
	&.md-fab-bottom-center {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
	}

	&.md-fab-top-center {
		top: 24px;
	}

	&.md-fab-bottom-center {
		bottom: 24px;
	}

	&.md-fab-top-right,
	&.md-fab-bottom-right {
		right: 24px;
	}

	&.md-fab-top-left,
	&.md-fab-bottom-left {
		left: 24px;
	}

	&.md-fixed {
		position: fixed;
	}

	.md-ripple {
		padding: 0;
	}
}
</style>
