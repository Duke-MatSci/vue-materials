<template>
	<div class="md-card-area" :class="areaClasses">
		<slot />
	</div>
</template>

<script>
import { h, computed } from "vue"

export default {
	name: "MdCardArea",
	props: {
		mdInset: Boolean,
	},
	setup(props, { slots }) {
		const areaClasses = computed(() => {
			return {
				"md-inset": props.mdInset,
			}
		})

		return () => {
			return h(
				"div",
				{
					class: ["md-card-area", areaClasses.value],
				},
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-area {
	position: relative;
}

.md-card {
	> .md-card-area:not(:last-child) {
		position: relative;

		&:after {
			height: 1px;
			position: absolute;
			bottom: 0;
			content: " ";
		}

		&:not(.md-inset):after {
			right: 0;
			left: 0;
		}

		&.md-inset:after {
			right: 16px;
			left: 16px;
		}
	}
}
</style>
