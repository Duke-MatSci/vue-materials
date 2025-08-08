<template>
	<transition name="md-snackbar" appear>
		<div class="md-snackbar" :class="mdClasses">
			<div class="md-snackbar-content">
				<slot />
			</div>
		</div>
	</transition>
</template>

<script>
import { h } from "vue"

export default {
	name: "MdSnackbarContent",
	props: {
		mdClasses: Array,
	},
}
</script>
