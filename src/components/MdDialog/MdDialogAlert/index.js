import material from "@/material"
import MdDialog from "../MdDialog.vue"
import MdDialogAlert from "./MdDialogAlert.vue"

export default (app) => {
  material(app)
  app.component(MdDialog.name, MdDialog)
  app.component(MdDialogAlert.name, MdDialogAlert)
}

