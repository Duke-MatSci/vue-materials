<template>
	<div>
		<md-app>
			<md-app-toolbar class="md-primary">
				<h2 class="md-title">MdSnackbar Examples</h2>
			</md-app-toolbar>

			<md-app-content>
				<div class="md-layout md-gutter">
					<div class="md-layout-item md-size-100">
						<h3>MdSnackbar Component Examples</h3>

						<!-- Basic Snackbar -->
						<md-card>
							<md-card-header>
								<div class="md-title">Basic Snackbar</div>
								<div class="md-subhead">Simple snackbar with message</div>
							</md-card-header>

							<md-card-content>
								<md-button
									class="md-raised md-primary"
									@click="showBasicSnackbar"
								>
									Show Basic Snackbar
								</md-button>

								<md-snackbar :md-active.sync="showBasic" md-persistent>
									<span>Basic snackbar message</span>
									<md-button class="md-primary" @click="showBasic = false">
										Close
									</md-button>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Snackbar with Action -->
						<md-card>
							<md-card-header>
								<div class="md-title">Snackbar with Action</div>
								<div class="md-subhead">Snackbar with action button</div>
							</md-card-header>

							<md-card-content>
								<md-button
									class="md-raised md-primary"
									@click="showActionSnackbar"
								>
									Show Action Snackbar
								</md-button>

								<md-snackbar :md-active.sync="showAction" md-persistent>
									<span>Message sent successfully</span>
									<md-button class="md-primary" @click="undoAction">
										UNDO
									</md-button>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Auto-Hide Snackbar -->
						<md-card>
							<md-card-header>
								<div class="md-title">Auto-Hide Snackbar</div>
								<div class="md-subhead">
									Snackbar that auto-hides after duration
								</div>
							</md-card-header>

							<md-card-content>
								<md-button
									class="md-raised md-primary"
									@click="showAutoHideSnackbar"
								>
									Show Auto-Hide Snackbar (3s)
								</md-button>

								<md-snackbar
									:md-active.sync="showAutoHide"
									:md-duration="3000"
									@md-opened="onSnackbarOpened"
									@md-closed="onSnackbarClosed"
								>
									<span>This will auto-hide in 3 seconds</span>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Left Position Snackbar -->
						<md-card>
							<md-card-header>
								<div class="md-title">Left Position Snackbar</div>
								<div class="md-subhead">Snackbar positioned on the left</div>
							</md-card-header>

							<md-card-content>
								<md-button
									class="md-raised md-primary"
									@click="showLeftSnackbar"
								>
									Show Left Position Snackbar
								</md-button>

								<md-snackbar
									:md-active.sync="showLeft"
									md-position="left"
									md-persistent
								>
									<span>Left positioned snackbar</span>
									<md-button class="md-primary" @click="showLeft = false">
										Close
									</md-button>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Multiple Actions Snackbar -->
						<md-card>
							<md-card-header>
								<div class="md-title">Multiple Actions Snackbar</div>
								<div class="md-subhead">
									Snackbar with multiple action buttons
								</div>
							</md-card-header>

							<md-card-content>
								<md-button
									class="md-raised md-primary"
									@click="showMultipleActionsSnackbar"
								>
									Show Multiple Actions Snackbar
								</md-button>

								<md-snackbar
									:md-active.sync="showMultipleActions"
									md-persistent
								>
									<span>File deleted successfully</span>
									<md-button class="md-primary" @click="restoreFile">
										RESTORE
									</md-button>
									<md-button
										class="md-primary"
										@click="showMultipleActions = false"
									>
										DISMISS
									</md-button>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Queue Demo -->
						<md-card>
							<md-card-header>
								<div class="md-title">Snackbar Queue Demo</div>
								<div class="md-subhead">
									Multiple snackbars queued one after another
								</div>
							</md-card-header>

							<md-card-content>
								<md-button class="md-raised md-primary" @click="showQueueDemo">
									Show Queue Demo (3 Snackbars)
								</md-button>

								<md-snackbar
									:md-active.sync="showQueue1"
									:md-duration="2000"
									@md-closed="showNextInQueue"
								>
									<span>First snackbar in queue</span>
								</md-snackbar>

								<md-snackbar
									:md-active.sync="showQueue2"
									:md-duration="2000"
									@md-closed="showFinalInQueue"
								>
									<span>Second snackbar in queue</span>
								</md-snackbar>

								<md-snackbar :md-active.sync="showQueue3" :md-duration="2000">
									<span>Final snackbar in queue</span>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Custom Duration -->
						<md-card>
							<md-card-header>
								<div class="md-title">Custom Duration</div>
								<div class="md-subhead">
									Snackbar with custom display duration
								</div>
							</md-card-header>

							<md-card-content>
								<div class="duration-controls">
									<md-field>
										<label>Duration (ms)</label>
										<md-input v-model.number="customDuration" type="number" />
									</md-field>
									<md-button
										class="md-raised md-primary"
										@click="showCustomDurationSnackbar"
									>
										Show Custom Duration Snackbar
									</md-button>
								</div>

								<md-snackbar
									:md-active.sync="showCustomDuration"
									:md-duration="customDuration"
								>
									<span>Custom duration: {{ customDuration }}ms</span>
								</md-snackbar>
							</md-card-content>
						</md-card>

						<!-- Status Messages -->
						<div class="status-section">
							<h4>Status Messages</h4>
							<div v-if="statusMessage" class="status-message">
								{{ statusMessage }}
							</div>
						</div>
					</div>
				</div>
			</md-app-content>
		</md-app>
	</div>
