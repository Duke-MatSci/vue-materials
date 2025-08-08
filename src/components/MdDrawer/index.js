import material from "@/material"
import MdDrawer from "./MdDrawer.vue"
import MdDrawerRightPrevious from "./MdDrawerRightPrevious.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdDrawer.name, MdDrawer)
	Vue.component(MdDrawerRightPrevious.name, MdDrawerRightPrevious)
}
