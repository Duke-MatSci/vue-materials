<script>
import { h } from "vue"

export default {
  name: "MdTableCellSelection",
  props: {
    value: Boolean,
    mdRowId: [Number, String],
    mdSelectable: Boolean,
    mdDisabled: Boolean,
  },
  inject: ["MdTable"],
  data: () => ({
    isSelected: false,
  }),
  watch: {
    value: {
      immediate: true,
      handler(value) {
        this.isSelected = value
      },
    },
  },
  methods: {
    onChange() {
      this.$emit("input", this.isSelected)
    },
  },
  render() {
    if (!this.mdSelectable) {
      return null
    }

    const checkbox = h("md-checkbox", {
      disabled: !this.mdSelectable || this.mdDisabled,
      modelValue: this.isSelected,
      "onUpdate:modelValue": (val) => {
        this.isSelected = val
        this.onChange()
      },
    })

    return h("td", { class: ["md-table-cell", "md-table-cell-selection"] }, [
      h("div", { class: "md-table-cell-container" }, [checkbox]),
    ])
  },
}
</script>

<style lang="scss">
.md-table-cell-selection {
  width: 66px;

  + th {
    .md-table-head-label {
      padding-left: 0;
    }
  }

  + td {
    .md-table-cell-container {
      padding-left: 0;
    }
  }

  .md-table-head-container,
  .md-table-cell-container,
  .md-table-head-label,
  .md-table-cell-label {
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: visible;
  }

  .md-checkbox {
    margin: 0;

    .md-checkbox-container {
      width: 18px;
      min-width: 18px;
      height: 18px;

      &:after {
        top: -1px;
        left: 4px;
      }
    }
  }
}
</style>
