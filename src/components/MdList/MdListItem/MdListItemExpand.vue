<template>
  <div class="md-list-item-expand" :class="expandClasses">
    <md-list-item-content :md-disabled="isDisabled" @click="toggleExpand">
      <slot />
      <md-arrow-down-icon class="md-list-expand-icon" />
    </md-list-item-content>

    <div class="md-list-expand" ref="listExpand" :style="expandStyles">
      <slot name="md-expand" />
    </div>
  </div>
</template>

<script>
import raf from "raf"
import MdArrowDownIcon from "@/core/icons/MdArrowDownIcon.vue"
import MdListItemMixin from "./MdListItemMixin"

export default {
  name: "MdListItemExpand",
  components: { MdArrowDownIcon },
  mixins: [MdListItemMixin],
  inject: ["MdList"],
  data: () => ({ expandStyles: {}, showContent: false }),
  props: { mdExpanded: Boolean },
  computed: {
    expandClasses() { return { "md-active": this.showContent } },
  },
  methods: {
    getChildrenSize() {
      const expandEl = this.$refs.listExpand
      let size = 0
      Array.from(expandEl.children).forEach((child) => { size += child.offsetHeight })
      return size
    },
    fetchStyle() {
      return new Promise((resolve) => {
        raf(() => {
          let fullHeight = 0
          if (!this.showContent) {
            fullHeight = "auto" // could be: this.getChildrenSize() + 'px'
          }
          this.expandStyles = { height: fullHeight }
          resolve()
        })
      })
    },
    toggleExpand() {
      this.fetchStyle().then(() => { this.showContent = !this.showContent })
    },
    open() {
      if (this.showContent) return false
      this.fetchStyle().then(() => { this.showContent = true })
    },
    close() {
      if (!this.showContent) return false
      this.fetchStyle().then(() => { this.showContent = false })
    },
  },
  watch: {
    mdExpanded() { this.mdExpanded ? this.open() : this.close() },
    showContent() {
      const expanded = this.showContent
      this.$emit("update:mdExpanded", expanded)
      this.$nextTick(() => this.$emit(expanded ? "md-expanded" : "md-collapsed"))
      if (expanded) this.MdList && this.MdList.expandATab && this.MdList.expandATab(this)
    },
  },
  created() { this.MdList && this.MdList.pushExpandable && this.MdList.pushExpandable(this) },
  mounted() { if (this.mdExpanded) this.open() },
  beforeUnmount() { this.MdList && this.MdList.removeExpandable && this.MdList.removeExpandable(this) },
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-list-item-expand {
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  transition: border .4s $md-transition-stand-timing;
  will-change: border;

  &.md-active {
    > .md-list-item-content > .md-list-expand-icon {
      perspective: 1000px;
      perspective-origin: 50% 50%;
      transform: rotateX(180deg);
    }

    .md-list-expand {
      opacity: 1;
      transform: translate3D(0, 0, 0);
    }
  }

  .md-list-expand {
    height: 0;
    opacity: 0;
    overflow: hidden;
    transform: translate3D(0, -24px, 0);
    transition: .4s $md-transition-stand-timing;
    transition-property: transform, opacity;
    will-change: transform, opacity;
  }

  .md-list-expand-icon {
    transition: transform .4s $md-transition-stand-timing;
    will-change: transform;
  }
}
</style>

