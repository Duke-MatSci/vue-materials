<script>
import { h } from 'vue'
import MdTableHead from '@/components/MdTable/MdTableHead.vue'
import MdTableHeadSelection from '@/components/MdTable/MdTableHeadSelection.vue'

export default {
  name: 'MdTableThead',
  inject: ['MdTable'],
  render() {
    const items = Object.values(this.MdTable.items || {})
    return h('thead', null, [
      h('tr', null, [
        h(MdTableHeadSelection),
        ...items.map((item) => h(MdTableHead, { ...item }))
      ])
    ])
  }
}
</script>
