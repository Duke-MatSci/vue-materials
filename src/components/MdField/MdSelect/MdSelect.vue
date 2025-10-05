<script>
import { h, KeepAlive } from "vue"
import MdDropDownIcon from "@/core/icons/MdDropDownIcon.vue"
import MdMenu from "@/components/MdMenu/MdMenu.vue"
import MdMenuContent from "@/components/MdMenu/MdMenuContent.vue"
import MdInput from "../MdInput/MdInput.vue"
import MdFieldMixin from "../MdFieldMixin"

const defaultOffset = {
	x: -15,
	y: -48,
}

export default {
	name: "MdSelect",
	components: {
		MdInput,
		MdMenu,
		MdMenuContent,
		MdDropDownIcon,
	},
	mixins: [MdFieldMixin],
	props: {
		mdDense: Boolean,
		mdClass: String,
		multiple: Boolean,
		id: String,
		name: String,
	},
	data() {
		return {
			menuStyles: {},
			offset: {
				x: defaultOffset.x,
				y: 0,
			},
			showSelect: true,
			didMount: false,
			wasOpened: false,
			selectLabel: null, // Reactive label for the input
			MdSelect: {
				items: {},
				label: null,
				multiple: false,
				modelValue: this.localValue,
				// Methods will be assigned in created()
				setValue: null,
				setContent: null,
				setMultipleValue: null,
				setMultipleContent: null,
			},
		}
	},
	provide() {
		const MdSelect = this.MdSelect

		return { MdSelect }
	},
	created() {
		// Bind methods to MdSelect object so options can call them
		this.MdSelect.setValue = this.setValue
		this.MdSelect.setContent = this.setContent
		this.MdSelect.setMultipleValue = this.setMultipleValue
		this.MdSelect.setMultipleContent = this.setMultipleContent
	},
	computed: {
		attrs() {
			// Filter out onUpdate:modelValue to prevent MdInput from emitting back to parent
			const { 'onUpdate:modelValue': _, ...filteredAttrs } = this.$attrs
			return {
				...filteredAttrs,
				name: this.name,
				id: undefined,
			}
		},
	},
	watch: {
		localValue: {
			immediate: true,
			handler(val) {
				// Set MdField.value
				const hasValue = val !== undefined && val !== null && val !== ''
				this.MdField.value = hasValue ? val : null

				// Only do DOM manipulation if component is mounted
				if (this.didMount) {
					this.updateFieldValue(val)
				}

				this.setFieldContent()
				this.MdSelect.modelValue = this.localValue

				if (this.didMount) {
					this.emitSelected(val)
				}
			},
		},
		multiple: {
			immediate: true,
			handler(isMultiple) {
				this.MdSelect.multiple = isMultiple
				this.$nextTick(this.initialLocalValueByDefault)
			},
		},
	},
	methods: {
		updateFieldValue(val) {
			console.log('[MdSelect updateFieldValue] val:', val);
			// Set MdField.value for other purposes
			const hasValue = val !== undefined && val !== null && val !== ''
			this.MdField.value = hasValue ? val : null

			// Directly manipulate the DOM to add/remove md-has-value class
			// This works around Vue 3 reactivity issues with provide/inject
			const mdFieldEl = this.$el?.closest?.('.md-field')
			if (mdFieldEl) {
				if (hasValue) {
					mdFieldEl.classList.add('md-has-value')
					console.log('[MdSelect updateFieldValue] Added md-has-value class to DOM');
				} else {
					mdFieldEl.classList.remove('md-has-value')
					console.log('[MdSelect updateFieldValue] Removed md-has-value class from DOM');
				}
			}
		},
		elHasScroll(el) {
			return el.scrollHeight > el.offsetHeight
		},
		scrollToSelectedOption(el, menu) {
			const top = el.offsetTop
			const elHeight = el.offsetHeight
			const menuHeight = menu.offsetHeight

			menu.scrollTop = top - (menuHeight - elHeight) / 2
		},
		setOffsets(target) {
			if (!this.$isServer) {
				// Find the menu content container using querySelector
				const menuContent = this.$el?.querySelector('.md-menu-content.md-select-menu')
				const menu = menuContent?.querySelector('.md-list')

				if (menu) {
					const selected = target || menu.querySelector(".md-selected")

					if (selected) {
						this.scrollToSelectedOption(selected, menu)
						this.offset.y =
							defaultOffset.y - selected.offsetTop + menu.scrollTop + 8
						this.menuStyles = {
							"transform-origin": `0 ${Math.abs(this.offset.y)}px`,
						}
					} else {
						this.offset.y = defaultOffset.y + 1
						this.menuStyles = {}
					}
				}
			}
		},
		onMenuEnter() {
			if (!this.didMount) {
				return
			}

			this.wasOpened = true
			this.setOffsets()
			this.MdField.focused = true
			this.MdField.highlighted = true
			this.$emit("md-opened")
		},
		applyHighlight() {
			this.MdField.focused = false
			this.MdField.highlighted = true
			// Find the input element using querySelector
			const inputEl = this.$el?.querySelector('.md-input')
			if (inputEl) {
				inputEl.focus()
			}
		},
		onClose() {
			this.$emit("md-closed")
			if (this.didMount) {
				this.applyHighlight()
			}
		},
		onFocus() {
			this.MdField.highlighted = true
		},
		removeHighlight() {
			this.MdField.highlighted = false
		},
		openSelect() {
			if (!this.disabled) {
				this.showSelect = true
			}
		},
		arrayAccessorRemove(arr, index) {
			let before = arr.slice(0, index)
			let after = arr.slice(index + 1, arr.length)
			return before.concat(after)
		},
		toggleArrayValue(value) {
			let index = this.localValue.indexOf(value)
			let includes = index > -1
			if (!includes) {
				this.localValue = this.localValue.concat([value])
			} else {
				this.localValue = this.arrayAccessorRemove(this.localValue, index)
			}
		},
		setValue(newValue) {
			this.model = newValue
			this.setFieldValue()
			this.showSelect = false
		},
		setContent(newLabel) {
			this.MdSelect.label = newLabel
			this.selectLabel = newLabel // Update reactive label for input binding
		},
		setContentByValue() {
			const textContent = this.MdSelect.items[this.localValue]

			if (textContent) {
				this.setContent(textContent)
			} else {
				this.setContent("")
			}
		},
		setMultipleValue(value) {
			const newValue = value
			this.toggleArrayValue(newValue)
			this.setFieldValue()
		},
		setMultipleContentByValue() {
			if (!this.localValue || !Array.isArray(this.localValue)) {
				this.initialLocalValueByDefault()
			}

			// Ensure localValue is an array after initialization
			if (!Array.isArray(this.localValue)) {
				return
			}

			let content = []

			this.localValue.forEach((item) => {
				const textContent = this.MdSelect.items[item]

				if (textContent) {
					content.push(textContent)
				}
			})

			this.setContent(content.join(", "))
		},
		setFieldContent() {
			if (this.multiple) {
				this.setMultipleContentByValue()
			} else {
				this.setContentByValue()
			}
		},
		isLocalValueSet() {
			return this.localValue !== undefined && this.localValue !== null
		},
		setLocalValueIfMultiple() {
			if (this.isLocalValueSet()) {
				this.localValue = [this.localValue]
			} else {
				this.localValue = []
			}
		},
		setLocalValueIfNotMultiple() {
			if (this.localValue.length > 0) {
				this.localValue = this.localValue[0]
			} else {
				this.localValue = null
			}
		},
		initialLocalValueByDefault() {
			let isArray = Array.isArray(this.localValue)

			if (this.multiple && !isArray) {
				this.setLocalValueIfMultiple()
			} else if (!this.multiple && isArray) {
				this.setLocalValueIfNotMultiple()
			}
		},
		emitSelected(value) {
			this.$emit("md-selected", value)
		},
		isInvalidValue() {
			// Find the hidden select element using querySelector
			const selectEl = this.$el?.querySelector('select')
			return selectEl && selectEl.validity
				? selectEl.validity.badInput
				: false
		},
	},
	mounted() {
		this.showSelect = false
		this.MdField.select = true
		this.setFieldContent()

		this.$nextTick().then(() => {
			// Call setFieldValue after component is fully mounted
			this.setFieldValue()
			this.didMount = true
			// Also update field value to ensure DOM classes are set after mount
			this.updateFieldValue(this.localValue)
		})
	},
	updated() {
		// Ensure field content is up to date
		this.setFieldContent()
	},
	render() {
		const children = []

		// MdInput with proper attribute and event binding order
		children.push(
			h(this.$options.components.MdInput, {
				...this.attrs,
				class: "md-input md-select-value",
				modelValue: this.selectLabel,
				readonly: true,
				disabled: this.disabled,
				required: this.required,
				placeholder: this.placeholder,
				onFocus: (e) => {
					e.preventDefault()
					this.onFocus()
				},
				onBlur: (e) => {
					e.preventDefault()
					// Don't remove highlight for selects - it should persist
				},
				onClick: this.openSelect,
				onKeydown: (e) => {
					if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
						this.openSelect()
					}
				},
			})
		)

		// MdDropDownIcon
		children.push(
			h(this.$options.components.MdDropDownIcon, {
				onClick: this.openSelect,
			})
		)

		// KeepAlive with MdMenuContent
		children.push(
			h(KeepAlive, {}, () => [
				h(
					this.$options.components.MdMenuContent,
					{
						class: "md-select-menu",
						mdContentClass: this.mdClass,
						style: this.menuStyles,
						onEnter: this.onMenuEnter,
					},
					{
						default: () =>
							this.showSelect && this.$slots.default
								? this.$slots.default()
								: [],
					}
				),
			])
		)

		// Hidden slot when not showing
		if (!this.showSelect) {
			children.push(
				h(
					"div",
					{ style: { display: "none" } },
					this.$slots.default ? this.$slots.default() : []
				)
			)
		}

		// Hidden fake inputs for form compatibility
		children.push(
			h("input", {
				class: "md-input-fake",
				value: this.model,
				disabled: this.disabled,
				readonly: true,
				tabindex: -1,
			})
		)

		// Hidden select with proper attributes (excluding some attrs)
		const selectAttrs = { ...this.attributes }
		children.push(
			h("select", {
				readonly: true,
				value: this.model,
				...selectAttrs,
				tabindex: -1,
			})
		)

		return h(
			this.$options.components.MdMenu,
			{
				class: { "md-select": true, "md-disabled": this.disabled },
				mdCloseOnSelect: false,
				mdCloseOnClick: false,
				mdActive: this.showSelect,
				"onUpdate:mdActive": (val) => {
					this.showSelect = val
				},
				mdOffsetX: this.offset.x,
				mdOffsetY: this.offset.y,
				mdDense: this.mdDense,
				onMdClosed: this.onClose,
			},
			() => children
		)
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-menu.md-select {
	display: flex;
	flex: 1;
	overflow: auto;

	&:not(.md-disabled) {
		.md-input,
		.md-icon {
			cursor: pointer;
			outline: none;
		}
	}

	.md-input {
		flex: 1;
		min-width: 0;
	}

	select,
	.md-input-fake {
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		position: absolute;
		clip: rect(0 0 0 0);
		border: 0;
	}
}
.md-menu-content.md-select-menu {
	z-index: 111;
	width: 100%;

	&.md-menu-content-enter {
		transform: translate3d(0, -8px, 0) scaleY(0.3);
	}

	.md-list {
		transition: opacity 0.3s $md-transition-drop-timing;
	}
}
</style>
