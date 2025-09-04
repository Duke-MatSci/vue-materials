import material from "@/material"
import MdTable from "./MdTableContainer.js"
import MdTableToolbar from "./MdTableToolbar.vue"
import MdTableEmptyState from "./MdTableEmptyState.vue"
import MdTableRow from "./MdTableRow.vue"
import MdTableHead from "./MdTableHead.vue"
import MdTableCell from "./MdTableCell.vue"
import MdTablePagination from "./MdTablePagination.vue"

export default (app) => {
  material(app)
  app.component("MdTable", MdTable)
  app.component(MdTableToolbar.name, MdTableToolbar)
  app.component(MdTableEmptyState.name, MdTableEmptyState)
  app.component(MdTableRow.name, MdTableRow)
  app.component(MdTableHead.name, MdTableHead)
  app.component(MdTableCell.name, MdTableCell)
  app.component(MdTablePagination.name, MdTablePagination)
}
