import material from "@/material"
import MdSubheader from "./MdSubheader.vue"

export default (app) => {
  material(app)
  app.component(MdSubheader.name, MdSubheader)
}