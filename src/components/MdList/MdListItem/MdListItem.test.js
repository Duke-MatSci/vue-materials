import { mount } from "@vue/test-utils"
import MdListItem from "./MdListItem.vue"

describe("MdListItem", () => {
	test("should render the list item", () => {
		const wrapper = mount(MdListItem, {
			slots: {
				default: "Lorem ipsum",
			},
		})

		expect(wrapper.classes()).toContain("md-list-item")
		expect(wrapper.text().trim()).toBe("Lorem ipsum")
	})
})
