import material from "@/material"
import MdSelect from "./MdSelect.vue"
import MdOption from "./MdOption.vue"

export default (app) => {
  material(app)
  app.component(MdSelect.name, MdSelect)
  app.component(MdOption.name, MdOption)
}

