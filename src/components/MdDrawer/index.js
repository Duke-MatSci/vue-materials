import material from "@/material"
import MdDrawer from "./MdDrawer.vue"

export default (app) => {
	material(app)
	app.component(MdDrawer.name, MdDrawer)
}
