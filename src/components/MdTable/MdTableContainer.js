import { h } from 'vue'
import MdTable from './MdTable.vue'

const SLOT_TAGS = [
  'md-table-toolbar',
  'md-table-empty-state',
  'md-table-pagination',
]
const SLOT_NAMES = {
  'md-table-toolbar': 'md-table-toolbar',
  'md-table-empty-state': 'md-table-empty-state',
  'md-table-pagination': 'md-table-pagination',
}
const COMPONENT_NAMES = {
  MdTableToolbar: 'md-table-toolbar',
  MdTableEmptyState: 'md-table-empty-state',
  MdTablePagination: 'md-table-pagination',
}

function tagOf(vnode) {
  const t = vnode && vnode.type
  if (!t) return null
  if (typeof t === 'string') return t
  if (typeof t === 'object') return t.name || null
  return null
}

export default {
  name: 'MdTableContainer',
  inheritAttrs: false,
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    const named = {}
    const rest = []

    children.forEach((node) => {
      const tag = tagOf(node)
      if (!tag) return rest.push(node)
      if (SLOT_TAGS.includes(tag)) {
        named[SLOT_NAMES[tag]] = () => [node]
      } else if (COMPONENT_NAMES[tag]) {
        named[COMPONENT_NAMES[tag]] = () => [node]
      } else {
        rest.push(node)
      }
    })

    const slots = {
      ...named,
      default: () => rest,
      ...(this.$slots['md-table-row'] ? { 'md-table-row': this.$slots['md-table-row'] } : {}),
      ...(this.$slots['md-table-alternate-header'] ? { 'md-table-alternate-header': this.$slots['md-table-alternate-header'] } : {}),
    }

    return h(MdTable, { ...this.$attrs }, slots)
  },
}
