<template>
	<div>
		<md-app>
			<md-app-toolbar class="md-primary">
				<h2 class="md-title">MdTable Examples</h2>
			</md-app-toolbar>

			<md-app-content>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-size-100">
						<h3>MdTable Component Examples</h3>

						<!-- Basic Table -->
						<md-card>
							<md-card-header>
								<div class="md-title">Basic Table</div>
								<div class="md-subhead">Simple table with data</div>
							</md-card-header>

							<md-card-content>
								<md-table :value="basicData">
									<template #md-table-row="{ item }">
										<md-table-row>
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
										</md-table-row>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Table with Toolbar -->
						<md-card>
							<md-card-header>
								<div class="md-title">Table with Toolbar</div>
								<div class="md-subhead">Table with custom toolbar</div>
							</md-card-header>

							<md-card-content>
								<md-table :value="toolbarData">
									<template #md-table-toolbar>
										<md-toolbar class="md-transparent" md-elevation="0">
											<span>Users Table</span>
											<div class="md-toolbar-section-end">
												<md-button class="md-icon-button">
													<md-icon>add</md-icon>
												</md-button>
												<md-button class="md-icon-button">
													<md-icon>refresh</md-icon>
												</md-button>
											</div>
										</md-toolbar>
									</template>

									<template #md-table-row="{ item }">
										<md-table-row>
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
										</md-table-row>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Table with Selection -->
						<md-card>
							<md-card-header>
								<div class="md-title">Table with Selection</div>
								<div class="md-subhead">Multiple row selection</div>
							</md-card-header>

							<md-card-content>
								<md-table
									:value="selectionData"
									:md-selected-value="selectedItems"
									@selection="onSelection"
								>
									<template #md-table-alternate-header="{ count }">
										<md-toolbar class="md-transparent" md-elevation="0">
											<span>{{ count }} items selected</span>
											<div class="md-toolbar-section-end">
												<md-button
													class="md-icon-button"
													@click="clearSelection"
												>
													<md-icon>clear</md-icon>
												</md-button>
											</div>
										</md-toolbar>
									</template>

									<template #md-table-row="{ item }">
										<md-table-row md-selectable="multiple" :md-item="item">
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
										</md-table-row>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Table with Fixed Header -->
						<md-card>
							<md-card-header>
								<div class="md-title">Table with Fixed Header</div>
								<div class="md-subhead">
									Fixed header with scrollable content
								</div>
							</md-card-header>

							<md-card-content>
								<md-table
									:value="fixedHeaderData"
									md-fixed-header
									md-height="300"
								>
									<template #md-table-row="{ item }">
										<md-table-row>
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
											<md-table-cell>{{ item.department }}</md-table-cell>
											<md-table-cell>{{ item.salary }}</md-table-cell>
										</md-table-row>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Card Layout Table -->
						<md-card>
							<md-card-header>
								<div class="md-title">Card Layout Table</div>
								<div class="md-subhead">Table rendered as a card</div>
							</md-card-header>

							<md-card-content>
								<md-table :value="cardData" md-card>
									<template #md-table-row="{ item }">
										<md-table-row>
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
										</md-table-row>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Table with Empty State -->
						<md-card>
							<md-card-header>
								<div class="md-title">Table with Empty State</div>
								<div class="md-subhead">Table with no data</div>
							</md-card-header>

							<md-card-content>
								<md-table :value="[]">
									<template #md-table-empty-state>
										<md-empty-state>
											<md-icon slot="icon">inbox</md-icon>
											<span slot="label">No data available</span>
											<span slot="description"
												>There are no items to display at the moment.</span
											>
											<md-button slot="action" class="md-primary md-raised">
												Add Item
											</md-button>
										</md-empty-state>
									</template>
								</md-table>
							</md-card-content>
						</md-card>

						<!-- Table with Pagination -->
						<md-card>
							<md-card-header>
								<div class="md-title">Table with Pagination</div>
								<div class="md-subhead">Table with pagination controls</div>
							</md-card-header>

							<md-card-content>
								<md-table :value="paginatedData">
									<template #md-table-row="{ item }">
										<md-table-row>
											<md-table-cell>{{ item.id }}</md-table-cell>
											<md-table-cell>{{ item.name }}</md-table-cell>
											<md-table-cell>{{ item.email }}</md-table-cell>
											<md-table-cell>{{ item.role }}</md-table-cell>
										</md-table-row>
									</template>

									<template #md-table-pagination>
										<md-table-pagination
											:md-total="totalItems"
											:md-page="currentPage"
											:md-limit="itemsPerPage"
											@md-paginate="onPaginate"
										/>
									</template>
								</md-table>
							</md-card-content>
						</md-card>
					</div>
				</div>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
