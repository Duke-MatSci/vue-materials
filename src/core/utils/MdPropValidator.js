export default (name, options) => {
	return {
		validator: (value) => {
			if (options.includes(value)) {
				return true
			}

			console.warn(
				`The ${name} prop is invalid. Given value: ${value}. Available options: ${options.join(
					", "
				)}.`
			)

			return false
		},
	}
}
