<template>
	<div>
		<md-app>
			<md-app-toolbar class="md-primary">
				<md-button class="md-icon-button" @click="toggleTemporaryDrawer">
					<md-icon>menu</md-icon>
				</md-button>
				<h2 class="md-title">MdDrawer Examples</h2>
			</md-app-toolbar>

			<md-app-drawer :md-active.sync="temporaryDrawerActive">
				<md-toolbar class="md-transparent" md-elevation="0">
					<span>Temporary Drawer</span>
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
						<h3>MdDrawer Component Examples</h3>

						<md-card>
							<md-card-header>
								<div class="md-title">Drawer Types</div>
								<div class="md-subhead">
									Different drawer modes and configurations
								</div>
							</md-card-header>

							<md-card-content>
								<h4>Temporary Drawer</h4>
								<p>Overlay drawer that appears on top of content</p>
								<md-button @click="toggleTemporaryDrawer" class="md-primary">
									Toggle Temporary Drawer
								</md-button>

								<h4>Persistent Drawer</h4>
								<p>Side-by-side with content, can be mini or full</p>
								<md-button @click="togglePersistentDrawer" class="md-accent">
									Toggle Persistent Drawer
								</md-button>

								<h4>Permanent Drawer</h4>
								<p>Always visible, can be full, clipped, or card</p>
								<md-button @click="togglePermanentDrawer" class="md-raised">
									Toggle Permanent Drawer
								</md-button>

								<h4>Right Drawer</h4>
								<p>Drawer positioned on the right side</p>
								<md-button
									@click="toggleRightDrawer"
									class="md-raised md-primary"
								>
									Toggle Right Drawer
								</md-button>
							</md-card-content>
						</md-card>
					</div>
				</div>
			</md-app-content>
		</md-app>

		<!-- Standalone Drawer Examples -->
		<div style="position: relative; height: 400px; margin-top: 20px">
			<h3>Standalone Drawer Examples</h3>

			<!-- Temporary Drawer -->
			<md-drawer
				:md-active="temporaryDrawerActive"
				@update:mdActive="temporaryDrawerActive = $event"
				style="position: absolute"
			>
				<md-toolbar class="md-transparent" md-elevation="0">
					<span>Standalone Temporary</span>
				</md-toolbar>
				<md-list>
					<md-list-item>Item 1</md-list-item>
					<md-list-item>Item 2</md-list-item>
					<md-list-item>Item 3</md-list-item>
				</md-list>
			</md-drawer>

			<!-- Persistent Mini Drawer -->
			<md-drawer
				md-persistent="mini"
				:md-active="persistentDrawerActive"
				@update:mdActive="persistentDrawerActive = $event"
				style="position: absolute"
			>
				<md-toolbar class="md-transparent" md-elevation="0">
					<span>Mini Persistent</span>
				</md-toolbar>
				<md-list>
					<md-list-item>
						<md-icon>home</md-icon>
						<span class="md-list-item-text">Home</span>
					</md-list-item>
					<md-list-item>
						<md-icon>favorite</md-icon>
						<span class="md-list-item-text">Favorites</span>
					</md-list-item>
				</md-list>
			</md-drawer>

			<!-- Permanent Card Drawer -->
			<md-drawer md-permanent="card" style="position: absolute; right: 0">
				<md-toolbar class="md-transparent" md-elevation="0">
					<span>Permanent Card</span>
				</md-toolbar>
				<md-list>
					<md-list-item>Card Item 1</md-list-item>
					<md-list-item>Card Item 2</md-list-item>
				</md-list>
			</md-drawer>

			<!-- Right Drawer -->
			<md-drawer
				md-right
				:md-active="rightDrawerActive"
				@update:mdActive="rightDrawerActive = $event"
				style="position: absolute; right: 0"
			>
				<md-toolbar class="md-transparent" md-elevation="0">
					<span>Right Drawer</span>
				</md-toolbar>
				<md-list>
					<md-list-item>Right Item 1</md-list-item>
					<md-list-item>Right Item 2</md-list-item>
				</md-list>
			</md-drawer>

			<!-- Right Previous Drawer (Hidden) -->
			<md-drawer-right-previous
				md-permanent="full"
				:md-active="false"
				style="position: absolute; right: 0; top: 0"
			></md-drawer-right-previous>
		</div>
	</div>
</template>

<script>
export default {
	name: "MdDrawerExample",
	data() {
		return {
			temporaryDrawerActive: false,
			persistentDrawerActive: false,
			permanentDrawerActive: false,
			rightDrawerActive: false,
		}
	},
	methods: {
		toggleTemporaryDrawer() {
			this.temporaryDrawerActive = !this.temporaryDrawerActive
		},
		togglePersistentDrawer() {
			this.persistentDrawerActive = !this.persistentDrawerActive
		},
		togglePermanentDrawer() {
			this.permanentDrawerActive = !this.permanentDrawerActive
		},
		toggleRightDrawer() {
			this.rightDrawerActive = !this.rightDrawerActive
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

h4 {
	margin-top: 24px;
	margin-bottom: 8px;
}

.md-button {
	margin: 8px 8px 8px 0;
}
</style>
