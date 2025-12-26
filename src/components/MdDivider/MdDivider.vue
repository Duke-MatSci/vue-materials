<template>
	<li class="md-divider" :class="[$mdActiveTheme]" v-if="insideList"></li>
	<hr class="md-divider" :class="[$mdActiveTheme]" v-else />
</template>

<script>
import { computed, getCurrentInstance } from "vue"
import MdComponent from "@/core/MdComponent"

export default MdComponent({
	name: "MdDivider",
	setup() {
		const instance = getCurrentInstance()

		const insideList = computed(() => {
			// Check if parent is md-list component
			const parent = instance?.parent
			return parent?.$options?.name === "MdList"
		})

		return {
			insideList,
		}
	},
})
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-divider {
	height: 1px;
	margin: 0;
	padding: 0;
	display: block;
	border: 0;
	transition: margin-left 0.3s $md-transition-default-timing;
	will-change: margin-left;

	&.md-inset {
		margin-left: 72px;
	}
}
</style>
