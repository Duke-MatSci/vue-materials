import material from "@/material"
import MdSteppers from "./MdSteppers.vue"
import MdStep from "./MdStep.vue"

export default (app) => {
  material(app)
  app.component(MdSteppers.name, MdSteppers)
  app.component(MdStep.name, MdStep)
}

