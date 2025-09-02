import material from "../../material"
import MdOverlay from "./MdOverlay.vue"

export default (app) => {
	// Use Vue 3's app.component() method instead of Vue.component()
	material(app)
	app.component(MdOverlay.name, MdOverlay)
}
