<script>
import { h } from "vue"
import MdRipple from "@/components/MdRipple/MdRipple.vue"

export default {
	name: "MdListItemContent",
	props: {
		mdDisabled: Boolean,
		mdRipple: {
			type: Boolean,
			default: true,
		},
	},
	setup(props, { slots }) {
		return () =>
			h(
				MdRipple,
				{
					class: "md-list-item-content",
					mdDisabled: props.mdDisabled,
					mdRipple: props.mdRipple,
				},
				slots.default ? { default: () => slots.default() } : undefined
			)
	},
}
</script>
