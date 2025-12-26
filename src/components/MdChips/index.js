import material from "@/material"
import MdChips from "./MdChips.vue"
import MdChip from "./MdChip.vue"

export default (app) => {
  material(app)
  app.component(MdChips.name, MdChips)
  app.component(MdChip.name, MdChip)
}

export { MdChips, MdChip }
