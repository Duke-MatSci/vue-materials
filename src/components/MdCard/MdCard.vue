<script>
import { h, reactive, computed, provide } from "vue"

export default {
	name: "MdCard",
	props: {
		mdWithHover: Boolean,
	},
	setup(props, { slots }) {
		const MdCard = reactive({
			expand: false,
		})

		provide("MdCard", MdCard)

		const cardClasses = computed(() => {
			return {
				"md-with-hover": props.mdWithHover,
				"md-expand-active": MdCard.expand,
			}
		})

		return () => {
			return h(
				"div",
				{
					class: ["md-card", cardClasses.value],
				},
				slots && slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdElevation/mixins";
@import "./base";

$md-card-radius: 2px;

.md-card {
	@include md-card;

	&.md-with-hover {
		cursor: pointer;
		transition: background-color 0.3s $md-transition-default-timing,
			box-shadow 0.4s $md-transition-stand-timing;
		will-change: background-color, box-shadow;

		&:hover {
			z-index: 2;
			@include md-elevation(8);
		}
	}

	&.md-expand-active {
		.md-card-expand-trigger.md-icon-button {
			transform: rotate(180deg);
		}
	}

	.md-subhead,
	.md-title,
	.md-subheading {
		margin: 0;
		font-weight: 400;
	}

	.md-subhead {
		opacity: 0.84;
		font-size: 14px;
		letter-spacing: 0.01em;
		line-height: 20px;

		+ .md-title {
			margin-top: 4px;
		}
	}

	.md-title {
		font-size: 24px;
		letter-spacing: 0;
		line-height: 32px;
	}
}
</style>
