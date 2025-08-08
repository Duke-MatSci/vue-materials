import Vue from "vue"
import mountTemplate from "test/utils/mountTemplate"
import MdApp from "./MdApp.vue"

test("should render the theme class", async () => {
	const template = '<md-app md-theme="alt">App Content</md-app>'
	const wrapper = await mountTemplate(MdApp, template)

	expect(wrapper.hasClass("md-app")).toBe(true)
	expect(wrapper.hasClass("md-theme-alt")).toBe(true)
})

test("should render with toolbar, drawer, and content", async () => {
	const template = `
    <md-app>
      <md-app-toolbar>
        <h1 class="md-title">Title</h1>
      </md-app-toolbar>
      <md-app-drawer>
        <md-list>
          <md-list-item>Item 1</md-list-item>
        </md-list>
      </md-app-drawer>
      <md-app-content>
        <p>Content</p>
      </md-app-content>
    </md-app>
  `
	const wrapper = await mountTemplate(MdApp, template)

	expect(wrapper.hasClass("md-app")).toBe(true)
	expect(wrapper.find(".md-app-toolbar").length).toBe(1)
	expect(wrapper.find(".md-app-drawer").length).toBe(1)
	expect(wrapper.find(".md-app-content").length).toBe(1)
})
