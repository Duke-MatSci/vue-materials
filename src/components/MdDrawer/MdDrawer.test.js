import mountTemplate from "test/utils/mountTemplate"
import MdDrawer from "./MdDrawer.vue"

test("should render the drawer", async () => {
	const template = "<md-drawer>Lorem ipsum</md-drawer>"
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-drawer")).toBe(true)
	expect(wrapper.text()).toBe("Lorem ipsum ")
})

test("should render the theme class", async () => {
	const template = '<md-drawer md-theme="alt">Lorem ipsum</md-drawer>'
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-theme-alt")).toBe(true)
})

test("should render with right positioning", async () => {
	const template = "<md-drawer md-right>Right drawer</md-drawer>"
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-right")).toBe(true)
	expect(wrapper.hasClass("md-left")).toBe(false)
})

test("should render with permanent mode", async () => {
	const template = '<md-drawer md-permanent="full">Permanent drawer</md-drawer>'
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-permanent")).toBe(true)
	expect(wrapper.hasClass("md-permanent-full")).toBe(true)
	expect(wrapper.hasClass("md-temporary")).toBe(false)
})

test("should render with persistent mode", async () => {
	const template =
		'<md-drawer md-persistent="mini">Persistent drawer</md-drawer>'
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-persistent")).toBe(true)
	expect(wrapper.hasClass("md-persistent-mini")).toBe(true)
	expect(wrapper.hasClass("md-temporary")).toBe(false)
})

test("should render with active state", async () => {
	const template = '<md-drawer :md-active="true">Active drawer</md-drawer>'
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-active")).toBe(true)
})

test("should render with fixed positioning", async () => {
	const template = "<md-drawer md-fixed>Fixed drawer</md-drawer>"
	const wrapper = await mountTemplate(MdDrawer, template)

	expect(wrapper.hasClass("md-fixed")).toBe(true)
})
