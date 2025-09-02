<script>
import { h } from "vue"
import MdWarningIcon from "@/core/icons/MdWarningIcon.vue"
import MdCheckIcon from "@/core/icons/MdCheckIcon.vue"
import MdEditIcon from "@/core/icons/MdEditIcon.vue"
import MdButton from "@/components/MdButton/MdButton.vue"

export default {
  name: "MdStepperHeader",
  components: { MdWarningIcon, MdCheckIcon, MdEditIcon, MdButton },
  props: {
    index: { type: String, required: true },
  },
  inject: ["MdSteppers"],
  computed: {
    data() {
      return this.MdSteppers.items[this.index] || {}
    },
    shouldDisable() {
      const { data, index, MdSteppers } = this
      if (data.done && !data.editable) return true
      return MdSteppers.isLinear && !MdSteppers.isPreviousStepperDone(index)
    },
    classes() {
      return {
        "md-active": !this.MdSteppers.syncRoute && this.index === this.MdSteppers.activeStep,
        "md-error": this.data.error,
        "md-done": this.data.done,
      }
    },
  },
  methods: {
    handleClick(e) {
      if (!this.MdSteppers.syncRoute) {
        this.MdSteppers.setActiveStep(this.index)
      }
    },
  },
  render() {
    const numberOrIcon = this.data.error
      ? h(MdWarningIcon, { class: "md-stepper-icon" })
      : h(
          "div",
          { class: "md-stepper-number" },
          this.data.done
            ? [
                this.data.editable
                  ? h(MdEditIcon, { class: "md-stepper-editable" })
                  : h(MdCheckIcon, { class: "md-stepper-done" }),
              ]
            : [String(this.MdSteppers.getStepperNumber(this.index))]
        )

    const text = h("div", { class: "md-stepper-text" }, [
      this.data.label ? h("span", { class: "md-stepper-label" }, this.data.label) : null,
      this.data.error
        ? h("span", { class: "md-stepper-error" }, this.data.error)
        : this.data.description
        ? h("span", { class: "md-stepper-description" }, this.data.description)
        : null,
    ])

    const on = {
      onClick: this.handleClick,
      ...(this.data.events || {}),
    }

    return h(
      MdButton,
      {
        class: ["md-stepper-header", this.classes],
        disabled: this.shouldDisable,
        ...(this.data.props || {}),
        ...on,
      },
      [numberOrIcon, text]
    )
  },
}
</script>
