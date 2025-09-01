<template>
	<div class="md-card-expand-content" :style="contentStyles">
		<slot />
	</div>
</template>

<script>
import {
	h,
	inject,
	ref,
	computed,
	watch,
	onMounted,
	onBeforeUnmount,
	nextTick,
} from "vue"

export default {
	name: "MdCardExpandContent",
	setup(props, { slots }) {
		// Inject the MdCard context
		const MdCard = inject("MdCard")

		const marginTop = ref(0)
		const resizeObserver = ref(null)
		const transitionEnabled = ref(true)

		const expand = computed(() => {
			return MdCard.expand
		})

		const contentStyles = computed(() => {
			return {
				"margin-top": `-${marginTop.value}px`,
				opacity: marginTop.value === 0 ? 1 : 0,
				"transition-property": transitionEnabled.value ? null : "none",
			}
		})

		const calculateMarginTop = () => {
			if (!expand.value) {
				// In Vue 3, we need to access the DOM element differently
				// This is a simplified approach
				const el = document.querySelector(".md-card-expand-content")
				if (el && el.children[0]) {
					marginTop.value = el.children[0].offsetHeight
				}
			} else {
				marginTop.value = 0
			}
		}

		const calculateMarginTopImmediately = () => {
			if (expand.value) {
				return
			}

			transitionEnabled.value = false
			nextTick(() => {
				calculateMarginTop()
				nextTick(() => {
					// Force reflow
					const el = document.querySelector(".md-card-expand-content")
					if (el) {
						el.offsetHeight
					}
					transitionEnabled.value = true
				})
			})
		}

		// Watch for expand changes
		watch(expand, () => {
			calculateMarginTop()
		})

		onMounted(() => {
			calculateMarginTopImmediately()

			// Simplified resize observer - in a real implementation, you'd use ResizeObserver
			// For now, we'll use a simple approach
			const el = document.querySelector(".md-card-expand-content")
			if (el) {
				// Create a simple observer
				const observer = new MutationObserver(calculateMarginTopImmediately)
				observer.observe(el, {
					childList: true,
					characterData: true,
					subtree: true,
				})
				resizeObserver.value = observer
			}
		})

		onBeforeUnmount(() => {
			if (resizeObserver.value) {
				resizeObserver.value.disconnect()
			}
		})

		return () => {
			return h(
				"div",
				{
					class: "md-card-expand-content",
					style: contentStyles.value,
				},
				slots.default ? slots.default() : []
			)
		}
	},
}
</script>

<style lang="scss">
@import "@/components/MdAnimation/variables";

.md-card-expand-content {
	overflow: hidden;
	transform: translate3D(0, 0, 0);
	transition: 0.4s $md-transition-default-timing;
	transition-property: opacity, margin-top;
	will-change: opacity, margin-top;
}
</style>


