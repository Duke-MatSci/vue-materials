<template>
	<md-ripple
		:md-disabled="!mdRipple || disabled"
		:md-event-trigger="false"
		:md-active="mdRippleActive"
		@update:md-active="(active) => $emit('update:md-ripple-active', active)"
	>
		<div class="md-button-content">
			<slot />
		</div>
	</md-ripple>
</template>

<script>
import MdRipple from "../MdRipple/MdRipple.vue"

export default {
	name: "MdButtonContent",
	components: {
		MdRipple,
	},
	props: {
		mdRipple: Boolean,
		mdRippleActive: null,
		disabled: Boolean,
	},
	emits: ["update:md-ripple-active"],
}
</script>

<style lang="scss">
.md-button-content {
	position: relative;
	z-index: 2;
}
</style>
