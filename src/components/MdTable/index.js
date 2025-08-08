import material from "@/material"
import MdTable from "./MdTableContainer.js"
import MdTableToolbar from "./MdTableToolbar.vue"
import MdTableEmptyState from "./MdTableEmptyState.vue"
import MdTableRow from "./MdTableRow.vue"
import MdTableHead from "./MdTableHead.vue"
import MdTableCell from "./MdTableCell.vue"
import MdTablePagination from "./MdTablePagination.vue"

export default (Vue) => {
	material(Vue)
	Vue.component("MdTable", MdTable)
	Vue.component(MdTableToolbar.name, MdTableToolbar)
	Vue.component(MdTableEmptyState.name, MdTableEmptyState)
	Vue.component(MdTableRow.name, MdTableRow)
	Vue.component(MdTableHead.name, MdTableHead)
	Vue.component(MdTableCell.name, MdTableCell)
	Vue.component(MdTablePagination.name, MdTablePagination)
}
