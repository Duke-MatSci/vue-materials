import material from "@/material"
import MdRadio from "./MdRadio.vue"

export default (app) => {
  material(app)
  app.component(MdRadio.name, MdRadio)
}

export { MdRadio }
