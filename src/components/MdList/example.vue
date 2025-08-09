<template>
	<div class="md-list-examples">
		<h2>MdList Examples</h2>

		<!-- Basic List -->
		<div class="example-section">
			<h3>Basic List</h3>
			<md-list>
				<md-list-item>
					<md-icon>home</md-icon>
					<span class="md-list-item-text">Home</span>
				</md-list-item>
				<md-list-item>
					<md-icon>person</md-icon>
					<span class="md-list-item-text">Profile</span>
				</md-list-item>
				<md-list-item>
					<md-icon>settings</md-icon>
					<span class="md-list-item-text">Settings</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- Dense List -->
		<div class="example-section">
			<h3>Dense List</h3>
			<md-list class="md-dense">
				<md-list-item>
					<md-icon>home</md-icon>
					<span class="md-list-item-text">Home</span>
				</md-list-item>
				<md-list-item>
					<md-icon>person</md-icon>
					<span class="md-list-item-text">Profile</span>
				</md-list-item>
				<md-list-item>
					<md-icon>settings</md-icon>
					<span class="md-list-item-text">Settings</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- Double Line List -->
		<div class="example-section">
			<h3>Double Line List</h3>
			<md-list class="md-double-line">
				<md-list-item>
					<md-icon>home</md-icon>
					<span class="md-list-item-text">
						<span>Home</span>
						<span>Main navigation</span>
					</span>
				</md-list-item>
				<md-list-item>
					<md-icon>person</md-icon>
					<span class="md-list-item-text">
						<span>Profile</span>
						<span>User settings</span>
					</span>
				</md-list-item>
				<md-list-item>
					<md-icon>settings</md-icon>
					<span class="md-list-item-text">
						<span>Settings</span>
						<span>Application settings</span>
					</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- Triple Line List -->
		<div class="example-section">
			<h3>Triple Line List</h3>
			<md-list class="md-triple-line">
				<md-list-item>
					<md-icon>home</md-icon>
					<span class="md-list-item-text">
						<span>Home</span>
						<span>Main navigation</span>
						<span>Return to dashboard</span>
					</span>
				</md-list-item>
				<md-list-item>
					<md-icon>person</md-icon>
					<span class="md-list-item-text">
						<span>Profile</span>
						<span>User settings</span>
						<span>Manage your account</span>
					</span>
				</md-list-item>
				<md-list-item>
					<md-icon>settings</md-icon>
					<span class="md-list-item-text">
						<span>Settings</span>
						<span>Application settings</span>
						<span>Configure the app</span>
					</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- Expandable List -->
		<div class="example-section">
			<h3>Expandable List</h3>
			<md-list md-expand-single>
				<md-list-item>
					<md-icon>home</md-icon>
					<span class="md-list-item-text">Home</span>
				</md-list-item>

				<md-list-item md-expand>
					<md-icon>folder</md-icon>
					<span class="md-list-item-text">Projects</span>
					<template #md-expand>
						<md-list>
							<md-list-item>
								<md-icon>description</md-icon>
								<span class="md-list-item-text">Project 1</span>
							</md-list-item>
							<md-list-item>
								<md-icon>description</md-icon>
								<span class="md-list-item-text">Project 2</span>
							</md-list-item>
							<md-list-item>
								<md-icon>description</md-icon>
								<span class="md-list-item-text">Project 3</span>
							</md-list-item>
						</md-list>
					</template>
				</md-list-item>

				<md-list-item md-expand>
					<md-icon>people</md-icon>
					<span class="md-list-item-text">Team</span>
					<template #md-expand>
						<md-list>
							<md-list-item>
								<md-icon>person</md-icon>
								<span class="md-list-item-text">John Doe</span>
							</md-list-item>
							<md-list-item>
								<md-icon>person</md-icon>
								<span class="md-list-item-text">Jane Smith</span>
							</md-list-item>
						</md-list>
					</template>
				</md-list-item>
			</md-list>
		</div>

		<!-- List with Actions -->
		<div class="example-section">
			<h3>List with Actions</h3>
			<md-list>
				<md-list-item @click="handleItemClick('item1')">
					<md-icon>home</md-icon>
					<span class="md-list-item-text">Clickable Item 1</span>
					<md-icon class="md-list-action">arrow_forward</md-icon>
				</md-list-item>
				<md-list-item @click="handleItemClick('item2')">
					<md-icon>person</md-icon>
					<span class="md-list-item-text">Clickable Item 2</span>
					<md-icon class="md-list-action">arrow_forward</md-icon>
				</md-list-item>
				<md-list-item disabled>
					<md-icon>settings</md-icon>
					<span class="md-list-item-text">Disabled Item</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- List with Links -->
		<div class="example-section">
			<h3>List with Links</h3>
			<md-list>
				<md-list-item href="https://example.com" target="_blank">
					<md-icon>link</md-icon>
					<span class="md-list-item-text">External Link</span>
				</md-list-item>
				<md-list-item href="#section1">
					<md-icon>bookmark</md-icon>
					<span class="md-list-item-text">Internal Link</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- List with Checkboxes -->
		<div class="example-section">
			<h3>List with Checkboxes</h3>
			<md-list>
				<md-list-item>
					<md-checkbox v-model="checkedItems.item1" />
					<span class="md-list-item-text">Item 1</span>
				</md-list-item>
				<md-list-item>
					<md-checkbox v-model="checkedItems.item2" />
					<span class="md-list-item-text">Item 2</span>
				</md-list-item>
				<md-list-item>
					<md-checkbox v-model="checkedItems.item3" />
					<span class="md-list-item-text">Item 3</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- List with Radio Buttons -->
		<div class="example-section">
			<h3>List with Radio Buttons</h3>
			<md-list>
				<md-list-item>
					<md-radio v-model="selectedOption" value="option1" />
					<span class="md-list-item-text">Option 1</span>
				</md-list-item>
				<md-list-item>
					<md-radio v-model="selectedOption" value="option2" />
					<span class="md-list-item-text">Option 2</span>
				</md-list-item>
				<md-list-item>
					<md-radio v-model="selectedOption" value="option3" />
					<span class="md-list-item-text">Option 3</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- List with Avatars -->
		<div class="example-section">
			<h3>List with Avatars</h3>
			<md-list class="md-double-line">
				<md-list-item>
					<md-avatar>
						<img src="https://via.placeholder.com/40" alt="User 1" />
					</md-avatar>
					<span class="md-list-item-text">
						<span>John Doe</span>
						<span>Software Engineer</span>
					</span>
				</md-list-item>
				<md-list-item>
					<md-avatar>
						<img src="https://via.placeholder.com/40" alt="User 2" />
					</md-avatar>
					<span class="md-list-item-text">
						<span>Jane Smith</span>
						<span>Product Manager</span>
					</span>
				</md-list-item>
			</md-list>
		</div>

		<!-- Inset List -->
		<div class="example-section">
			<h3>Inset List</h3>
			<md-list>
				<md-list-item class="md-inset">
					<md-icon>home</md-icon>
					<span class="md-list-item-text">Inset Item 1</span>
				</md-list-item>
				<md-list-item class="md-inset">
					<md-icon>person</md-icon>
					<span class="md-list-item-text">Inset Item 2</span>
				</md-list-item>
			</md-list>
		</div>
	</div>
</template>

<script>
export default {
	name: "MdListExample",
	data() {
		return {
			checkedItems: {
				item1: false,
				item2: false,
				item3: false,
			},
			selectedOption: "option1",
		}
	},
	methods: {
		handleItemClick(item) {
			console.log(`Clicked: ${item}`)
			alert(`You clicked: ${item}`)
		},
	},
}
</script>

<style lang="scss" scoped>
.md-list-examples {
	padding: 20px;

	.example-section {
		margin-bottom: 40px;

		h3 {
			margin-bottom: 16px;
			color: #333;
			font-size: 18px;
			font-weight: 500;
		}

		.md-list {
			max-width: 400px;
			border: 1px solid #e0e0e0;
			border-radius: 4px;
			background: white;
		}
	}
}
</style>
