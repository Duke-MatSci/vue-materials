<template>
	<div>
		<h2>Vue Materials Test App</h2>

		<!-- Theme Toggle Button -->
		<div style="margin-bottom: 20px">
			<md-button @click="toggleTheme" class="md-raised">
				<md-icon>{{ themeIcon }}</md-icon>
				{{ themeText }}
			</md-button>
		</div>

		<!-- Comprehensive MdApp with nested lists -->
		<md-app md-mode="reveal" :md-theme="currentTheme">
			<md-app-toolbar class="md-primary">
				<md-button class="md-icon-button" @click="toggleDrawer">
					<md-icon>menu</md-icon>
				</md-button>
				<h2 class="md-title">Vue Materials Demo</h2>
				<div class="md-toolbar-section-end">
					<md-button class="md-icon-button" @click="toggleTheme">
						<md-icon>{{ themeIcon }}</md-icon>
					</md-button>
				</div>
			</md-app-toolbar>

			<md-app-drawer :md-active="drawerActive">
				<md-toolbar class="md-transparent" md-elevation="0">
					Navigation
				</md-toolbar>

				<md-list>
					<!-- Home Section -->
					<md-list-item @click="navigateTo('home')">
						<md-icon>home</md-icon>
						<span class="md-list-item-text">Home</span>
					</md-list-item>

					<!-- Dashboard Section -->
					<md-list-item @click="navigateTo('dashboard')">
						<md-icon>dashboard</md-icon>
						<span class="md-list-item-text">Dashboard</span>
					</md-list-item>

					<!-- User Management Section with Nested Lists -->
					<md-list-item-expand>
						<md-list-item slot="md-list-expand-header">
							<md-icon>people</md-icon>
							<span class="md-list-item-text">User Management</span>
						</md-list-item>

						<md-list slot="md-list-expand">
							<md-list-item @click="navigateTo('users-list')">
								<md-icon>list</md-icon>
								<span class="md-list-item-text">All Users</span>
							</md-list-item>

							<md-list-item @click="navigateTo('add-user')">
								<md-icon>person_add</md-icon>
								<span class="md-list-item-text">Add User</span>
							</md-list-item>

							<md-list-item @click="navigateTo('user-roles')">
								<md-icon>security</md-icon>
								<span class="md-list-item-text">User Roles</span>
							</md-list-item>
						</md-list>
					</md-list-item-expand>

					<!-- Content Management Section with Nested Lists -->
					<md-list-item-expand>
						<md-list-item slot="md-list-expand-header">
							<md-icon>article</md-icon>
							<span class="md-list-item-text">Content Management</span>
						</md-list-item>

						<md-list slot="md-list-expand">
							<md-list-item @click="navigateTo('articles')">
								<md-icon>description</md-icon>
								<span class="md-list-item-text">Articles</span>
							</md-list-item>

							<md-list-item @click="navigateTo('media')">
								<md-icon>image</md-icon>
								<span class="md-list-item-text">Media Library</span>
							</md-list-item>

							<md-list-item-expand>
								<md-list-item slot="md-list-expand-header">
									<md-icon>category</md-icon>
									<span class="md-list-item-text">Categories</span>
								</md-list-item>

								<md-list slot="md-list-expand">
									<md-list-item @click="navigateTo('categories-list')">
										<md-icon>list</md-icon>
										<span class="md-list-item-text">All Categories</span>
									</md-list-item>

									<md-list-item @click="navigateTo('add-category')">
										<md-icon>add</md-icon>
										<span class="md-list-item-text">Add Category</span>
									</md-list-item>
								</md-list>
							</md-list-item-expand>
						</md-list>
					</md-list-item-expand>

					<md-divider></md-divider>

					<!-- Settings Section -->
					<md-list-item @click="navigateTo('settings')">
						<md-icon>settings</md-icon>
						<span class="md-list-item-text">Settings</span>
					</md-list-item>

					<md-list-item @click="navigateTo('profile')">
						<md-icon>person</md-icon>
						<span class="md-list-item-text">Profile</span>
						<md-badge md-content="3" class="md-primary"></md-badge>
					</md-list-item>

					<md-list-item @click="navigateTo('help')">
						<md-icon>help</md-icon>
						<span class="md-list-item-text">Help & Support</span>
					</md-list-item>
				</md-list>
			</md-app-drawer>

			<md-app-content>
				<div class="content-wrapper">
					<h3>Current Page: {{ currentPage }}</h3>

					<!-- Demo Content -->
					<md-card>
						<md-card-header>
							<md-card-header-text>
								<div class="md-title">Welcome to Vue Materials</div>
								<div class="md-subhead">
									A comprehensive Material Design component library for Vue 3
								</div>
							</md-card-header-text>
						</md-card-header>

						<md-card-content>
							<p>
								This is a demonstration of the Vue Materials component library.
								The app includes:
							</p>
							<ul>
								<li>MdApp with reveal mode navigation</li>
								<li>Nested expandable lists in the drawer</li>
								<li>Theme switching (light/dark mode)</li>
								<li>Material Design icons</li>
								<li>Badges for notifications</li>
								<li>Cards for content display</li>
							</ul>
						</md-card-content>

						<md-card-actions>
							<md-button @click="showSnackbar" class="md-primary"
								>Show Snackbar</md-button
							>
							<md-button @click="showDialog" class="md-accent"
								>Show Dialog</md-button
							>
						</md-card-actions>
					</md-card>

					<!-- Component Examples -->
					<div style="margin-top: 20px">
						<h4>Component Examples:</h4>

						<md-button class="md-raised md-primary">Primary Button</md-button>
						<md-button class="md-raised md-accent">Accent Button</md-button>
						<md-button class="md-raised">Default Button</md-button>

						<div style="margin-top: 10px">
							<md-checkbox v-model="checkboxValue"
								>Checkbox Example</md-checkbox
							>
						</div>

						<div style="margin-top: 10px">
							<md-radio v-model="radioValue" value="option1">Option 1</md-radio>
							<md-radio v-model="radioValue" value="option2">Option 2</md-radio>
						</div>
					</div>
				</div>
			</md-app-content>
		</md-app>

		<!-- Snackbar -->
		<md-snackbar :md-active="snackbarActive" md-persistent>
			<span>This is a snackbar message!</span>
			<md-button class="md-primary" @click="snackbarActive = false"
				>Close</md-button
			>
		</md-snackbar>

		<!-- Dialog -->
		<md-dialog
			:md-active="dialogActive"
			@md-clicked-outside="dialogActive = false"
		>
			<md-dialog-title>Sample Dialog</md-dialog-title>
			<md-dialog-content>
				<p>This is a sample dialog from Vue Materials.</p>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button @click="dialogActive = false">Cancel</md-button>
				<md-button class="md-primary" @click="dialogActive = false"
					>OK</md-button
				>
			</md-dialog-actions>
		</md-dialog>
	</div>
