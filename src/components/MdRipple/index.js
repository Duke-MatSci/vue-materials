import material from "@/material"
import MdRipple from "./MdRipple.vue"

export default (app) => {
	material(app)
	app.component(MdRipple.name, MdRipple)
}
