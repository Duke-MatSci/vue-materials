import material from "@/material"
import MdTagSwitcher from "./MdTagSwitcher.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdTagSwitcher.name, MdTagSwitcher)
}
