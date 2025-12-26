<script>
import { ref, watch, onMounted, h } from "vue"

export default {
  name: "MdSvgLoader",
  props: { mdSrc: { type: String, required: true } },
  emits: ["md-loaded", "md-error"],
  setup(props, { emit, attrs }) {
    const html = ref("")

    const load = async () => {
      if (!props.mdSrc || typeof window === "undefined") return
      try {
        const res = await fetch(props.mdSrc)
        const text = await res.text()
        html.value = text || ""
        emit("md-loaded")
      } catch (e) {
        emit("md-error", e)
      }
    }

    watch(() => props.mdSrc, load, { immediate: true })
    onMounted(load)

    return () =>
      h("span", { ...attrs, class: [attrs.class], innerHTML: html.value })
  },
}
</script>

<style lang="scss">
/* No extra styles; parent controls size/color */
</style>

