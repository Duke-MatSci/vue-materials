<template>
	<div class="md-card-expand">
		<slot />
	</div>
</template>

<script>
import { h, inject } from "vue"

export default {
	name: "MdCardExpand",
	setup(props, { slots }) {
		// Inject the MdCard context
		const MdCard = inject("MdCard")

		return () => {
			return h(
				"div",
				{ class: "md-card-expand" },
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-expand {
	overflow: hidden;

	.md-card-actions {
		position: relative;
		z-index: 2;
	}

	.md-card-expand-content {
		position: relative;
		z-index: 1;
	}
}
</style>


