import mountTemplate from "test/utils/mountTemplate"
import MdTable from "./MdTable.vue"

test("should render the table", async () => {
	const template = "<md-table>Table Content</md-table>"
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.text()).toContain("Table Content")
})

test("should render with card layout", async () => {
	const template = "<md-table md-card>Card Table</md-table>"
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	// Should render as md-card when md-card prop is true
	expect(wrapper.find(".md-card").length).toBe(1)
})

test("should render with fixed header", async () => {
	const template = "<md-table md-fixed-header>Fixed Header Table</md-table>"
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.find(".md-table-fixed-header").length).toBe(1)
})

test("should render with custom height", async () => {
	const template = '<md-table md-height="500">Custom Height Table</md-table>'
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	const content = wrapper.find(".md-table-content")
	expect(content.attributes("style")).toContain("height: 500px")
})

test("should render with toolbar slot", async () => {
	const template = `
    <md-table>
      <template #md-table-toolbar>
        <div class="custom-toolbar">Toolbar Content</div>
      </template>
      Table Content
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.find(".custom-toolbar").length).toBe(1)
	expect(wrapper.find(".custom-toolbar").text()).toBe("Toolbar Content")
})

test("should render with alternate header slot", async () => {
	const template = `
    <md-table :value="[{id: 1, name: 'Test'}]">
      <template #md-table-alternate-header="{ count }">
        <div class="alternate-header">Selected: {{ count }}</div>
      </template>
      <template #md-table-row="{ item }">
        <md-table-row>
          <md-table-cell>{{ item.name }}</md-table-cell>
        </md-table-row>
      </template>
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.find(".md-table-alternate-header").length).toBe(1)
})

test("should render with empty state slot", async () => {
	const template = `
    <md-table :value="[]">
      <template #md-table-empty-state>
        <div class="empty-state">No data available</div>
      </template>
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.find(".empty-state").length).toBe(1)
	expect(wrapper.find(".empty-state").text()).toBe("No data available")
})

test("should render with pagination slot", async () => {
	const template = `
    <md-table>
      <template #md-table-pagination>
        <div class="pagination">Pagination Content</div>
      </template>
      Table Content
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.find(".pagination").length).toBe(1)
	expect(wrapper.find(".pagination").text()).toBe("Pagination Content")
})

test("should handle sorting functionality", async () => {
	const data = [
		{ id: 1, name: "Charlie" },
		{ id: 2, name: "Alice" },
		{ id: 3, name: "Bob" },
	]

	const template = `
    <md-table :value="data" md-sort="name" md-sort-order="asc">
      <template #md-table-row="{ item }">
        <md-table-row>
          <md-table-cell>{{ item.name }}</md-table-cell>
        </md-table-row>
      </template>
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template, {
		data: { data },
	})

	expect(wrapper.hasClass("md-table")).toBe(true)
	// The table should be sorted by name in ascending order
	expect(wrapper.vm.MdTable.sort).toBe("name")
	expect(wrapper.vm.MdTable.sortOrder).toBe("asc")
})

test("should handle selection functionality", async () => {
	const data = [
		{ id: 1, name: "Item 1" },
		{ id: 2, name: "Item 2" },
	]

	const template = `
    <md-table :value="data" :md-selected-value="selectedItems">
      <template #md-table-row="{ item }">
        <md-table-row md-selectable="multiple" :md-item="item">
          <md-table-cell>{{ item.name }}</md-table-cell>
        </md-table-row>
      </template>
    </md-table>
  `
	const wrapper = await mountTemplate(MdTable, template, {
		data: {
			data,
			selectedItems: [],
		},
	})

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.vm.MdTable.selectedItems).toEqual([])
})

test("should render theme class", async () => {
	const template = '<md-table md-theme="alt">Themed Table</md-table>'
	const wrapper = await mountTemplate(MdTable, template)

	expect(wrapper.hasClass("md-table")).toBe(true)
	expect(wrapper.hasClass("md-theme-alt")).toBe(true)
})
