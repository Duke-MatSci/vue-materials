<template>
	<div class="md-card-actions" :class="`md-alignment-${mdAlignment}`">
		<slot />
	</div>
</template>

<script>
import { h, computed } from "vue"

export default {
	name: "MdCardActions",
	props: {
		mdAlignment: {
			type: String,
			default: "right",
			validator(value) {
				const alignments = ["left", "right", "space-between"]
				if (!alignments.includes(value)) {
					console.warn(
						`The md-alignment prop is invalid. You should pass one of: ${alignments.join(
							", "
						)}`
					)
					return false
				}
				return true
			},
		},
	},
	setup(props, { slots }) {
		const alignmentClass = computed(() => `md-alignment-${props.mdAlignment}`)

		return () => {
			return h(
				"div",
				{
					class: ["md-card-actions", alignmentClass.value],
				},
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-actions {
	padding: 8px;
	display: flex;
	align-items: center;

	&.md-alignment-right {
		justify-content: flex-end;
	}

	&.md-alignment-left {
		justify-content: flex-start;
	}

	&.md-alignment-space-between {
		justify-content: space-between;
	}

	.md-button {
		margin: 0;

		&:first-child {
			margin-left: 0;
		}

		&:last-child {
			margin-right: 0;
		}

		+ .md-button {
			margin-left: 4px;
		}
	}
}
</style>
