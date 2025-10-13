import MdAutocomplete from './MdAutocomplete.vue'

export {
  MdAutocomplete
}

export default function install(app) {
  app.component(MdAutocomplete.name, MdAutocomplete)
}
