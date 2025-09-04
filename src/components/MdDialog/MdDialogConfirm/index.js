import material from "@/material"
import MdDialog from "../MdDialog.vue"
import MdDialogConfirm from "./MdDialogConfirm.vue"

export default (app) => {
  material(app)
  app.component(MdDialog.name, MdDialog)
  app.component(MdDialogConfirm.name, MdDialogConfirm)
}

