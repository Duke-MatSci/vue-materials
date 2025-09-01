import material from "../../material"
import MdToolbar from "./MdToolbar.vue"

export default (app) => {
	material(app)
	app.component(MdToolbar.name, MdToolbar)
}


