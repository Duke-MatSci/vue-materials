<template>
	<md-app md-mode="reveal">
		<md-app-toolbar class="md-primary">
			<md-button class="md-icon-button" @click="toggleDrawer">
				<md-icon>menu</md-icon>
			</md-button>
			<h2 class="md-title">Vue Material App</h2>
		</md-app-toolbar>

		<md-app-drawer :md-active.sync="drawerActive">
			<md-toolbar class="md-transparent" md-elevation="0">
				<span>Navigation</span>
			</md-toolbar>

			<md-list>
				<md-list-item>
					<md-icon>dashboard</md-icon>
					<span class="md-list-item-text">Dashboard</span>
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
		</md-app-drawer>

		<md-app-content>
			<div class="md-layout md-gutter">
				<div class="md-layout-item md-size-100">
					<md-card>
						<md-card-header>
							<div class="md-title">Welcome to Vue Material</div>
							<div class="md-subhead">
								This is an example of the MdApp component
							</div>
						</md-card-header>

						<md-card-content>
							<p>
								The MdApp component provides a complete application layout with:
							</p>
							<ul>
								<li>
									Responsive toolbar with various modes (fixed, reveal,
									flexible, etc.)
								</li>
								<li>
									Side drawer navigation with different types (temporary,
									persistent, permanent)
								</li>
								<li>Content area that adapts to the layout</li>
								<li>Waterfall effects and scroll handling</li>
							</ul>
						</md-card-content>

						<md-card-actions>
							<md-button class="md-primary">Get Started</md-button>
							<md-button>Learn More</md-button>
						</md-card-actions>
					</md-card>
				</div>
			</div>
		</md-app-content>
	</md-app>
</template>

<script>
export default {
	name: "MdAppExample",
	data() {
		return {
			drawerActive: false,
		}
	},
	methods: {
		toggleDrawer() {
			this.drawerActive = !this.drawerActive
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
</style>
