import material from "@/material"
import MdBottomBar from "./MdBottomBar.vue"
import MdBottomBarItem from "./MdBottomBarItem.vue"

export default (app) => {
  material(app)
  app.component(MdBottomBar.name, MdBottomBar)
  app.component(MdBottomBarItem.name, MdBottomBarItem)
}

export { MdBottomBar, MdBottomBarItem }