</template>

<script>
export default {
	name: "MdSnackbarExample",
	data() {
		return {
			showBasic: false,
			showAction: false,
			showAutoHide: false,
			showLeft: false,
			showMultipleActions: false,
			showQueue1: false,
			showQueue2: false,
			showQueue3: false,
			showCustomDuration: false,
			customDuration: 5000,
			statusMessage: "",
		}
	},
	methods: {
		showBasicSnackbar() {
			this.showBasic = true
			this.setStatus("Basic snackbar activated")
		},
		showActionSnackbar() {
			this.showAction = true
			this.setStatus("Action snackbar activated")
		},
		showAutoHideSnackbar() {
			this.showAutoHide = true
			this.setStatus("Auto-hide snackbar activated")
		},
		showLeftSnackbar() {
			this.showLeft = true
			this.setStatus("Left position snackbar activated")
		},
		showMultipleActionsSnackbar() {
			this.showMultipleActions = true
			this.setStatus("Multiple actions snackbar activated")
		},
		showQueueDemo() {
			this.showQueue1 = true
			this.setStatus("Queue demo started - showing first snackbar")
		},
		showCustomDurationSnackbar() {
			this.showCustomDuration = true
			this.setStatus(
				`Custom duration snackbar activated for ${this.customDuration}ms`
			)
		},
		undoAction() {
			this.showAction = false
			this.setStatus("Action undone!")
		},
		restoreFile() {
			this.showMultipleActions = false
			this.setStatus("File restored successfully!")
		},
		showNextInQueue() {
			this.showQueue2 = true
			this.setStatus("Showing second snackbar in queue")
		},
		showFinalInQueue() {
			this.showQueue3 = true
			this.setStatus("Showing final snackbar in queue")
		},
		onSnackbarOpened() {
			this.setStatus("Snackbar opened event fired")
		},
		onSnackbarClosed() {
			this.setStatus("Snackbar closed event fired")
		},
		setStatus(message) {
			this.statusMessage = message
			setTimeout(() => {
				this.statusMessage = ""
			}, 3000)
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
	margin-bottom: 16px;
}

.md-card {
	margin-bottom: 24px;
}

.duration-controls {
	display: flex;
	align-items: center;
	gap: 16px;
	margin-bottom: 16px;

	.md-field {
		width: 200px;
	}
}

.status-section {
	margin-top: 32px;
	padding: 16px;
	background-color: #f5f5f5;
	border-radius: 4px;
}

.status-message {
	padding: 8px;
	background-color: #e3f2fd;
	border-left: 4px solid #2196f3;
	border-radius: 2px;
	font-weight: 500;
}
</style>
