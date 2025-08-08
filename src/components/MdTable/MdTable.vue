<template>
	<md-tag-switcher :md-tag="contentTag" class="md-table">
		<slot name="md-table-toolbar" />

		<keep-alive>
			<md-table-alternate-header
				v-if="$slots['md-table-alternate-header'] && selectedCount"
			>
				<slot name="md-table-alternate-header" :count="selectedCount" />
			</md-table-alternate-header>
		</keep-alive>

		<div
			class="md-table-fixed-header"
			:class="headerClasses"
			:style="headerStyles"
			v-if="mdFixedHeader"
		>
			<div
				class="md-table-fixed-header-container"
				ref="fixedHeaderContainer"
				@scroll="setHeaderScroll"
			>
				<table :style="fixedHeaderTableStyles">
					<md-table-thead />
				</table>
			</div>
		</div>

		<md-content
			class="md-table-content md-scrollbar"
			:class="contentClasses"
			:style="contentStyles"
			@scroll="setScroll"
		>
			<table ref="contentTable">
				<md-table-thead
					:class="headerClasses"
					v-if="!mdFixedHeader && $slots['md-table-row']"
				/>

				<tbody v-if="!$slots['md-table-row']">
					<slot />
				</tbody>

				<tbody v-else-if="value.length">
					<md-table-row-ghost
						v-for="(item, index) in value"
						:key="getRowId(item, mdModelId)"
						:md-id="getRowId(item, mdModelId)"
						:md-index="index"
						:md-item="item"
					>
						<slot name="md-table-row" :item="item" :index="index" />
					</md-table-row-ghost>
				</tbody>

				<tbody v-else-if="$slots['md-table-empty-state']">
					<tr>
						<td :colspan="headerCount">
							<slot name="md-table-empty-state" />
						</td>
					</tr>
				</tbody>
			</table>

			<slot name="md-table-pagination" />
		</md-content>

		<slot v-if="!hasValue && $slots['md-table-pagination']" />
	</md-tag-switcher>
</template>

<script>
import raf from "raf"
import MdUuid from "@/core/utils/MdUuid"
import MdPropValidator from "@/core/utils/MdPropValidator"
import MdTableThead from "./MdTableThead.vue"
import MdTableAlternateHeader from "./MdTableAlternateHeader.vue"
import MdTableRow from "./MdTableRow.vue"
import MdTableRowGhost from "./MdTableRowGhost.vue"
import MdTableCellSelection from "./MdTableCellSelection.vue"
import MdResizeObserver from "@/core/utils/MdResizeObserver"
import MdContent from "@/components/MdContent/MdContent.vue"
import MdTagSwitcher from "@/components/MdTagSwitcher/MdTagSwitcher.vue"

const getObjectAttribute = (object, key) => {
	let value = object

	for (const attribute of key.split(".")) {
		value = value[attribute]
	}

	return value
}

