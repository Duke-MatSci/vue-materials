<template>
	<component
		:is="appComponent"
		v-bind="$attrs"
		:class="mergedClass"
		:style="mergedStyle"
	>
		<template v-for="(_, name) in $slots" #[name]="slotData">
			<slot :name="name" v-bind="slotData" />
		</template>
	</component>
</template>

<script>
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

function hasInternalDrawer(attrs) {
	const mdPermanent = attrs && attrs["md-permanent"]
	return mdPermanent && (mdPermanent === "clipped" || mdPermanent === "card")
}

export default {
	name: "MdApp",
	components: {
		MdAppSideDrawer,
		MdAppInternalDrawer,
		MdDrawerRightPrevious,
	},
	computed: {
		appComponent() {
			// Check if any drawer has internal drawer attributes
			const slots = this.$slots
			let hasInternal = false

			// Check default slot for drawers
			if (slots.default) {
				const children = Array.isArray(slots.default())
					? slots.default()
					: [slots.default()]
				children.forEach((child) => {
					if (child && child.data && hasInternalDrawer(child.data.attrs)) {
						hasInternal = true
					}
				})
			}

			return hasInternal ? MdAppInternalDrawer : MdAppSideDrawer
		},
		mergedClass() {
			const staticClass = {}
			if (this.$attrs.class) {
				if (typeof this.$attrs.class === "string") {
					this.$attrs.class.split(/\s+/).forEach((name) => {
						if (name.length === 0) return
						staticClass[name] = true
					})
				} else {
					return this.$attrs.class
				}
			}
			return staticClass
		},
		mergedStyle() {
			return this.$attrs.style || {}
		},
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
