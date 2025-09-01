<template>
	<div class="md-card-content">
		<slot />
	</div>
</template>

<script>
import { h } from "vue"

export default {
	name: "MdCardContent",
	setup(props, { slots }) {
		return () => {
			return h(
				"div",
				{ class: "md-card-content" },
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-content {
	padding: 16px;
	font-size: 14px;
	line-height: 22px;

	&:last-of-type {
		padding-bottom: 24px;
	}
}
</style>
