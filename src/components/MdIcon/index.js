import material from "../../material"
import MdIcon from "./MdIcon.vue"

export default (app) => {
	material(app)
	app.component(MdIcon.name, MdIcon)
}


