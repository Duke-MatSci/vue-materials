<script>
import { h } from 'vue'
export default { name: 'MdTableEmptyState', inject: ['MdTable'], render() { return h('div',{class:'md-table-empty-state'}, this.$slots.default ? this.$slots.default() : []) } }
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-empty-state { padding-left: 24px; }
</style>
