import material from '@/material'
import MdDatepicker from './MdDatepicker.vue'
import MdDatepickerDialog from './MdDatepickerDialog.vue'

export default Vue => {
  material(Vue)
  Vue.component(MdDatepicker.name, MdDatepicker)
  Vue.component(MdDatepickerDialog.name, MdDatepickerDialog)
}

export {
  MdDatepicker,
  MdDatepickerDialog
}
