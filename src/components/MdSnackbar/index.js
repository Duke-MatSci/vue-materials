import material from "@/material"
import MdSnackbar from "./MdSnackbar.vue"

export default (Vue) => {
	material(Vue)
	Vue.component(MdSnackbar.name, MdSnackbar)
}
