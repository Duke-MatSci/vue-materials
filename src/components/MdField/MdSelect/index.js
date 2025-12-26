import MdSelect from './MdSelect.vue'
import MdOption from './MdOption.vue'
import MdOptgroup from './MdOptgroup.vue'

export {
  MdSelect,
  MdOption,
  MdOptgroup
}

export default function install(app) {
  app.component(MdSelect.name, MdSelect)
  app.component(MdOption.name, MdOption)
  app.component(MdOptgroup.name, MdOptgroup)
}
