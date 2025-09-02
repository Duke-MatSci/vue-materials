<template>
	<div>
		<md-button
			type="button"
			class="md-primary md-raised"
			@click="showSnackbar = true"
			>Open Snackbar</md-button
		>
		<md-snackbar
			v-model:mdActive="showSnackbar"
			:md-position="position"
			:md-duration="isInfinity ? Infinity : duration"
			md-persistent
		>
			<span>Connection timeout. Showing limited messages!</span>
			<md-button class="md-primary" @click="showSnackbar = false"
				>Retry</md-button
			>
		</md-snackbar>
	</div>
</template>

<script>
export default {
	name: "SnackbarExample",
	data: () => ({
		showSnackbar: false,
		position: "center",
		duration: 4000,
		isInfinity: false,
	}),
}
</script>
