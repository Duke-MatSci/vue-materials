<template>
	<div>
		<!-- Test 1: Basic dialog with title, content, and actions (matching Dialog.vue usage) -->
		<md-dialog
			:class="['dialog-box', dialogSizeClass]"
			v-model:md-active="showDialog1"
			:md-click-outside-to-close="false"
		>
			<div class="dialog-box_header">
				<md-dialog-title>Basic Dialog Title</md-dialog-title>
				<md-button
					class="md-icon-button dialog-box_close"
					@click="showDialog1 = false"
				>
					<md-icon>close</md-icon>
				</md-button>
			</div>
			<div class="dialog-box_content">
				<md-dialog-content>
					<p>This is a test dialog matching the Dialog.vue structure.</p>
					<p>The dialog should appear ABOVE the overlay, not behind it.</p>
					<p>Click the close button or Cancel to close.</p>
				</md-dialog-content>
			</div>
			<div class="dialog-box_actions">
				<md-dialog-actions>
					<md-button class="md-primary" @click="showDialog1 = false">
						Cancel
					</md-button>
					<md-button class="md-primary md-raised" @click="showDialog1 = false">
						Confirm
					</md-button>
				</md-dialog-actions>
			</div>
		</md-dialog>

		<!-- Test 2: Dialog with different size (small) -->
		<md-dialog
			class="dialog-box dialog-box_size-sm"
			v-model:md-active="showDialog2"
			:md-click-outside-to-close="false"
		>
			<div class="dialog-box_header">
				<md-dialog-title>Small Dialog</md-dialog-title>
				<md-button class="md-icon-button" @click="showDialog2 = false">
					<md-icon>close</md-icon>
				</md-button>
			</div>
			<md-dialog-content>
				<p>This is a smaller dialog (40% width).</p>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button @click="showDialog2 = false">Close</md-button>
			</md-dialog-actions>
		</md-dialog>

		<!-- Test 3: Dialog with large size -->
		<md-dialog
			class="dialog-box dialog-box_size-lg"
			v-model:md-active="showDialog3"
			:md-click-outside-to-close="true"
		>
			<div class="dialog-box_header">
				<md-dialog-title>Large Dialog</md-dialog-title>
				<md-button class="md-icon-button" @click="showDialog3 = false">
					<md-icon>close</md-icon>
				</md-button>
			</div>
			<md-dialog-content>
				<p>This is a larger dialog (80% width).</p>
				<p>You can click outside to close this one.</p>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary" @click="showDialog3 = false">
					OK
				</md-button>
			</md-dialog-actions>
		</md-dialog>

		<!-- Test 4: Dialog without close button (disableClose simulation) -->
		<md-dialog
			class="dialog-box dialog-box_size-md"
			v-model:md-active="showDialog4"
			:md-click-outside-to-close="false"
			:md-close-on-esc="false"
		>
			<div class="dialog-box_header">
				<md-dialog-title>
					Cannot Close (No ESC, No Outside Click)
				</md-dialog-title>
			</div>
			<md-dialog-content>
				<p>This dialog can only be closed via the button below.</p>
				<p>ESC key and outside clicks are disabled.</p>
			</md-dialog-content>
			<md-dialog-actions>
				<md-button class="md-primary md-raised" @click="showDialog4 = false">
					Close via Button
				</md-button>
			</md-dialog-actions>
		</md-dialog>

		<!-- Buttons to trigger dialogs -->
		<div style="padding: 20px">
			<h3>Test MdDialog Z-Index Issues</h3>
			<p>
				Open each dialog and verify the dialog content appears ABOVE the overlay
				(not behind it).
			</p>

			<md-button class="md-primary md-raised" @click="showDialog1 = true">
				Show Basic Dialog (md-size)
			</md-button>

			<md-button class="md-accent md-raised" @click="showDialog2 = true">
				Show Small Dialog (40%)
			</md-button>

			<md-button class="md-raised" @click="showDialog3 = true">
				Show Large Dialog (80%)
			</md-button>

			<md-button class="md-raised" @click="showDialog4 = true">
				Show Non-Closable Dialog
			</md-button>
		</div>
	</div>
</template>

<script>
export default {
	name: "DialogCustom",
	data: () => ({
		showDialog1: false,
		showDialog2: false,
		showDialog3: false,
		showDialog4: false,
		minWidth: 60,
	}),
	computed: {
		dialogSizeClass() {
			const sizeMap = {
				40: "dialog-box_size-sm",
				60: "dialog-box_size-md",
				80: "dialog-box_size-lg",
			}
			return sizeMap[this.minWidth] || "dialog-box_size-md"
		},
	},
}
</script>

<style lang="scss" scoped>
/* Matching styles from Dialog.vue */
.dialog-box {
	&_size-sm :deep(.md-dialog-container) {
		min-width: 40%;
		max-width: 40%;
	}

	&_size-md :deep(.md-dialog-container) {
		min-width: 60%;
		max-width: 60%;
	}

	&_size-lg :deep(.md-dialog-container) {
		min-width: 80%;
		max-width: 80%;
	}

	&_header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 16px 24px;
		border-bottom: 1px solid rgba(0, 0, 0, 0.12);
	}

	&_content {
		padding: 20px 24px;
	}

	&_actions {
		padding: 8px 16px;
		border-top: 1px solid rgba(0, 0, 0, 0.12);
	}

	&_close {
		margin-left: auto;
	}
}
</style>
