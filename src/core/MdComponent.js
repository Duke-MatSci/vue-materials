import MdTheme from "@/core/MdTheme"
import deepmerge from "deepmerge"

export default function (newComponent) {
	const defaults = {
		props: {
			mdTheme: null,
		},
		computed: {
			$mdActiveTheme() {
				const { enabled, getThemeName, getAncestorTheme } = MdTheme

				if (enabled && this.mdTheme !== false) {
					// In Vue 3, we need to ensure proper context access
					// The component instance should be available through 'this'
					return getThemeName(this.mdTheme || getAncestorTheme(this))
				}

				return null
			},
		},
	}

	// Merge the defaults with the new component
	// This preserves the exact same structure and behavior
	// Return the merged component definition for Vue 3 Options API
	return deepmerge(defaults, newComponent)
}
