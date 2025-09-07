import material from "@/material"
import MdMenu from "./MdMenu.vue"

export default (app) => {
  material(app)
  app.component(MdMenu.name, MdMenu)
}

