import material from "@/material"
import MdBadge from "./MdBadge.vue"

export default (app) => {
  material(app)
  app.component(MdBadge.name, MdBadge)
}

export { MdBadge }
