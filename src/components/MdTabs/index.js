import material from "@/material"
import MdTabs from "./MdTabs.vue"
import MdTab from "./MdTab.vue"

export default (app) => {
  material(app)
  app.component(MdTabs.name, MdTabs)
  app.component(MdTab.name, MdTab)
}

