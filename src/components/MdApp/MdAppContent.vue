<script>
import { h } from "vue"
import MdCard from "@/components/MdCard/MdCard.vue"
import MdContent from "@/components/MdContent/MdContent.vue"

export default {
  name: "MdAppContent",
  inject: ["MdApp"],
  computed: {
    showCard() { return this.MdApp.options && this.MdApp.options.mode === "overlap" },
  },
  render() {
    const children = this.$slots.default ? this.$slots.default() : []
    if (this.showCard) {
      return h(MdCard, { class: "md-app-content md-flex", ...this.$attrs }, children)
    }
    return h(MdContent, { class: "md-app-content md-flex", ...this.$attrs }, children)
  },
}
</script>

<style lang="scss">
.md-app-content { min-height: 100%; }
.md-app-content .md-card { margin-right: 16px; margin-left: 16px; overflow: visible; }
</style>

