<script>
import { h } from "vue"
import MdInteractionEvents from "@/core/utils/MdInteractionEvents"
import MdRouterLinkProps from "@/core/utils/MdRouterLinkProps"
import MdListItemDefault from "./MdListItemDefault.vue"
import MdListItemFakeButton from "./MdListItemFakeButton.vue"
import MdListItemButton from "./MdListItemButton.vue"
import MdListItemLink from "./MdListItemLink.vue"
import MdListItemRouter from "./MdListItemRouter.vue"
import MdListItemExpand from "./MdListItemExpand.vue"
import MdButton from "@/components/MdButton/MdButton.vue"

function hasExpansion(props) {
	return props.hasOwnProperty("mdExpand") && props.mdExpand !== false
}

function resolveScopedSlot(props, slots) {
	if (hasExpansion(props)) {
		return {
			"md-expand": () => {
				return slots["md-expand"] ? slots["md-expand"]() : []
			},
		}
	}
}

function hasChildrenButtons(children) {
	return (
		children.default &&
		children.default.some(
			(child) => child.type && child.type.name === "MdButton"
		)
	)
}

function shouldRenderButtonWithListener(listeners) {
	let listenerNames = Object.keys(listeners || {})
	let shouldRender = false

	listenerNames.forEach((listener) => {
		if (MdInteractionEvents.includes(listener)) {
			shouldRender = true
		}
	})

	return shouldRender
}

function isRouterLink(parent, props) {
	return parent && parent.$router && props.to
}

function createListComponent(props, parent, listeners, slots) {
	if (hasExpansion(props)) {
		return MdListItemExpand
	}

	if (props.disabled) {
		return MdListItemButton
	}

	if (isRouterLink(parent, props)) {
		MdListItemRouter.props = MdRouterLinkProps(parent, {
			target: String,
		})
		delete MdListItemRouter.props.href

		return MdListItemRouter
	}

	if (props.href) {
		return MdListItemLink
	}

	if (shouldRenderButtonWithListener(listeners)) {
		return renderButtonWithListener(slots)
	}

	return MdListItemDefault
}

function renderButtonWithListener(slots) {
	if (hasChildrenButtons(slots)) {
		return MdListItemFakeButton
	}
	return MdListItemButton
}

export default {
	name: "MdListItem",
	functional: true,
	components: {
		MdButton,
	},
	render(props, { parent, listeners, data, slots }) {
		let listComponent = createListComponent(props, parent, listeners, slots)
		let staticClass = "md-list-item"

		if (data.staticClass) {
			staticClass += " " + data.staticClass
		}

		// Prepare slots for Vue 3
		const componentSlots = {}
		if (slots.default) {
			componentSlots.default = () => slots.default()
		}

		// Handle scoped slots for expandable items
		const scopedSlots = resolveScopedSlot(props, slots)
		if (scopedSlots) {
			Object.assign(componentSlots, scopedSlots)
		}

		return h(
			"li",
			{
				...data,
				class: staticClass,
				onClick: listeners?.click,
				on: listeners,
			},
			[
				h(
					listComponent,
					{
						...props,
						class: "md-list-item-container md-button-clean",
						onClick: listeners?.click,
						on: listeners,
					},
					componentSlots
				),
			]
		)
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-list-item {
	height: auto;
	position: relative;
	z-index: 2;

	&.md-inset {
		.md-list-item-content {
			padding-left: 72px;
		}
	}

	.md-icon {
		margin: 0;
		transition-property: color, margin-right;
	}
}

.md-list-item-container {
	width: 100%;
	font-size: 16px;
	font-weight: 400;
	text-align: left;
	text-transform: none;

	&:not(.md-list-item-default):not([disabled]) {
		> .md-list-item-content {
			user-select: none;
			cursor: pointer;
		}
	}

	&.md-button-clean:hover {
		opacity: 1;
		text-decoration: none;
	}
}

.md-list-item-content {
	min-height: 48px;
	padding: 4px 16px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	transition: padding 0.4s $md-transition-stand-timing;
	will-change: padding;

	.md-list.md-dense & {
		min-height: 40px;
		font-size: 13px;

		> .md-avatar {
			margin-top: 0;
			margin-bottom: 0;

			&:not(.md-small) {
				width: 36px;
				min-width: 36px;
				height: 36px;
			}

			&:first-child {
				margin-right: 20px;
			}
		}
	}

	.md-list.md-double-line & {
		min-height: 72px;
	}

	.md-list.md-double-line.md-dense & {
		min-height: 60px;
	}

	.md-list.md-triple-line & {
		min-height: 88px;
	}

	.md-list.md-triple-line.md-dense & {
		min-height: 76px;
	}

	.md-list-action {
		margin: 0 -10px 0 0;

		&:last-of-type {
			margin: 0 -10px 0 16px;

			.md-list.md-triple-line & {
				align-self: flex-start;
			}
		}
	}

	> .md-icon:first-child {
		margin-right: 32px;
	}

	> .md-icon:last-child {
		margin-left: 16px;
	}

	> .md-checkbox,
	> .md-radio {
		margin: 0;

		&:first-child {
			margin-right: 36px;
		}
	}

	> .md-switch {
		margin: 0;

		&:first-child {
			margin-right: 22px;
		}
	}

	> .md-avatar {
		margin: 4px 0;

		&:first-child {
			margin-right: 16px;
		}
	}
}

.md-list-item-text {
	flex: 1;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	overflow: hidden;
	line-height: 1.25em;
	white-space: nowrap;

	.md-list.md-dense & {
		font-size: 13px;
	}

	* {
		width: 100%;
		margin: 0;
		overflow: hidden;
		line-height: 1.25em;
		text-overflow: ellipsis;
	}

	:nth-child(2),
	:nth-child(3) {
		font-size: 14px;
	}

	.md-list.md-dense & * {
		font-size: 13px;
	}
}
</style>
