<script>
import { h, nextTick } from "vue"
import raf from "raf"
import MdComponent from "@/core/MdComponent"
import MdAssetIcon from "@/core/mixins/MdAssetIcon/MdAssetIcon"
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdObserveElement from "@/core/utils/MdObserveElement"
import MdThrottling from "@/core/utils/MdThrottling"
import MdSwipeable from "@/core/mixins/MdSwipeable/MdSwipeable"
import MdButton from "@/components/MdButton/MdButton.vue"
import MdContent from "@/components/MdContent/MdContent.vue"
import MdIcon from "@/components/MdIcon/MdIcon.vue"

function areEqual(array1, array2) {
	if (array1.length !== array2.length) return false
	for (let i = 0; i < array1.length; i++) {
		if (array1[i] !== array2[i]) return false
	}
	return true
}

export default MdComponent({
	name: "MdTabs",
	mixins: [MdAssetIcon, MdSwipeable],
	components: { MdButton, MdContent },
	props: {
		mdAlignment: {
			type: String,
			default: "left",
			...MdPropValidator("md-alignment", [
				"left",
				"right",
				"centered",
				"fixed",
			]),
		},
		mdElevation: { type: [Number, String], default: 0 },
		mdSyncRoute: Boolean,
		mdDynamicHeight: Boolean,
		mdActiveTab: [String, Number],
		mdIsRtl: { type: Boolean, default: false },
	},
	emits: ["md-changed"],
	data: () => ({
		resizeObserver: null,
		activeTab: null,
		activeTabIndex: 0,
		indicatorStyles: {},
		indicatorClass: null,
		noTransition: true,
		containerStyles: {},
		contentStyles: { height: "0px" },
		hasContent: false,
		MdTabs: { items: new Map() },
		activeButtonEl: null,
		orderedIds: [],
		navEl: null,
		tabsContentEl: null,
		indicatorEl: null,
		tabsContainerEl: null,
	}),
	provide() {
		return { MdTabs: this.MdTabs }
	},
	computed: {
		orderedItems() {
			return this.orderedIds.map((id) => this.MdTabs.items.get(id))
		},
		tabsClasses() {
			return {
				["md-alignment-" + this.mdAlignment]: true,
				"md-no-transition": this.noTransition,
				"md-dynamic-height": this.mdDynamicHeight,
			}
		},
		navigationClasses() {
			return "md-elevation-" + this.mdElevation
		},
    mdSwipeElement() { return this.tabsContentEl },
  },
	watch: {
		MdTabs: {
			deep: true,
			handler() {
				this.recomputeOrderedIds()
				this.setHasContent()
				this.tryKeepCurrentTab()
			},
		},
		activeTab(tabId) {
			this.$emit("md-changed", tabId)
			this.setActiveButtonElAndIndicatorStyles()
		},
		mdActiveTab(tabId) {
			this.activeTab = tabId
		},
		activeButtonEl(el) {
			this.activeTabIndex = el
				? [].indexOf.call(el.parentNode.childNodes, el)
				: -1
		},
		activeTabIndex() {
			this.setIndicatorStyles()
			this.calculateTabPos()
		},
	},
  methods: {
    // Resolve DOM elements via query to avoid ref ownership issues
    resolveEls() {
      const root = this.$el
      if (!root) return
      this.navEl = root.querySelector('.md-tabs-navigation')
      this.indicatorEl = root.querySelector('.md-tabs-indicator')
      this.tabsContentEl = root.querySelector('.md-tabs-content')
      this.tabsContainerEl = root.querySelector('.md-tabs-container')
    },
		isActiveTabId(id) {
			return (
				(Number.isNaN(id) && Number.isNaN(this.activeTab)) ||
				id === this.activeTab
			)
		},
		hasActiveTab() {
			return this.activeTab != null || this.mdActiveTab != null
		},
		setActiveTab(id) {
			if (!this.mdSyncRoute) this.activeTab = id
		},
		setActiveButtonElAndIndicatorStyles() {
			nextTick().then(() => {
				this.setIndicatorStyles()
				this.setActiveButtonEl()
			})
		},
		tryKeepCurrentTab() {
			if (this.mdSyncRoute) return
			const newIndex = this.orderedIds.indexOf(this.activeTab)
			const canKeepId = newIndex !== -1
			const last = this.orderedIds.length - 1
			const canKeepIndex =
				this.activeTabIndex >= 0 && this.activeTabIndex <= last
			const hasAny = last !== -1
			if (canKeepId) this.setActiveButtonElAndIndicatorStyles()
			else if (canKeepIndex) this.setActiveTabByIndex(this.activeTabIndex)
			else if (hasAny) this.setActiveTabByIndex(last)
			else this.activeTab = null
		},
		setActiveButtonEl() {
			this.activeButtonEl =
				this.navEl && this.navEl.querySelector
					? this.navEl.querySelector(".md-tab-nav-button.md-active")
					: null
		},
		setActiveTabByIndex(index) {
			this.activeTab = this.orderedIds[index]
		},
		ensureHasActiveTab() {
			if (!this.hasActiveTab()) this.activeTab = this.orderedIds[0]
		},
		setHasContent() {
			this.hasContent = this.orderedItems.some((i) => i && i.hasContent)
		},
    setIndicatorStyles() {
      raf(() => {
        nextTick().then(() => {
          if (this.activeButtonEl) {
            if (!this.indicatorEl) this.resolveEls()
            const buttonWidth = this.activeButtonEl.offsetWidth
            const buttonLeft = this.activeButtonEl.offsetLeft
            const indicatorLeft = this.indicatorEl ? this.indicatorEl.offsetLeft : 0
            this.indicatorClass =
              indicatorLeft < buttonLeft
                ? "md-tabs-indicator-right"
                : "md-tabs-indicator-left"
            this.indicatorStyles = {
              left: `${buttonLeft}px`,
              right: `calc(100% - ${buttonWidth + buttonLeft}px)`,
            }
          } else {
            this.indicatorStyles = { left: "100%", right: "100%" }
          }
        })
      })
    },
    calculateTabPos() {
      if (this.hasContent) {
        if (!this.tabsContainerEl) this.resolveEls()
        const tabElements = this.tabsContainerEl
          ? this.ours(this.tabsContainerEl.querySelectorAll(`.md-tab:nth-child(${this.activeTabIndex + 1})`))
          : []
        const tabElement = tabElements.length ? tabElements[0] : null
        this.contentStyles = {
          height: tabElement ? `${tabElement.offsetHeight}px` : 0,
        }
        this.containerStyles = {
					transform: `translate3D(${
						this.mdIsRtl
							? this.activeTabIndex * 100
							: -this.activeTabIndex * 100
					}%, 0, 0)`,
				}
			}
		},
		callResizeFunctions() {
			this.setIndicatorStyles()
			this.calculateTabPos()
		},
    setupObservers() {
      if (!this.tabsContentEl) this.resolveEls()
      const target = this.tabsContentEl
      this.resizeObserver = MdObserveElement(
        target,
        { childList: true, characterData: true, subtree: true },
        () => {
          this.callResizeFunctions()
        }
      )
      window.addEventListener("resize", this.callResizeFunctions)
    },
    recomputeOrderedIds() {
      if (!this.tabsContainerEl) this.resolveEls()
      const container = this.tabsContainerEl
      const ordered = container
        ? this.ours(container.querySelectorAll(".md-tab")).map(
            (el) => el.mdTabIdAsObject
          )
        : []
      if (!areEqual(this.orderedIds, ordered)) this.orderedIds = ordered
    },
		ours(nodeList) {
			return [].filter.call(
				nodeList,
				(el) => el.parentNode === this.tabsContainerEl
			)
		},
	},
	created() {
		this.setIndicatorStyles = MdThrottling(this.setIndicatorStyles, 300)
		this.activeTab = this.mdActiveTab
	},
  mounted() {
    this.resolveEls()
    this.setupObservers()
    this.$nextTick()
      .then(() => {
        if (!this.mdSyncRoute) {
          this.recomputeOrderedIds()
          this.ensureHasActiveTab()
        }
        return this.$nextTick()
      })
      .then(() => {
        window.setTimeout(() => {
          this.resolveEls()
          this.setActiveButtonEl()
          this.callResizeFunctions()
          this.noTransition = false
          this.setupObservers()
        }, 100)
      })
    this.navEl && this.navEl.addEventListener && this.navEl.addEventListener("transitionend", this.setIndicatorStyles)
  },
  beforeUnmount() {
    this.resizeObserver && this.resizeObserver.disconnect()
    window.removeEventListener("resize", this.callResizeFunctions)
    this.navEl && this.navEl.removeEventListener && this.navEl.removeEventListener("transitionend", this.setIndicatorStyles)
  },
  render() {
    return h(
      "div",
      { class: ["md-tabs", this.tabsClasses, this.$mdActiveTheme] },
      [
        h(
          "div",
          { class: ["md-tabs-navigation", this.navigationClasses] },
          [
						...this.orderedItems.map(
            ({ id, label, props, icon, disabled, data, events }, index) => {
              const { class: externalClass, ...restEvents } = events || {}
              return h(
                MdButton,
                {
                  key: index,
                  class: [
                    {
                      "md-tab-nav-button": true,
                      "md-active": !this.mdSyncRoute && this.isActiveTabId(id),
                      "md-icon-label": icon && label,
                    },
                    externalClass,
                  ],
                  disabled,
                  ...props,
                  ...restEvents,
                  onClick: () => this.setActiveTab(id),
                },
                () => [
                  this.$slots && this.$slots["md-tab"]
                    ? this.$slots["md-tab"]({ tab: { label, icon, data } })
                    : icon
                    ? [
                        this.isAssetIcon(icon)
                          ? h(MdIcon, { class: "md-tab-icon", mdSrc: icon })
                          : h(MdIcon, { class: "md-tab-icon" }, () => icon),
                        h("span", { class: "md-tab-label" }, label),
                      ]
                    : label,
                ]
              )
            }
          ),
            h("span", { class: ["md-tabs-indicator", this.indicatorClass], style: this.indicatorStyles }),
          ]
        ),
        h(
          MdContent,
          { class: "md-tabs-content", style: this.contentStyles, show: this.hasContent },
          () => h("div", { class: "md-tabs-container", style: this.containerStyles }, this.$slots.default ? this.$slots.default() : [])
        ),
      ]
    )
  },
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdElevation/mixins";
@import "@/components/MdLayout/mixins";

.md-tabs {
	display: flex;
	flex-direction: column;
	&.md-no-transition * {
		transition: none !important;
	}
	&.md-dynamic-height .md-tabs-content {
		transition: height 0.3s $md-transition-default-timing;
		will-change: height;
	}
	&.md-transparent {
		.md-tabs-navigation,
		.md-tabs-content {
			background-color: transparent !important;
		}
	}
	&.md-dynamic-height .md-tabs-content {
		transition: height 0.35s $md-transition-stand-timing;
	}
	&.md-alignment-left .md-tabs-navigation {
		justify-content: flex-start;
	}
	&.md-alignment-right .md-tabs-navigation {
		justify-content: flex-end;
	}
	&.md-alignment-centered .md-tabs-navigation {
		justify-content: center;
	}
	&.md-alignment-fixed .md-tabs-navigation {
		justify-content: center;
		.md-button {
			max-width: 264px;
			min-width: 160px;
			flex: 1;
			@include md-layout-small {
				min-width: 72px;
			}
		}
	}
	.md-toolbar & {
		padding-left: 48px;
		@include md-layout-small {
			margin: 0 -8px;
			padding-left: 0px;
		}
	}
}
.md-tabs-navigation {
	display: flex;
	position: relative;
	.md-button {
		max-width: 264px;
		min-width: 72px;
		height: 48px;
		margin: 0;
		cursor: pointer;
		border-radius: 0;
		font-size: 13px;
	}
	.md-button-content {
		position: static;
	}
	.md-icon-label {
		height: 72px;
		.md-button-content {
			display: flex;
			flex-direction: column;
			justify-content: center;
		}
		.md-tab-icon + .md-tab-label {
			margin-top: 10px;
		}
	}
	.md-ripple {
		padding: 0 24px;
		@include md-layout-small {
			padding: 0 12px;
		}
	}
}
.md-tabs-indicator {
	height: 2px;
	position: absolute;
	bottom: 0;
	left: 0;
	transform: translateZ(0);
	will-change: left, right;
	&.md-tabs-indicator-left {
		transition: left 0.3s $md-transition-default-timing,
			right 0.35s $md-transition-default-timing;
	}
	&.md-tabs-indicator-right {
		transition: right 0.3s $md-transition-default-timing,
			left 0.35s $md-transition-default-timing;
	}
}
.md-tabs-content {
	overflow: hidden;
	transition: none;
	will-change: height;
}
.md-tabs-container {
	display: flex;
	align-items: flex-start;
	flex-wrap: nowrap;
	transform: translateZ(0);
	transition: transform 0.35s $md-transition-default-timing;
	will-change: transform;
}
.md-tab {
	width: 100%;
	flex: 1 0 100%;
	padding: 16px;
	@include md-layout-small {
		padding: 8px;
	}
}
</style>
