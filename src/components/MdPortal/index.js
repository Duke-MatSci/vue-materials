import material from "@/material"
import MdPortal from "./MdPortal.vue"

export default (app) => {
  material(app)
  app.component(MdPortal.name, MdPortal)
}

