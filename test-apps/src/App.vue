<template>
	<div class="">
		<h2>Vue Materials Test</h2>

		<!-- Test Button Component -->
		<div style="margin-top: 20px">
			<h4>Button Examples</h4>
			<TestButton />
		</div>
		<div style="margin-top: 20px">
			<h4>Card Examples</h4>
			<TestCard />
		</div>
		<div style="margin-top: 20px">
			<h4>Card Examples</h4>
			<TestToolbar />
		</div>
		<div style="margin-top: 20px">
			<h4>List Examples</h4>
			<TestList />
		</div>
		<div style="margin-top: 20px">
			<h4>Snack Examples</h4>
			<TestSnack />
		</div>
		<div style="margin-top: 20px">
			<h4>Stepper Examples</h4>
			<TestStepper />
		</div>
		<div style="margin-top: 20px">
			<h4>Drawer Examples</h4>
			<TestDrawer />
		</div>
		<div style="margin-top: 20px">
			<h4>Dialog Examples</h4>
			<TestDialog />
		</div>
		<div style="margin-top: 20px">
			<h4>Tabs Examples (Standalone)</h4>
			<TestTabs />
		</div>
		<!-- Commented out until components are migrated -->
		<!--
		<MdApp md-mode="reveal">
			<MdAppToolbar class="md-primary">
				<MdButton class="md-icon-button" @click="toggleDrawer">
					<MdIcon>menu</MdIcon>
				</MdButton>
				<h2 class="md-title">App Title</h2>
			</MdAppToolbar>

			<MdAppDrawer :md-active="drawerActive">
				<MdList>
					<MdListItem @click="navigateTo('home')">
						<MdIcon>home</MdIcon>
						<span class="md-list-item-text">Home</span>
					</MdListItem>
					<MdListItem @click="navigateTo('profile')">
						<MdIcon>person</MdIcon>
						<span class="md-list-item-text">Profile</span>
					</MdListItem>
					<MdListItem @click="navigateTo('settings')">
						<MdIcon>settings</MdIcon>
						<span class="md-list-item-text">Settings</span>
					</MdListItem>
				</MdList>
			</MdAppDrawer>

			<MdAppContent>
				<h3>Current Page: {{ currentPage }}</h3>
				<p>Your app content here. This is the main content area.</p>
				<p>Click the menu button to open the navigation drawer.</p>
			</MdAppContent>
		</MdApp>
		--></div>
</template>

<script>
import TestButton from "./components/TestButton.vue"
import TestCard from "./components/TestCard.vue"
import TestToolbar from "./components/TestToolbar.vue"
import TestList from "./components/TestList.vue"
import TestSnack from "./components/TestSnack.vue"
import TestStepper from "./components/TestStepper.vue"
import TestDrawer from "./components/TestDrawer.vue"
import TestDialog from "./components/TestDialog.vue"
import TestTabs from "./components/TestTabs.vue"

export default {
	name: "MdAppTest",
	components: {
		TestButton,
		TestCard,
		TestToolbar,
		TestList,
		TestSnack,
		TestStepper,
		TestDrawer,
		TestDialog,
		TestTabs,
	},
	data() {
		return {
			drawerActive: false,
			currentPage: "home",
		}
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
	},
}
</script>

<style scoped>
.md-app {
	height: 400px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
	margin: 20px 0;
}
</style>
