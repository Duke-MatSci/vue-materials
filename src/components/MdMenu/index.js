import material from "@/material"
import MdMenu from "./MdMenu.vue"
import MdMenuContent from "./MdMenuContent.vue"
import MdMenuItem from "./MdMenuItem.vue"

export default (app) => {
  material(app)
  app.component(MdMenu.name, MdMenu)
  app.component(MdMenuContent.name, MdMenuContent)
  app.component(MdMenuItem.name, MdMenuItem)
}
