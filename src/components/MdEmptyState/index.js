import material from "@/material"
import MdEmptyState from "./MdEmptyState.vue"

export default (app) => {
  material(app)
  app.component(MdEmptyState.name, MdEmptyState)
}

