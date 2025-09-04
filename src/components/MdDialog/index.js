import material from "@/material"
import MdDialog from "./MdDialog.vue"
import MdDialogTitle from "./MdDialogTitle.vue"
import MdDialogContent from "./MdDialogContent.vue"
import MdDialogActions from "./MdDialogActions.vue"

export default (app) => {
  material(app)
  app.component(MdDialog.name, MdDialog)
  app.component(MdDialogTitle.name, MdDialogTitle)
  app.component(MdDialogContent.name, MdDialogContent)
  app.component(MdDialogActions.name, MdDialogActions)
}

