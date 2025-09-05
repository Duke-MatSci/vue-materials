<template>
	<div class="md-card-expand-trigger">
		<slot />
	</div>
</template>

<script>
import { h, inject } from "vue"

export default {
	name: "MdCardExpandTrigger",
	setup(props, { slots }) {
		// Inject the MdCard context
		const MdCard = inject("MdCard")

		const handleClick = () => {
			MdCard.expand = !MdCard.expand
		}

		return () => {
			const slotContent = slots.default ? slots.default() : []

			// If there's slot content, we need to handle it specially
			// For now, we'll wrap it in a div with the click handler
			if (slotContent.length > 0) {
				return h(
					"div",
					{
						class: "md-card-expand-trigger",
						onClick: handleClick,
					},
					slotContent
				)
			}

			// Fallback to a simple div
			return h(
				"div",
				{
					class: "md-card-expand-trigger",
					onClick: handleClick,
				},
				[]
			)
		}
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-card-expand-trigger.md-icon-button {
	transition: transform 0.4s $md-transition-stand-timing;
	will-change: transform;
}
</style>


