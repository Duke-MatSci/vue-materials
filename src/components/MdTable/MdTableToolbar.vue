<script>
import { h } from 'vue'
import MdToolbar from '@/components/MdToolbar/MdToolbar.vue'

export default {
  name: 'MdTableToolbar',
  components: { MdToolbar },
  inject: ['MdTable'],
  render() {
    return h(MdToolbar, { class: ['md-table-toolbar', 'md-transparent'], mdElevation: 0 }, this.$slots.default ? { default: () => this.$slots.default() } : undefined)
  }
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
.md-table-toolbar { padding-left: 24px; }
.md-table-toolbar .md-title { flex: 1; font-size: 20px; }
</style>