export default {
	name: "MdTable",
	components: {
		MdTagSwitcher,
		MdTableAlternateHeader,
		MdTableThead,
		MdTableRow,
		MdTableRowGhost,
		MdTableCellSelection,
		MdContent,
	},
	props: {
		value: [Array, Object],
		mdModelId: {
			type: String,
			default: "id",
		},
		mdCard: Boolean,
		mdFixedHeader: Boolean,
		mdHeight: {
			type: [Number, String],
			default: 400,
		},
		mdSort: String,
		mdSortOrder: {
			type: String,
			default: "asc",
			...MdPropValidator("md-sort-order", ["asc", "desc"]),
		},
		mdSortFn: {
			type: Function,
			default(value) {
				const sortBy = this.MdTable.sort
				const isAsc = this.MdTable.sortOrder === "asc"
				const multiplier = isAsc ? 1 : -1

				/* eslint-disable complexity */
				const comparator = function (a, b) {
					const aAttr = getObjectAttribute(a, sortBy)
					const bAttr = getObjectAttribute(b, sortBy)

					if (aAttr === bAttr) {
						return 0
					} else if (
						aAttr === null ||
						aAttr === undefined ||
						Number.isNaN(aAttr)
					) {
						// a is last
						return 1
					} else if (
						bAttr === null ||
						bAttr === undefined ||
						Number.isNaN(bAttr)
					) {
						// b is last
						return -1
					} else if (typeof aAttr === "number" && typeof bAttr === "number") {
						// numerical compare, negate if descending
						return (aAttr - bAttr) * multiplier
					}
					// locale compare, negate if descending
					return String(aAttr).localeCompare(String(bAttr)) * multiplier
				}
				/* eslint-enable complexity */

				return value.sort(comparator)
			},
		},
		mdSelectedValue: {
			type: [Array, Object],
		},
	},
	data() {
		return {
			windowResizeObserver: null,
			fixedHeaderTableWidth: 0,
			fixedHeaderPadding: 0,
			hasContentScroll: false,
			MdTable: {
				items: {},
				sort: null,
				sortOrder: null,
				singleSelection: null,
				selectedItems: [],
				selectable: [],
				fixedHeader: null,
				contentPadding: null,
				contentEl: null,
				// computed
				hasValue: this.hasValue,
				// methods
				emitEvent: this.emitEvent,
				sortTable: this.sortTable,
				manageItemSelection: this.manageItemSelection,
				getModel: this.getModel,
				getModelItem: this.getModelItem,
				selectingMode: null,
			},
			itemsUuidMap: new WeakMap(),
		}
	},
	computed: {
		contentTag() {
			if (this.mdCard) {
				return "md-card"
			}

			return "md-content"
		},
		headerCount() {
			return Object.keys(this.MdTable.items).length
		},
		selectedCount() {
			return this.MdTable.selectedItems.length
		},
		headerStyles() {
			if (this.mdFixedHeader) {
				return `padding-right: ${this.fixedHeaderPadding}px`
			}
			return ""
		},
		hasValue() {
			return this.value && this.value.length !== 0
		},
		headerClasses() {
			if ((this.mdFixedHeader && this.hasContentScroll) || !this.hasValue) {
				return "md-table-fixed-header-active"
			}
			return ""
		},
		contentStyles() {
			if (this.mdFixedHeader) {
				const height =
					typeof this.mdHeight === "number"
						? this.mdHeight + "px"
						: this.mdHeight

				return {
					height,
					"max-height": height,
				}
			}
			return {}
		},
		contentClasses() {
			return {
				"md-table-fixed-header": this.mdFixedHeader,
			}
		},
		fixedHeaderTableStyles() {
			return {
				width: this.fixedHeaderTableWidth + "px",
			}
		},
	},
	provide() {
		return {
			MdTable: this.MdTable,
		}
	},
	watch: {
		value: {
			handler() {
				this.$nextTick(() => {
					this.setTableItems()
					this.setFixedHeaderWidth()
				})
			},
			immediate: true,
		},
		mdSort() {
			this.MdTable.sort = this.mdSort
			this.sortTable()
		},
		mdSortOrder() {
			this.MdTable.sortOrder = this.mdSortOrder
			this.sortTable()
		},
		mdSelectedValue: {
			handler() {
				this.setSelectedItems()
			},
			immediate: true,
		},
	},
	methods: {
		getRowId(item, idKey) {
			if (this.itemsUuidMap.has(item)) {
				return this.itemsUuidMap.get(item)
			}

			const id = getObjectAttribute(item, idKey)
			const uuid = id || MdUuid()

			this.itemsUuidMap.set(item, uuid)

			return uuid
		},
		setTableItems() {
			this.MdTable.items = {}
			this.MdTable.selectable = []

			if (this.hasValue) {
				this.value.forEach((item, index) => {
					const id = this.getRowId(item, this.mdModelId)
					this.MdTable.items[id] = item
					this.MdTable.selectable.push(id)
				})
			}
		},
		setSelectedItems() {
			if (this.mdSelectedValue) {
				if (Array.isArray(this.mdSelectedValue)) {
					this.MdTable.selectedItems = this.mdSelectedValue
				} else {
					this.MdTable.selectedItems = [this.mdSelectedValue]
				}
			} else {
				this.MdTable.selectedItems = []
			}
		},
		setFixedHeaderWidth() {
			if (this.mdFixedHeader && this.$refs.contentTable) {
				this.fixedHeaderTableWidth = this.$refs.contentTable.offsetWidth
				this.fixedHeaderPadding = this.getScrollbarWidth()
			}
		},
		getScrollbarWidth() {
			const outer = document.createElement("div")
			outer.style.visibility = "hidden"
			outer.style.overflow = "scroll"
			document.body.appendChild(outer)

			const inner = document.createElement("div")
			outer.appendChild(inner)

			const scrollbarWidth = outer.offsetWidth - inner.offsetWidth
			outer.parentNode.removeChild(outer)

			return scrollbarWidth
		},
		setHeaderScroll(event) {
			if (this.$refs.contentTable) {
				this.$refs.contentTable.scrollLeft = event.target.scrollLeft
			}
		},
		setScroll(event) {
			if (this.mdFixedHeader && this.$refs.fixedHeaderContainer) {
				this.$refs.fixedHeaderContainer.scrollLeft = event.target.scrollLeft
			}

			this.hasContentScroll = event.target.scrollTop > 0

			raf(() => {
				this.emitEvent("scroll", event)
			})
		},
		sortTable() {
			if (this.mdSort && this.hasValue) {
				this.mdSortFn(this.value)
			}
		},
		manageItemSelection(item) {
			const index = this.MdTable.selectedItems.indexOf(item)

			if (index > -1) {
				this.MdTable.selectedItems.splice(index, 1)
			} else {
				this.MdTable.selectedItems.push(item)
			}

			this.emitEvent("selection", this.MdTable.selectedItems)
		},
		getModel() {
			return this.value
		},
		getModelItem(id) {
			return this.MdTable.items[id]
		},
		emitEvent(event, data) {
			this.$emit(event, data)
		},
	},
	mounted() {
		this.MdTable.sort = this.mdSort
		this.MdTable.sortOrder = this.mdSortOrder
		this.MdTable.fixedHeader = this.mdFixedHeader
		this.MdTable.contentEl = this.$refs.contentTable

		this.setTableItems()
		this.setSelectedItems()
		this.setFixedHeaderWidth()

		if (this.mdFixedHeader) {
			this.windowResizeObserver = new MdResizeObserver(() => {
				this.setFixedHeaderWidth()
			})

			this.windowResizeObserver.observe(window)
		}
	},
	beforeUnmount() {
		if (this.windowResizeObserver) {
			this.windowResizeObserver.disconnect()
		}
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-table {
	display: flex;
	flex-flow: column wrap;
	overflow-x: auto;

	.md-table-fixed-header {
		position: relative;

		.md-table-fixed-header-container {
			-webkit-box-flex: 1;
			flex: 1;
			overflow-x: auto;

			&::-webkit-scrollbar,
			&::-webkit-scrollbar-thumb,
			&::-webkit-scrollbar-button {
				display: none;
			}
		}
	}

	.md-table-fixed-header-active {
		border-bottom: 1px solid;
	}

	.md-table-content {
		flex: 1;
		overflow-x: auto;
		transition: height 0.3s $md-transition-default-timing;
	}

	.md-table-empty {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	table {
		width: 100%;
		border-spacing: 0;
		border-collapse: collapse;
		overflow: hidden;
	}
}
</style>
