import material from "../../material"
import MdButton from "./MdButton.vue"

export default (app) => {
	// Use Vue 3's app.component() method instead of Vue.component()
	material(app)
	app.component(MdButton.name, MdButton)
}
