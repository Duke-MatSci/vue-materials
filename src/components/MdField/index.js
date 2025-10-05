import MdField from './MdField.vue'
import MdFile from './MdFile/MdFile.vue'
import MdInput from './MdInput/MdInput.vue'
import MdTextarea from './MdTextarea/MdTextarea.vue'
import { MdSelect, MdOption, MdOptgroup } from './MdSelect'

export {
  MdField,
  MdFile,
  MdInput,
  MdTextarea,
  MdSelect,
  MdOption,
  MdOptgroup
}

export default function install(app) {
  app.component(MdField.name, MdField)
  app.component(MdFile.name, MdFile)
  app.component(MdInput.name, MdInput)
  app.component(MdTextarea.name, MdTextarea)
  app.component(MdSelect.name, MdSelect)
  app.component(MdOption.name, MdOption)
  app.component(MdOptgroup.name, MdOptgroup)
}
