import material from "@/material"
import MdSelect from "./MdSelect.vue"
import MdOption from "./MdOption.vue"
import MdOptgroup from "./MdOptgroup.vue"

export default (app) => {
  material(app)
  app.component(MdSelect.name, MdSelect)
  app.component(MdOption.name, MdOption)
  app.component(MdOptgroup.name, MdOptgroup)
}
