import material from "@/material"
import MdDialog from "../MdDialog.vue"
import MdDialogPrompt from "./MdDialogPrompt.vue"

export default (app) => {
  material(app)
  app.component(MdDialog.name, MdDialog)
  app.component(MdDialogPrompt.name, MdDialogPrompt)
}

