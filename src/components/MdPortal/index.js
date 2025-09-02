import material from "../../material"
import MdPortal from "./MdPortal.vue"

export default (app) => {
	// Use Vue 3's app.component() method instead of Vue.component()
	material(app)
	app.component(MdPortal.name, MdPortal)
}
