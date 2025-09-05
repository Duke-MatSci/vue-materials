import material from "@/material"
import MdDivider from "./MdDivider.vue"

export default (app) => {
	material(app)
	app.component(MdDivider.name, MdDivider)
}
