<template>
	<div class="md-wave" :style="waveStyle" />
</template>

<script>
export default {
	name: "MdWave",
	props: {
		waveStyle: {
			type: Object,
			default: () => ({}),
		},
	},
}
</script>

<style lang="scss">
.md-wave {
	position: absolute;
	border-radius: 50%;
	background-color: currentColor;
	opacity: 0.3;
	transform: scale(0);
	animation: md-wave 0.6s ease-out;
	pointer-events: none;
}

@keyframes md-wave {
	0% {
		transform: scale(0);
		opacity: 0.3;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}
</style>
