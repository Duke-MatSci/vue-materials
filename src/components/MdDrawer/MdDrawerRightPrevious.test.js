import mountTemplate from "test/utils/mountTemplate"
import MdDrawerRightPrevious from "./MdDrawerRightPrevious.vue"

test("should render the drawer right previous", async () => {
	const template = "<md-drawer-right-previous></md-drawer-right-previous>"
	const wrapper = await mountTemplate(MdDrawerRightPrevious, template)

	expect(wrapper.hasClass("md-drawer")).toBe(true)
	expect(wrapper.hasClass("md-right-previous")).toBe(true)
	expect(wrapper.isVisible()).toBe(false)
})

test("should render with permanent mode", async () => {
	const template =
		'<md-drawer-right-previous md-permanent="full"></md-drawer-right-previous>'
	const wrapper = await mountTemplate(MdDrawerRightPrevious, template)

	expect(wrapper.hasClass("md-permanent")).toBe(true)
	expect(wrapper.hasClass("md-permanent-full")).toBe(true)
	expect(wrapper.hasClass("md-temporary")).toBe(false)
})

test("should render with persistent mode", async () => {
	const template =
		'<md-drawer-right-previous md-persistent="mini"></md-drawer-right-previous>'
	const wrapper = await mountTemplate(MdDrawerRightPrevious, template)

	expect(wrapper.hasClass("md-persistent")).toBe(true)
	expect(wrapper.hasClass("md-persistent-mini")).toBe(true)
	expect(wrapper.hasClass("md-temporary")).toBe(false)
})

test("should render with active state", async () => {
	const template =
		'<md-drawer-right-previous :md-active="true"></md-drawer-right-previous>'
	const wrapper = await mountTemplate(MdDrawerRightPrevious, template)

	expect(wrapper.hasClass("md-active")).toBe(true)
})

test("should render with fixed positioning", async () => {
	const template =
		"<md-drawer-right-previous md-fixed></md-drawer-right-previous>"
	const wrapper = await mountTemplate(MdDrawerRightPrevious, template)

	expect(wrapper.hasClass("md-fixed")).toBe(true)
})
