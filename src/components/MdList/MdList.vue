<script>
import { h, getCurrentInstance, provide, reactive } from "vue"
import MdComponent from "@/core/MdComponent"

export default MdComponent({
  name: "MdList",
  props: {
    mdExpandSingle: { type: Boolean, default: false },
    mdTheme: String,
  },
  setup(props, { slots, attrs }) {
    const inst = getCurrentInstance()
    const activeTheme = props.mdTheme || (inst && inst.proxy && inst.proxy.$mdActiveTheme) || null

    const MdList = reactive({
      expandable: [],
      expandATab(expanded) {
        if (props.mdExpandSingle && expanded) {
          const others = MdList.expandable.filter((t) => t !== expanded)
          others.forEach((item) => item.close && item.close())
        }
      },
      pushExpandable(item) {
        const list = MdList.expandable
        if (!list.find((t) => t === item)) {
          MdList.expandable = list.concat([item])
        }
      },
      removeExpandable(item) {
        const list = MdList.expandable
        if (list.find((t) => t === item)) {
          MdList.expandable = list.filter((t) => t !== item)
        }
      },
    })

    provide("MdList", MdList)

    return () => {
      // Merge classes from attrs with base classes
      const classes = ["md-list"]

      // Add theme class if available
      if (activeTheme) {
        classes.push(activeTheme)
      }

      const attrClass = attrs.class
      if (attrClass) {
        if (typeof attrClass === 'string') {
          classes.push(...attrClass.split(' ').filter(c => c))
        } else if (Array.isArray(attrClass)) {
          attrClass.forEach(c => {
            if (typeof c === 'string') {
              classes.push(...c.split(' ').filter(s => s))
            } else if (typeof c === 'object' && c !== null) {
              Object.keys(c).forEach(key => {
                if (c[key]) classes.push(key)
              })
            }
          })
        } else if (typeof attrClass === 'object') {
          Object.keys(attrClass).forEach(key => {
            if (attrClass[key]) classes.push(key)
          })
        }
      }

      const remainingAttrs = { ...attrs }
      delete remainingAttrs.class

      // Deduplicate classes
      const uniqueClasses = [...new Set(classes.filter(c => c))]

      return h(
        "ul",
        { class: uniqueClasses.join(' '), ...remainingAttrs },
        slots.default ? slots.default() : []
      )
    }
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-list {
  margin: 0;
  padding: 8px 0;
  display: flex;
  flex-flow: column nowrap;
  position: relative;
  list-style: none;

  &.md-dense {
    padding: 4px 0;
  }

  .md-divider {
    margin-top: -1px;
  }

  .md-subheader {
    &.md-inset {
      padding-left: 72px;
    }
  }

  > .md-subheader:first-of-type {
    margin-top: -8px;
  }
}
</style>

