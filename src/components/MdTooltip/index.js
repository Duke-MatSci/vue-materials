import material from "@/material"
import MdTooltip from "./MdTooltip.vue"

export default (app) => {
  material(app)
  app.component(MdTooltip.name, MdTooltip)
}

