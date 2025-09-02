<script>
import { h } from "vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemDefault",
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
	methods: {
		toggleControl() {
			const control = this.$el.querySelector(
				".md-checkbox-container, .md-switch-container, .md-radio-container"
			)
			if (control) {
				control.click()
			}
		},
	},
	render() {
		return h(
			"div",
			{
				class: "md-list-item-default",
				onClick: this.toggleControl,
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
