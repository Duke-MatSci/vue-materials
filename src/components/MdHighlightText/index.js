import MdHighlightText from './MdHighlightText.vue'

export {
  MdHighlightText
}

export default function install(app) {
  app.component(MdHighlightText.name, MdHighlightText)
}
