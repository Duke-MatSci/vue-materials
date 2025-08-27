<script>
import { h, resolveComponent } from "vue"
import MdAppSideDrawer from "./MdAppSideDrawer.vue"
import MdAppInternalDrawer from "./MdAppInternalDrawer.vue"
import MdDrawerRightPrevious from "./MdDrawerRightPrevious.vue"

const componentTypes = ["md-app-toolbar", "md-app-drawer", "md-app-content"]

function normilizeTagName(tagName) {
	return tagName.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()
}

function isValidChild(child) {
	if (!child || !child.type) return false
	const tag = child.type.name || child.type.__name || ""
	return componentTypes.includes(normilizeTagName(tag))
}

function isRightDrawer(props) {
	if (!props) return false
	return props.mdRight === "" || !!props.mdRight
}

function shouldRenderSlot(data, child) {
	return (data && componentTypes.includes(data.slot)) || isValidChild(child)
}

function generateAttrKeys(attrs) {
	return JSON.stringify({
		persistent: attrs && attrs["md-persistent"],
		permanent: attrs && attrs["md-permanent"],
	})
}

/* eslint-disable complexity */
function buildSlots(
	children,
	context,
	functionalContext,
	options,
	createElement
) {
	let slots = []
	let hasDrawer = false

	if (children) {
		children.forEach((child) => {
			const data = child.data || {}
			const props = child.props || {}

			if (shouldRenderSlot(data, child)) {
				const slotName = data.slot || normilizeTagName(child.type?.name || "")
				child.data = child.data || {}
				child.data.slot = slotName

				if (slotName === "md-app-drawer") {
					const isRight = isRightDrawer(props)

					if (hasDrawer) {
						console.warn(
							`There shouldn't be more than one drawer in a MdApp at one time.`
						)
						return
					}

					hasDrawer = true
					child.data.slot += `-${isRight ? "right" : "left"}`
					child.key = generateAttrKeys(data.attrs || {})

					if (isRight) {
						const drawerRightPrevious = h(MdDrawerRightPrevious, {
							...props,
						})
						drawerRightPrevious.data = drawerRightPrevious.data || {}
						drawerRightPrevious.data.slot = "md-app-drawer-right-previous"
						slots.push(drawerRightPrevious)
					}
				}

				slots.push(child)
			}
		})
	}

	return slots
}
/* eslint-enable complexity */

function getDrawers(children) {
	const drawerVnodes = children.filter((child) => {
		const tag = child.data?.slot || normilizeTagName(child.type?.name || "")
		return (
			["md-app-drawer", "md-app-drawer-right", "md-app-drawer-left"].indexOf(
				tag
			) > -1
		)
	})
	return drawerVnodes.length ? drawerVnodes : []
}

function hasInternalDrawer(attrs) {
	const mdPermanent = attrs && attrs["md-permanent"]

	return mdPermanent && (mdPermanent === "clipped" || mdPermanent === "card")
}

export default {
	name: "MdApp",
	functional: true,
	render(props, { children, data }) {
		let appComponent = MdAppSideDrawer

		// Convert children to array if it's not already
		const childrenArray = children
			? Array.isArray(children)
				? children
				: [children]
			: []

		const slots = buildSlots(
			childrenArray,
			null, // context
			null, // functionalContext
			{ options: { provide: null } }, // componentOptions
			h // createElement
		)
		const drawers = getDrawers(slots)

		drawers.forEach((drawer) => {
			if (drawer && hasInternalDrawer(drawer.data.attrs)) {
				appComponent = MdAppInternalDrawer
			}
		})

		// Fix for Vue 3: Handle class merging properly
		const staticClass = {}
		if (data && data.staticClass) {
			data.staticClass.split(/\s+/).forEach((name) => {
				if (name.length === 0) return
				staticClass[name] = true
			})
		}

		// Merge classes properly for Vue 3
		const mergedClass = {
			...staticClass,
			...(data && data.class ? data.class : {}),
		}

		// Handle style merging for Vue 3
		const mergedStyle = {
			...(data && data.staticStyle ? data.staticStyle : {}),
			...(data && data.style ? data.style : {}),
		}

		return h(
			appComponent,
			{
				...props,
				class: mergedClass,
				style: mergedStyle,
			},
			slots
		)
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";
@import "@/components/MdLayout/mixins";

.md-app {
	display: flex;
	overflow: hidden;
	position: relative;

	&.md-fixed {
		.md-app-scroller {
			overflow: auto;
		}
	}

	&.md-reveal,
	&.md-fixed-last,
	&.md-overlap,
	&.md-flexible {
		transform: translate3d(0, 0, 0);

		.md-app-toolbar {
			position: absolute;
			top: 0;
		}
	}

	&.md-flexible,
	&.md-overlap {
		.md-app-toolbar {
			min-height: 0;
		}
	}

	&.md-flexible {
		.md-toolbar-row {
			&:first-child {
				z-index: 2;
			}

			&:last-child {
				position: fixed;
				bottom: 0;
				z-index: 1;
			}
		}

		.md-display-1 {
			position: fixed;
		}
	}

	&.md-overlap {
		.md-app-toolbar {
			z-index: 1;
		}

		.md-app-content {
			margin: -64px 24px 24px;
			position: relative;
			z-index: 2;

			@include md-layout-small {
				margin: -64px 16px 16px;
			}

			@include md-layout-xsmall {
				margin: -64px 8px 8px;
			}
		}
	}
}

.md-app-drawer {
	&.md-permanent-card + .md-app-scroller .md-content {
		@include md-layout-small-and-up {
			padding-left: 0;
			padding-right: 0;
			border-left: none;
			border-right: none;
		}
	}
}

.md-app-content {
	padding: 16px;

	@include md-layout-small-and-up {
		border-left: 1px solid transparent;
		border-right: 1px solid transparent;
	}

	> p {
		&:first-child {
			margin-top: 0;
		}

		&:last-child {
			margin-bottom: 0;
		}
	}
}

.md-app-container {
	flex: 1;
	display: flex;
	overflow: auto;
	transform: translate3D(0, 0, 0);
	transition: padding-left 0.4s $md-transition-default-timing,
		padding-right 0.4s $md-transition-default-timing;
	will-change: padding-left, padding-right;
}

.md-app-scroller {
	flex: 1;
}
</style>
