import { mount } from "@vue/test-utils"
import MdList from "./MdList.vue"

describe("MdList", () => {
	test("should render the list", () => {
		const wrapper = mount(MdList, {
			slots: {
				default: "Lorem ipsum",
			},
		})

		expect(wrapper.classes()).toContain("md-list")
		expect(wrapper.text()).toBe("Lorem ipsum")
	})

	test("should render the theme class", () => {
		const wrapper = mount(MdList, {
			props: {
				mdTheme: "alt",
			},
			slots: {
				default: "Lorem ipsum",
			},
		})

		expect(wrapper.classes()).toContain("md-theme-alt")
	})
})
