<template>
	<md-svg-loader
		class="md-icon md-icon-image"
		:md-src="mdSrc"
		:class="[$mdActiveTheme]"
		v-if="mdSrc"
		@md-loaded="$emit('md-loaded')"
	/>
	<i class="md-icon md-icon-font" :class="[$mdActiveTheme]" v-else>
		<slot />
	</i>
</template>

<script>
import { h } from "vue"

export default {
	name: "MdIcon",
	emits: ["md-loaded"],
	components: {
		// MdSvgLoader will be created later if needed
	},
	props: {
		mdSrc: String,
	},
	setup(props, { slots, emit }) {
		return () => {
			if (props.mdSrc) {
				// For now, we'll use a simple div since MdSvgLoader isn't created yet
				return h(
					"div",
					{
						class: ["md-icon", "md-icon-image"],
						onClick: () => emit("md-loaded"),
					},
					slots.default ? slots.default() : []
				)
			} else {
				return h(
					"i",
					{
						class: ["md-icon", "md-icon-font"],
					},
					slots.default ? slots.default() : []
				)
			}
		}
	},
}
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
