import material from "@/material"
import MdList from "./MdList.vue"
import MdListItem from "./MdListItem/MdListItem.vue"

export default (app) => {
	material(app)
	app.component(MdList.name, MdList)
	app.component(MdListItem.name, MdListItem)
}
