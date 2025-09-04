import material from "@/material"
import MdApp from "./MdApp.vue"
import MdAppToolbar from "./MdAppToolbar.vue"
import MdAppContent from "./MdAppContent.vue"
import MdAppDrawer from "./MdAppDrawer.vue"

export default (app) => {
  material(app)
  app.component(MdApp.name, MdApp)
  app.component(MdAppToolbar.name, MdAppToolbar)
  app.component(MdAppContent.name, MdAppContent)
  app.component(MdAppDrawer.name, MdAppDrawer)
}

