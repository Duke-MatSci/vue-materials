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
				if (!persistent && typeof context.__startLeave === "function") {
					context.__startLeave()
				}
				destroySnackbar()
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
		return destroySnackbar().then(() =>
			createPromise(duration, persistent, context)
		)
	}
	return createPromise(duration, persistent, context)
}
