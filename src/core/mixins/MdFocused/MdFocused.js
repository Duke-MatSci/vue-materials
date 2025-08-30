import { reactive, ref, computed, watch, onMounted } from "vue"
import MdReactive from "../../utils/MdReactive"

let hasEvents = false
let eventTarget = null
let supportsPassiveEvent = false
let MdFocused = reactive({
	currentElement: null,
})

function checkPassiveEventSupport() {
	try {
		var opts = Object.defineProperty({}, "passive", {
			get() {
				supportsPassiveEvent = { passive: true }
			},
		})
		window.addEventListener("ghost", null, opts)
	} catch (e) {}
}

function setKeyboardInteraction({ keyCode, target }) {
	MdFocused.currentElement = target
}

function setMouseAndTouchInteraction(event) {
	MdFocused.currentElement = null
}

function createKeyboardEvents() {
	eventTarget.addEventListener("keyup", setKeyboardInteraction)
}

function createPointerEvents() {
	eventTarget.addEventListener("pointerup", setMouseAndTouchInteraction)
}

function createMSPointerEvents() {
	eventTarget.addEventListener("MSPointerUp", setMouseAndTouchInteraction)
}

function createMouseAndTouchEvents() {
	eventTarget.addEventListener("mouseup", setMouseAndTouchInteraction)

	if ("ontouchend" in window) {
		eventTarget.addEventListener(
			"touchend",
			setMouseAndTouchInteraction,
			supportsPassiveEvent
		)
	}
}

function bindEvents() {
	if (window.PointerEvent) {
		createPointerEvents()
	} else if (window.MSPointerEvent) {
		createMSPointerEvents()
	} else {
		createMouseAndTouchEvents()
	}

	createKeyboardEvents()
}

function createEvents() {
	if (!hasEvents) {
		eventTarget = document.body
		checkPassiveEventSupport()
		bindEvents()
		hasEvents = true
	}
}

export default {
	setup() {
		const mdHasFocus = ref(false)
		const element = ref(null)

		const focusedElement = computed(() => {
			return MdFocused.currentElement
		})

		watch(focusedElement, (el) => {
			mdHasFocus.value = el === element.value
		})

		onMounted(() => {
			createEvents()
		})

		return {
			mdHasFocus,
			element,
			focusedElement,
		}
	},
}
