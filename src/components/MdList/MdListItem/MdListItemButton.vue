<script>
import { h } from "vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemButton",
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
			"button",
			{
				class: "md-list-item-button",
				type: "button",
				mdripple: this.mdRipple,
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
