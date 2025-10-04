import material from "@/material"
import MdSwitch from "./MdSwitch.vue"

export default (app) => {
  material(app)
  app.component(MdSwitch.name, MdSwitch)
}

export { MdSwitch }
