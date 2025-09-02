<script>
import { h, nextTick } from "vue"
import raf from "raf"
import MdArrowDownIcon from "@/core/icons/MdArrowDownIcon.vue"
import MdListItemContent from "./MdListItemContent.vue"

export default {
	name: "MdListItemExpand",
	inject: ["MdList"],
	components: {
		MdArrowDownIcon,
		MdListItemContent,
	},
	props: {
		mdExpanded: Boolean,
		disabled: Boolean,
	},
	data() {
		return {
			expandStyles: {},
			showContent: false,
		}
	},
	computed: {
		isDisabled() {
			return this.disabled
		},
		expandClasses() {
			return {
				"md-list-item-expand": true,
				"md-active": this.showContent,
			}
		},
	},
	watch: {
		mdExpanded(newVal) {
			newVal ? this.open() : this.close()
		},
		showContent(expanded) {
			this.$emit("update:mdExpanded", expanded)
			nextTick(() => this.$emit(expanded ? "md-expanded" : "md-collapsed"))
			if (expanded) this.MdList.expandATab?.(this)
		},
	},
	created() {
		this.MdList?.pushExpandable?.(this)
	},
	mounted() {
		if (this.mdExpanded) this.open()
	},
	beforeUnmount() {
		this.MdList?.removeExpandable?.(this)
	},
	methods: {
		getChildrenSize() {
			const expandEl = this.$refs.listExpand
			let size = 0
			Array.from(expandEl.children).forEach((child) => {
				size += child.offsetHeight
			})
			return size
		},
		fetchStyle() {
			return new Promise((resolve) => {
				raf(() => {
					const fullHeight = this.showContent
						? this.getChildrenSize() + "px"
						: "auto"
					this.expandStyles = { height: fullHeight }
					resolve()
				})
			})
		},
		toggleExpand() {
			this.fetchStyle().then(() => {
				this.showContent = !this.showContent
			})
		},
		open() {
			if (this.showContent) return
			this.fetchStyle().then(() => {
				this.showContent = true
			})
		},
		close() {
			if (!this.showContent) return
			this.fetchStyle().then(() => {
				this.showContent = false
			})
		},
	},
	render() {
		return h(
			"div",
			{
				class: this.expandClasses,
			},
			[
				h(
					MdListItemContent,
					{
						mdDisabled: this.isDisabled,
						onClick: this.toggleExpand,
					},
					{
						default: () => [
							this.$slots.default?.(),
							h(MdArrowDownIcon, { class: "md-list-expand-icon" }),
						],
					}
				),
				h(
					"div",
					{
						class: "md-list-expand",
						ref: "listExpand",
						style: this.expandStyles,
					},
					this.$slots["md-expand"]?.()
				),
			]
		)
	},
}
</script>

<style lang="scss">
@import "../../MdAnimation/variables.scss";

.md-list-item-expand {
	border-top: 1px solid transparent;
	border-bottom: 1px solid transparent;
	transition: border 0.4s $md-transition-stand-timing;
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
		transition: 0.4s $md-transition-stand-timing;
		transition-property: transform, opacity;
		will-change: transform, opacity;
	}

	.md-list-expand-icon {
		transition: transform 0.4s $md-transition-stand-timing;
		will-change: transform;
	}
}
</style>
