<template>
	<div>
		<md-table
				:value="paginatedUsers"
			md-card
			md-sort="name"
			md-sort-order="asc"
		>
			<md-table-toolbar>
				<h1 class="md-title">Users</h1>
			</md-table-toolbar>

				<template #md-table-row="{ item, index }">
					<md-table-row :md-index="index" :md-item="item">
						<md-table-cell md-label="ID" md-numeric>{{ item.id }}</md-table-cell>
						<md-table-cell md-label="Name">{{ item.name }}</md-table-cell>
						<md-table-cell md-label="Email">{{ item.email }}</md-table-cell>
						<md-table-cell md-label="Gender">{{ item.gender }}</md-table-cell>
						<md-table-cell md-label="Job Title">{{ item.title }}</md-table-cell>
					</md-table-row>
				</template>

				<md-table-pagination
					:md-page-size="pageSize"
					:md-page-options="[2, 5, 10]"
					:md-page="page"
					:md-total="users.length"
					@update:mdPageSize="(n) => { pageSize = Number(n); page = 1 }"
					@update:mdPage="(n) => { page = n }"
				/>
		</md-table>
	</div>
</template>

<script>
export default {
	name: "TablePagination",
	data: () => ({
		users: [
			{
				id: 1,
				name: "Shawna Dubbin",
				email: "sdubbin0@geocities.com",
				gender: "Male",
				title: "Assistant Media Planner",
			},
			{
				id: 2,
				name: "Odette Demageard",
				email: "odemageard1@spotify.com",
				gender: "Female",
				title: "Account Coordinator",
			},
			{
				id: 3,
				name: "Vera Taleworth",
				email: "vtaleworth2@google.ca",
				gender: "Male",
				title: "Community Outreach Specialist",
			},
			{
				id: 4,
				name: "Lonnie Izkovitz",
				email: "lizkovitz3@youtu.be",
				gender: "Female",
				title: "Operator",
			},
			{
				id: 5,
				name: "Thatcher Stave",
				email: "tstave4@reference.com",
				gender: "Male",
				title: "Software Test Engineer III",
			},
		],
		page: 1,
		pageSize: 2,
	}),
	computed: {
		paginatedUsers() {
			const start = (this.page - 1) * this.pageSize
			return this.users.slice(start, start + this.pageSize)
		},
	},
}
</script>

<style lang="scss" scoped>
.md-table + .md-table {
	margin-top: 16px;
}
</style>
