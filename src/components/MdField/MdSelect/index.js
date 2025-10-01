import material from "@/material"
import MdSubheader from "@/components/MdSubheader"
import MdSelect from "./MdSelect.vue"
import MdOption from "./MdOption.vue"
import MdOptgroup from "./MdOptgroup.vue"

export default (app) => {
  material(app)

  if (!app.component("MdSubheader")) {
    MdSubheader(app)
  }

  app.component(MdSelect.name, MdSelect)
  app.component(MdOption.name, MdOption)
  app.component(MdOptgroup.name, MdOptgroup)
}