</template>

<script>
export default {
	name: "VueMaterialsTest",
	data() {
		return {
			drawerActive: false,
			currentPage: "home",
			currentTheme: "default",
			checkboxValue: false,
			radioValue: "option1",
			snackbarActive: false,
			dialogActive: false,
		}
	},
	computed: {
		themeIcon() {
			return this.currentTheme === "default" ? "brightness_4" : "brightness_7"
		},
		themeText() {
			return this.currentTheme === "default" ? "Dark Theme" : "Light Theme"
		},
	},
	methods: {
		toggleDrawer() {
			this.drawerActive = !this.drawerActive
		},
		navigateTo(page) {
			this.currentPage = page
			this.drawerActive = false
			console.log(`Navigating to: ${page}`)
		},
		toggleTheme() {
			this.currentTheme =
				this.currentTheme === "default" ? "default-dark" : "default"
		},
		showSnackbar() {
			this.snackbarActive = true
		},
		showDialog() {
			this.dialogActive = true
		},
	},
}
</script>

<style scoped>
.md-app {
	height: 600px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	margin: 20px 0;
}

.content-wrapper {
	padding: 20px;
}

.md-card {
	margin-bottom: 20px;
}

.md-button {
	margin-right: 8px;
}

.md-radio {
	margin-right: 16px;
}
</style>
