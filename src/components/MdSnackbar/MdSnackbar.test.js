import mountTemplate from "test/utils/mountTemplate"
import MdSnackbar from "./MdSnackbar.vue"

test("should render the snackbar", async () => {
	const template = "<md-snackbar>Snackbar Content</md-snackbar>"
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.hasClass("md-snackbar")).toBe(true)
	expect(wrapper.text()).toContain("Snackbar Content")
})

test("should render with center position by default", async () => {
	const template = "<md-snackbar>Default Position</md-snackbar>"
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.hasClass("md-position-center")).toBe(true)
})

test("should render with left position", async () => {
	const template = '<md-snackbar md-position="left">Left Position</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.hasClass("md-position-left")).toBe(true)
})

test("should render as persistent", async () => {
	const template =
		"<md-snackbar md-persistent>Persistent Snackbar</md-snackbar>"
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.vm.mdPersistent).toBe(true)
})

test("should handle custom duration", async () => {
	const template =
		'<md-snackbar :md-duration="2000">Custom Duration</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.vm.mdDuration).toBe(2000)
})

test("should handle infinite duration", async () => {
	const template =
		'<md-snackbar :md-duration="Infinity">Infinite Duration</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template, {
		data: {
			Infinity: Infinity,
		},
	})

	expect(wrapper.vm.mdDuration).toBe(Infinity)
})

test("should emit events when activated", async () => {
	const template = '<md-snackbar :md-active="isActive">Event Test</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template, {
		data: {
			isActive: false,
		},
	})

	// Activate the snackbar
	await wrapper.setData({ isActive: true })

	// Wait for next tick
	await wrapper.vm.$nextTick()

	// Check if update:mdActive event was emitted
	expect(wrapper.emitted("update:mdActive")).toBeTruthy()
})

test("should emit md-opened event", async () => {
	const template =
		'<md-snackbar :md-active="isActive">Opened Test</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template, {
		data: {
			isActive: false,
		},
	})

	// Activate the snackbar
	await wrapper.setData({ isActive: true })

	// Wait for next tick
	await wrapper.vm.$nextTick()

	// Check if md-opened event was emitted
	expect(wrapper.emitted("md-opened")).toBeTruthy()
})

test("should emit md-closed event", async () => {
	const template =
		'<md-snackbar :md-active="isActive">Closed Test</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template, {
		data: {
			isActive: true,
		},
	})

	// Deactivate the snackbar
	await wrapper.setData({ isActive: false })

	// Wait for next tick
	await wrapper.vm.$nextTick()

	// Check if md-closed event was emitted
	expect(wrapper.emitted("md-closed")).toBeTruthy()
})

test("should render with theme class", async () => {
	const template = '<md-snackbar md-theme="alt">Themed Snackbar</md-snackbar>'
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.hasClass("md-theme-alt")).toBe(true)
})

test("should render content inside portal", async () => {
	const template = `
    <md-snackbar md-active>
      <span class="custom-content">Portal Content</span>
    </md-snackbar>
  `
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.find(".custom-content").exists()).toBe(true)
	expect(wrapper.find(".custom-content").text()).toBe("Portal Content")
})

test("should handle button actions", async () => {
	const template = `
    <md-snackbar md-active>
      <span>Message with action</span>
      <md-button class="md-primary">ACTION</md-button>
    </md-snackbar>
  `
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.find(".md-button").exists()).toBe(true)
	expect(wrapper.find(".md-button").text()).toBe("ACTION")
})

test("should render in keep-alive when persistent and finite duration", async () => {
	const template = `
    <md-snackbar md-persistent :md-duration="4000" md-active>
      Keep-alive Content
    </md-snackbar>
  `
	const wrapper = await mountTemplate(MdSnackbar, template)

	expect(wrapper.find("keep-alive").exists()).toBe(true)
})

test("should not render in keep-alive when infinite duration", async () => {
	const template = `
    <md-snackbar md-persistent :md-duration="Infinity" md-active>
      No Keep-alive Content
    </md-snackbar>
  `
	const wrapper = await mountTemplate(MdSnackbar, template, {
		data: {
			Infinity: Infinity,
		},
	})

	expect(wrapper.find("keep-alive").exists()).toBe(false)
})
