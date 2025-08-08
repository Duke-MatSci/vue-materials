import material from "@/material"
import MdApp from "./MdApp.vue"
import MdAppToolbar from "./MdAppToolbar.vue"
import MdAppContent from "./MdAppContent.vue"
import MdAppDrawer from "./MdAppDrawer.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdApp.name, MdApp)
	Vue.component(MdAppToolbar.name, MdAppToolbar)
	Vue.component(MdAppContent.name, MdAppContent)
	Vue.component(MdAppDrawer.name, MdAppDrawer)
}
