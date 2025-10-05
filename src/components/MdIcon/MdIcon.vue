<script>
import { h } from "vue"
import MdComponent from "@/core/MdComponent"
import MdSvgLoader from "@/components/MdSvgLoader/MdSvgLoader.vue"

export default MdComponent({
	name: "MdIcon",
	components: {
		MdSvgLoader
	},
	props: {
		mdSrc: String,
	},
	render() {
		// Merge classes from parent component, avoiding duplicates
		const inheritedClasses = this.$attrs.class || []
		const classArray = Array.isArray(inheritedClasses) ? inheritedClasses : [inheritedClasses]

		// Filter out classes we're already adding
		const baseClasses = ["md-icon", "md-icon-font", "md-icon-image"]
		const uniqueInheritedClasses = classArray.filter(c =>
			typeof c === 'string' ? !baseClasses.includes(c) : true
		)

		if (this.mdSrc) {
			return h(
				MdSvgLoader,
				{
					class: ["md-icon", "md-icon-image", this.$mdActiveTheme, ...uniqueInheritedClasses],
					mdSrc: this.mdSrc,
					onMdLoaded: () => this.$emit("md-loaded")
				}
			)
		} else {
			return h(
				"i",
				{
					class: ["md-icon", "md-icon-font", this.$mdActiveTheme, ...uniqueInheritedClasses]
				},
				this.$slots.default ? this.$slots.default() : []
			)
		}
	}
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "./mixins";

$icon-size: 24px;

.md-icon {
	@include md-icon-size($icon-size);
	margin: auto;
	display: inline-flex;
	user-select: none;
	align-items: center;
	justify-content: center;
	vertical-align: middle;

	&.md-size-2x {
		@include md-icon-size($icon-size * 2);
	}

	&.md-size-3x {
		@include md-icon-size($icon-size * 3);
	}

	&.md-size-4x {
		@include md-icon-size($icon-size * 4);
	}

	&.md-size-5x {
		@include md-icon-size($icon-size * 5);
	}
}

.md-icon-image {
	svg {
		height: 100%;
		flex: 1;
		transition: fill 0.4s $md-transition-default-timing;
	}
}

.md-icon {
	transition: color 0.4s $md-transition-default-timing;
	direction: ltr;
	font-family: "Material Icons";
	font-feature-settings: "liga";
	font-style: normal;
	letter-spacing: normal;
	line-height: 1;
	text-rendering: optimizeLegibility;
	text-transform: none;
	word-wrap: normal;
	white-space: nowrap;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
