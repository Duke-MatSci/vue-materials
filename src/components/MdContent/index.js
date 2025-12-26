import material from "@/material"
import MdContent from "./MdContent.vue"

export default (app) => {
  material(app)
  app.component(MdContent.name, MdContent)
}

