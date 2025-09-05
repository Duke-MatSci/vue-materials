<template>
	<div class="md-card-header-text">
		<slot />
	</div>
</template>

<script>
import { h, ref, onMounted, onBeforeUnmount } from "vue"

export default {
	name: "MdCardHeaderText",
	setup(props, { slots }) {
		const parentClasses = ref(null)

		onMounted(() => {
			// In Vue 3, we need to access the parent differently
			// This is a simplified approach - in a real scenario, you might use provide/inject
			// or access the parent through getCurrentInstance()
			const parentEl = document.querySelector(".md-card-header")
			if (parentEl && parentEl.classList.contains("md-card-header")) {
				parentEl.classList.add("md-card-header-flex")
				parentClasses.value = parentEl.classList
			}
		})

		onBeforeUnmount(() => {
			if (parentClasses.value) {
				parentClasses.value.remove("md-card-header-flex")
			}
		})

		return () => {
			return h(
				"div",
				{ class: "md-card-header-text" },
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-header-text {
	// Styles are handled in MdCardHeader.vue
}
</style>


