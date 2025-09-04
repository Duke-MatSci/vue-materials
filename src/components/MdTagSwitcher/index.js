import material from "@/material"
import MdTagSwitcher from "./MdTagSwitcher.vue"

export default (app) => {
  material(app)
  app.component(MdTagSwitcher.name, MdTagSwitcher)
}

