import material from "../../material"
import MdOverlay from "./MdOverlay.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdOverlay.name, MdOverlay)
}
