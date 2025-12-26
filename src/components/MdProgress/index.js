import material from "../../material"
import MdProgressBar from "./MdProgressBar/MdProgressBar.vue"
import MdProgressSpinner from "./MdProgressSpinner/MdProgressSpinner.vue"

export default (app) => {
	// Use Vue 3's app.component() method instead of Vue.component()
	material(app)
	app.component(MdProgressBar.name, MdProgressBar)
	app.component(MdProgressSpinner.name, MdProgressSpinner)
}
