<script>
import { h } from "vue"

export default {
	functional: true,
	props: {
		mdTag: {
			type: String,
			default: "div",
		},
	},
	render(props, { children, data, listeners }) {
		return h(
			props.mdTag,
			{
				...data,
				on: listeners,
			},
			children
		)
	},
}
</script>
