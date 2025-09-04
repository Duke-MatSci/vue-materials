<template>
	<div>
    <md-button
      type="button"
      class="md-primary md-raised"
      @click="openTimed"
    >Open Snackbar</md-button>

    <md-button
      type="button"
      class="md-primary md-raised"
      style="margin-left: 8px"
      @click="openPersistent"
    >Open Persistent</md-button>
		<md-snackbar
			v-model:mdActive="showSnackbar"
        :md-position="position"
        :md-duration="duration"
        :md-persistent="persistent"
		>
			<span>Connection timeout. Showing limited messages!</span>
			<md-button class="md-primary" @click="showSnackbar = false">
				Retry
			</md-button>
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
    persistent: false,
  }),
  methods: {
    openTimed() {
      this.duration = 4000
      this.persistent = false
      this.showSnackbar = true
    },
    openPersistent() {
      this.duration = Infinity
      this.persistent = true
      this.showSnackbar = true
    },
  },
}
</script>
