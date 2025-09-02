<script>
import { h } from "vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemFakeButton",
	components: {
		"md-list-item-content": MdListItemContent,
	},
	props: {
		disabled: Boolean,
		mdRipple: {
			type: Boolean,
			default: true,
		},
	},
	computed: {
		isDisabled() {
			return !this.mdRipple || this.disabled
		},
	},
	render() {
		return h(
			"div",
			{
				class: "md-list-item-fake-button",
				disabled: this.disabled,
			},
			[
				h(
					MdListItemContent,
					{
						mdDisabled: this.isDisabled,
					},
					this.$slots.default
						? { default: () => this.$slots.default() }
						: undefined
				),
			]
		)
	},
}
</script>
