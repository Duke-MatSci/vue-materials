<script>
import { h, resolveComponent } from "vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemRouter",
	components: {
		"md-list-item-content": MdListItemContent,
	},
	props: {
		to: [String, Object],
		replace: Boolean,
		append: Boolean,
		exact: Boolean,
		activeClass: String,
		exactActiveClass: String,
		custom: Boolean,
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
			const RouterLink = resolveComponent("router-link")

		return h(
			RouterLink,
			{
				class: "md-list-item-router",
				to: this.to,
				replace: this.replace,
				append: this.append,
				exact: this.exact,
				activeClass: this.activeClass,
				exactActiveClass: this.exactActiveClass,
				custom: this.custom,
			},
			{
				default: ({ href, navigate, isActive, isExactActive }) => {
						return h(
							"a",
							{
								href,
								onClick: (e) => {
									if (!this.disabled) {
										navigate(e)
									} else {
										e.preventDefault()
									}
								},
								class: {
									"md-router-link": true,
									"md-disabled": this.disabled,
									"router-link-active": isActive,
									"router-link-exact-active": isExactActive,
								},
								mdripple: this.mdRipple,
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
		)
	},
}
</script>
