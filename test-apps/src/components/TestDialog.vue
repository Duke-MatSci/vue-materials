<template>
	<div>
		<md-dialog v-model:mdActive="showDialog">
			<md-dialog-title>Preferences</md-dialog-title>

			<md-tabs md-dynamic-height md-active-tab="general">
				<md-tab id="general" md-label="General">
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
				</md-tab>

				<md-tab id="activity" md-label="Activity">
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
				</md-tab>

				<md-tab id="account" md-label="Account">
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
						mollitia dolorum dolores quae commodi impedit possimus qui, atque at
						voluptates cupiditate. Neque quae culpa suscipit praesentium
						inventore ducimus ipsa aut.
					</p>
				</md-tab>
			</md-tabs>

			<md-dialog-actions>
				<md-button class="md-primary" @click="showDialog = false"
					>Close</md-button
				>
				<md-button class="md-primary" @click="showDialog = false"
					>Save</md-button
				>
			</md-dialog-actions>
		</md-dialog>

		<md-button class="md-primary md-raised" @click="showDialog = true"
			>Show Dialog</md-button
		>
	</div>
</template>

<script>
export default {
	name: "DialogCustom",
	data: () => ({
		showDialog: false,
	}),
}
</script>

<style lang="scss" scoped>
.md-dialog :deep(.md-dialog-container) {
	max-width: 768px;
}
</style>
