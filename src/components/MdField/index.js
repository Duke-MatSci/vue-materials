import material from "@/material"
import MdField from "./MdField.vue"

export default (app) => {
  material(app)
  app.component(MdField.name, MdField)
}

