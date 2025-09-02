<template>
	<ul
		class="md-list"
		:class="[$mdActiveTheme]"
		v-bind="$attrs"
		v-on="$listeners"
	>
		<slot />
	</ul>
</template>

<script>
import { h, reactive, provide, getCurrentInstance } from "vue"
import MdComponent from "@/core/MdComponent"

export default MdComponent({
	name: "MdList",
	props: {
		mdExpandSingle: {
			default: false,
		},
	},
	setup(props, { slots, attrs }) {
		// Get the component instance to access $mdActiveTheme
		const instance = getCurrentInstance()
		const themeClass = instance?.proxy?.$mdActiveTheme || null

		const MdList = reactive({
			expandable: [],
			expandATab: (expandedListItem) => {
				if (props.mdExpandSingle && expandedListItem) {
					const otherExpandableListItems = MdList.expandable.filter(
						(target) => target !== expandedListItem
					)
					otherExpandableListItems.forEach((expandableListItem) =>
						expandableListItem.close()
					)
				}
			},
			pushExpandable: (expandableListItem) => {
				let expandableListItems = MdList.expandable

				if (
					!expandableListItems.find((target) => target === expandableListItem)
				) {
					MdList.expandable = expandableListItems.concat([expandableListItem])
				}
			},
			removeExpandable: (expandableListItem) => {
				let expandableListItems = MdList.expandable

				if (
					expandableListItems.find((target) => target === expandableListItem)
				) {
					MdList.expandable = expandableListItems.filter(
						(target) => target !== expandableListItem
					)
				}
			},
		})

		provide("MdList", MdList)

		return () => {
			return h(
				"ul",
				{
					class: ["md-list", themeClass],
					...attrs,
				},
				slots.default ? slots.default() : []
			)
		}
	},
})
</script>

<style lang="scss">
@import "../MdAnimation/variables.scss";

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
