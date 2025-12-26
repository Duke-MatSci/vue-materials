<script>
import { h } from "vue"
import MdIcon from "@/components/MdIcon/MdIcon.vue"

export default {
	name: "MdClearIcon",
	render() {
		return h(
			MdIcon,
			{ class: "md-icon-image" },
			() => h(
				"svg",
				{
					height: "24",
					viewBox: "0 0 24 24",
					width: "24",
					xmlns: "http://www.w3.org/2000/svg"
				},
				[
					h("path", {
						d: "M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
					}),
					h("path", {
						d: "M0 0h24v24H0z",
						fill: "none"
					})
				]
			)
		)
	}
}
</script>
