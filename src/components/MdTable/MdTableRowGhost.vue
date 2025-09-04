<script>
import { h } from 'vue'

export default {
  name: 'MdTableRowGhost',
  props: { mdIndex: [String, Number], mdId: [String, Number], mdItem: [Array, Object] },
  render() { const slot = this.$slots.default; return slot ? slot({ mdItem: this.mdItem, mdId: this.mdId, mdIndex: this.mdIndex }) : null },
}
</script>

