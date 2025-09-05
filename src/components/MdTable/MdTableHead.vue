<script>
import { h } from 'vue'
import MdUpwardIcon from '@/core/icons/MdUpwardIcon.vue'
import MdResizeObserver from '@/core/utils/MdResizeObserver'
import MdRipple from '@/components/MdRipple/MdRipple.vue'

export default {
  name: 'MdTableHead',
  components: { MdUpwardIcon },
  props: { mdNumeric: Boolean, numeric: Boolean, id: [String, Number], label: String, tooltip: String, sortBy: String, item: [Array, Object], key: String },
  inject: ['MdTable'],
  data: () => ({ width: null, windowResizeObserver: null }),
  computed: {
    hasSort() { return this.MdTable.sort && this.sortBy },
    isSorted() { return this.MdTable.sort ? this.MdTable.sort === this.sortBy : false },
    isDescSorted() { return this.isSorted && this.MdTable.sortOrder === 'desc' },
    isAscSorted() { return this.isSorted && this.MdTable.sortOrder === 'asc' },
    headStyles() { return this.width != null ? { width: this.width + 'px' } : {} },
    headClasses() { return { 'md-numeric': this.numeric || this.mdNumeric, 'md-sortable': this.hasSort, 'md-sorted': this.isSorted, 'md-sorted-desc': this.isDescSorted } },
  },
  methods: {
    changeSort() { if (this.hasSort) { this.MdTable.sortOrder = this.isAscSorted ? 'desc' : 'asc'; this.MdTable.sort = this.sortBy; this.MdTable.emitEvent('md-sorted', this.MdTable.sort); this.MdTable.emitEvent('update:mdSort', this.MdTable.sort); this.MdTable.emitEvent('update:mdSortOrder', this.MdTable.sortOrder); this.MdTable.sortTable() } },
    getChildNodesBySelector(el, selector) { return Array.from(el.childNodes).filter(({ classList }) => classList && classList.contains(selector)) },
    getNodeIndex(nodes, el) { return [].indexOf.call(nodes, el) },
    setWidth() {
      if (!this.MdTable.fixedHeader) return
      if (!this.MdTable.contentEl) return
      if (!this.$el || !this.$el.parentNode) return
      const thEls = this.getChildNodesBySelector(this.$el.parentNode, 'md-table-head')
      const tdEls = this.MdTable.contentEl.querySelectorAll('tr:first-child .md-table-cell')
      const nodeIndex = this.getNodeIndex(thEls, this.$el)
      if (tdEls[nodeIndex]) this.width = tdEls[nodeIndex].offsetWidth
    },
  },
  updated() { this.$nextTick().then(this.setWidth) },
  mounted() {
    this.$nextTick().then(this.setWidth)
    if (this.MdTable.fixedHeader) this.windowResizeObserver = MdResizeObserver(window, this.setWidth)
  },
  beforeUnmount() { if (this.windowResizeObserver && this.windowResizeObserver.destroy) this.windowResizeObserver.destroy() },
  render() {
    const labelBlock = this.$slots.default
      ? h('div', { class: 'md-table-head-container' }, [h('div', { class: 'md-table-head-label' }, this.$slots.default())])
      : h(MdRipple, { class: 'md-table-head-container', mdDisabled: !this.hasSort }, { default: () => [h('div', { class: 'md-table-head-label' }, [ this.hasSort ? h(MdUpwardIcon, { class: 'md-table-sortable-icon' }, { default: () => 'arrow_upward' }) : null, this.label ])] })
    return h('th', { id: this.id, class: ['md-table-head', this.headClasses], style: this.headStyles, onClick: this.changeSort }, [labelBlock])
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-head{padding:0;position:relative;font-size:12px;line-height:16px;text-align:left}.md-table-head:last-child:not(:first-child) .md-table-head-label{padding-right:24px}.md-table-head.md-numeric{text-align:right}.md-table-head.md-sortable:first-of-type .md-table-sortable-icon,.md-table-cell-selection+.md-sortable .md-table-sortable-icon{right:8px;left:auto}.md-table-head .md-icon{width:16px;height:16px;font-size:16px}.md-table-head .md-icon:not(.md-sortable-icon){margin:0 4px}.md-table-head .md-icon:first-child{margin-left:0}.md-table-head .md-icon:last-child{margin-right:0}.md-sortable{cursor:pointer}.md-sortable:hover .md-table-sortable-icon,.md-sortable.md-sorted .md-table-sortable-icon{opacity:1}.md-sortable.md-sorted-desc .md-table-sortable-icon{transform:translateY(-50%) rotate(180deg)}.md-table-head-container{height:56px;padding:14px 0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.md-table-head-label{height:28px;padding-right:32px;padding-left:24px;display:inline-block;position:relative;overflow:hidden;line-height:28px;text-overflow:ellipsis;white-space:nowrap}.md-table-sortable-icon{position:absolute;top:50%;left:0;transition:.3s $md-transition-default-timing;transform:translateY(-50%);opacity:0;color:rgba(#000,.38)}
</style>
