<script>
import { h } from "vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemLink",
	props: {
		disabled: Boolean,
		href: String,
		target: String,
		download: String,
		hreflang: String,
		ping: String,
		rel: String,
		type: String,
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
			"a",
			{
				class: "md-list-item-link",
				href: this.href,
				target: this.target,
				download: this.download,
				hreflang: this.hreflang,
				ping: this.ping,
				rel: this.rel,
				type: this.type,
				// Expose mdRipple on the anchor itself for DOM parity
				mdripple: this.mdRipple,
				disabled: this.disabled, // still added for consistency even though <a> doesn’t use `disabled`
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
