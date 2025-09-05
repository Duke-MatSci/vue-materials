import material from "@/material"
import MdSnackbar from "./MdSnackbar.vue"

export default (app) => {
  material(app)
  app.component(MdSnackbar.name, MdSnackbar)
}

