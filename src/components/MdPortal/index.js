import material from "../../material"
import MdPortal from "./MdPortal.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdPortal.name, MdPortal)
}