export default {
	name: "MdTableExample",
	data() {
		return {
			basicData: [
				{ id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
				{ id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
				{
					id: 3,
					name: "Bob Johnson",
					email: "bob@example.com",
					role: "Editor",
				},
			],
			toolbarData: [
				{
					id: 1,
					name: "Alice Brown",
					email: "alice@example.com",
					role: "Manager",
				},
				{
					id: 2,
					name: "Charlie Wilson",
					email: "charlie@example.com",
					role: "Developer",
				},
				{
					id: 3,
					name: "Diana Davis",
					email: "diana@example.com",
					role: "Designer",
				},
			],
			selectionData: [
				{
					id: 1,
					name: "Eve Miller",
					email: "eve@example.com",
					role: "Analyst",
				},
				{
					id: 2,
					name: "Frank Garcia",
					email: "frank@example.com",
					role: "Tester",
				},
				{
					id: 3,
					name: "Grace Lee",
					email: "grace@example.com",
					role: "Manager",
				},
				{
					id: 4,
					name: "Henry Taylor",
					email: "henry@example.com",
					role: "Developer",
				},
			],
			selectedItems: [],
			fixedHeaderData: [
				{
					id: 1,
					name: "Ivy Chen",
					email: "ivy@example.com",
					role: "Admin",
					department: "IT",
					salary: "$80,000",
				},
				{
					id: 2,
					name: "Jack Anderson",
					email: "jack@example.com",
					role: "Developer",
					department: "Engineering",
					salary: "$75,000",
				},
				{
					id: 3,
					name: "Kate Martinez",
					email: "kate@example.com",
					role: "Designer",
					department: "Design",
					salary: "$70,000",
				},
				{
					id: 4,
					name: "Liam Thompson",
					email: "liam@example.com",
					role: "Manager",
					department: "Sales",
					salary: "$85,000",
				},
				{
					id: 5,
					name: "Mia Rodriguez",
					email: "mia@example.com",
					role: "Analyst",
					department: "Marketing",
					salary: "$65,000",
				},
				{
					id: 6,
					name: "Noah White",
					email: "noah@example.com",
					role: "Developer",
					department: "Engineering",
					salary: "$78,000",
				},
				{
					id: 7,
					name: "Olivia Harris",
					email: "olivia@example.com",
					role: "Designer",
					department: "Design",
					salary: "$72,000",
				},
				{
					id: 8,
					name: "Paul Clark",
					email: "paul@example.com",
					role: "Manager",
					department: "HR",
					salary: "$82,000",
				},
			],
			cardData: [
				{
					id: 1,
					name: "Quinn Lewis",
					email: "quinn@example.com",
					role: "Admin",
				},
				{ id: 2, name: "Ruby Hall", email: "ruby@example.com", role: "User" },
				{ id: 3, name: "Sam Young", email: "sam@example.com", role: "Editor" },
			],
			paginatedData: [
				{
					id: 1,
					name: "Tom Allen",
					email: "tom@example.com",
					role: "Developer",
				},
				{ id: 2, name: "Uma King", email: "uma@example.com", role: "Designer" },
				{
					id: 3,
					name: "Victor Scott",
					email: "victor@example.com",
					role: "Manager",
				},
			],
			totalItems: 100,
			currentPage: 1,
			itemsPerPage: 10,
		}
	},
	methods: {
		onSelection(selectedItems) {
			this.selectedItems = selectedItems
		},
		clearSelection() {
			this.selectedItems = []
		},
		onPaginate(pagination) {
			this.currentPage = pagination.page
			this.itemsPerPage = pagination.limit
			// In a real app, you would fetch data based on pagination
			console.log("Pagination changed:", pagination)
		},
	},
}
</script>

<style lang="scss" scoped>
.md-app-content {
	padding: 16px;
}

.md-layout-item {
	margin-bottom: 16px;
}

h3 {
	margin-top: 32px;
	margin-bottom: 16px;
}

.md-card {
	margin-bottom: 24px;
}

.md-table {
	margin-top: 16px;
}
</style>
