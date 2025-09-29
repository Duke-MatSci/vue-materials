import material from "@/material"
import MdCheckbox from "./MdCheckbox.vue"

export default (app) => {
  material(app)
  app.component(MdCheckbox.name, MdCheckbox)
}

