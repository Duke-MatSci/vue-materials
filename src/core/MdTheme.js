import { reactive, computed, watch, onMounted } from "vue"

let msColor = null
let themeColor = null
let maskIcon = null

const themeData = reactive({
	prefix: "md-theme-",
	theme: "default",
	enabled: true,
	metaColors: false,
})

const themeTarget = computed(() => {
	if (typeof document !== "undefined") {
		return document.documentElement
	}
	return false
})

const fullThemeName = computed(() => {
	return getThemeName()
})

function getThemeName(theme) {
	const themeName = theme || themeData.theme
	return themeData.prefix + themeName
}

function getAncestorTheme(component) {
	if (component) {
		const currentTheme = component.mdTheme
		const getParentThemeName = (parent) => {
			if (parent) {
				const { mdTheme } = parent

				// In Vue 3, we need to access the parent differently
				// For now, we'll use the component's parent property if available
				const parentComponent = parent.$parent || parent.parent

				if (mdTheme && mdTheme !== currentTheme) {
					return mdTheme
				}

				return getParentThemeName(parentComponent)
			}

			return themeData.theme
		}

		// In Vue 3, we need to handle parent access differently
		// For now, we'll use the component's parent property if available
		const parentComponent = component.$parent || component.parent
		return getParentThemeName(parentComponent)
	}

	return null
}

function setMicrosoftColors(primaryColor) {
	if (msColor) {
		msColor.setAttribute("content", primaryColor)
	}
}

function setThemeColors(primaryColor) {
	if (themeColor) {
		themeColor.setAttribute("content", primaryColor)
	}
}

function setMaskColors(primaryColor) {
	if (maskIcon) {
		maskIcon.setAttribute("color", primaryColor)
	}
}

function setHtmlMetaColors(themeName) {
	let primaryColor = "#fff"

	if (themeName) {
		const computedStyle = window.getComputedStyle(document.documentElement)
		primaryColor = computedStyle.getPropertyValue(`--${themeName}-primary`)
	}

	if (primaryColor) {
		setMicrosoftColors(primaryColor)
		setThemeColors(primaryColor)
		setMaskColors(primaryColor)
	}
}

// Watch for changes
watch(
	() => themeData.enabled,
	(enabled) => {
		const target = themeTarget.value
		if (target) {
			if (enabled) {
				target.classList.add(fullThemeName.value)
				themeData.metaColors && setHtmlMetaColors(fullThemeName.value)
			} else {
				target.classList.remove(fullThemeName.value)
				themeData.metaColors && setHtmlMetaColors()
			}
		}
	},
	{ immediate: true }
)

watch(
	() => themeData.theme,
	(newTheme, oldTheme) => {
		const target = themeTarget.value
		newTheme = getThemeName(newTheme)
		target.classList.remove(getThemeName(oldTheme))
		target.classList.add(newTheme)

		if (themeData.metaColors) {
			setHtmlMetaColors(newTheme)
		}
	}
)

watch(
	() => themeData.metaColors,
	(meta) => {
		if (meta) {
			setHtmlMetaColors(fullThemeName.value)
		} else {
			setHtmlMetaColors()
		}
	}
)

// Initialize on mount
if (typeof document !== "undefined") {
	onMounted(() => {
		msColor = document.querySelector('[name="msapplication-TileColor"]')
		themeColor = document.querySelector('[name="theme-color"]')
		maskIcon = document.querySelector('[rel="mask-icon"]')

		if (themeData.enabled && themeData.metaColors) {
			window.addEventListener("load", () => {
				setHtmlMetaColors(fullThemeName.value)
			})
		}
	})
}

export default {
	...themeData,
	themeTarget,
	fullThemeName,
	getThemeName,
	getAncestorTheme,
	setHtmlMetaColors,
}
