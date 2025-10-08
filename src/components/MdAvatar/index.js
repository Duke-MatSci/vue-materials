import material from "@/material"
import MdAvatar from "./MdAvatar.vue"

export default (app) => {
  material(app)
  app.component(MdAvatar.name, MdAvatar)
}

export { MdAvatar }
