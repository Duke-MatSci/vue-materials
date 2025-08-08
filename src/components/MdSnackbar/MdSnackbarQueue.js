let currentSnackbar = null
let timeout = null

function createPromise(duration, persistent, context) {
	return new Promise((resolve) => {
		currentSnackbar = {
			destroy: () => {
				currentSnackbar = null
				resolve()
			},
		}

		if (duration !== Infinity) {
			timeout = window.setTimeout(() => {
				destroySnackbar()
				if (!persistent) {
					// Vue 3 adaptation: component will auto-destroy when mdActive becomes false
					// The component lifecycle is handled by the parent's reactivity system
				}
			}, duration)
		}
	})
}

export const destroySnackbar = () => {
	return new Promise((resolve) => {
		if (currentSnackbar) {
			window.clearTimeout(timeout)
			currentSnackbar.destroy()
			window.setTimeout(resolve, 400)
		} else {
			resolve()
		}
	})
}

export const createSnackbar = (duration, persistent, context) => {
	if (currentSnackbar) {
		return destroySnackbar().then(() => {
			return createPromise(duration, persistent, context)
		})
	}

	return createPromise(duration, persistent, context)
}
