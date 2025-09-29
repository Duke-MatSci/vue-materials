import material from "@/material"
import MdIcon from "@/components/MdIcon"
import MdButton from "@/components/MdButton"
import MdCheckbox from "@/components/MdCheckbox"
import MdField from "./MdField.vue"
import MdFile from "./MdFile/MdFile.vue"
import MdInput from "./MdInput/MdInput.vue"
import MdTextarea from "./MdTextarea/MdTextarea.vue"
import MdSelectBundle from "./MdSelect"

export default (app) => {
  material(app)

  if (!app.component("MdIcon")) {
    MdIcon(app)
  }

  if (!app.component("MdButton")) {
    MdButton(app)
  }

  if (!app.component("MdCheckbox")) {
    MdCheckbox(app)
  }

  MdSelectBundle(app)

  app.component(MdField.name, MdField)
  app.component(MdFile.name, MdFile)
  app.component(MdInput.name, MdInput)
  app.component(MdTextarea.name, MdTextarea)
}
