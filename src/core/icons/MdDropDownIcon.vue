<script>
import { h } from "vue"
import MdIcon from "@/components/MdIcon/MdIcon.vue"

export default {
	name: "MdDropDownIcon",
	render() {
		return h(
			MdIcon,
			{ class: "md-icon-image" },
			{
				default: () => [
					h(
						"svg",
						{
							height: "24",
							viewBox: "0 0 24 24",
							width: "24",
							xmlns: "http://www.w3.org/2000/svg",
						},
						[
							h("path", { d: "M7 10l5 5 5-5z" }),
							h("path", { d: "M0 0h24v24H0z", fill: "none" }),
						]
					),
				],
			}
		)
	},
}
</script>
