<template>
	<div>
		<h3>MdProgressBar - All Modes</h3>

		<!-- Determinate Mode -->
		<div class="test-section">
			<h4>Determinate Mode</h4>
			<md-progress-bar
				md-mode="determinate"
				:md-value="amount"
			></md-progress-bar>
			<md-progress-bar
				class="md-accent"
				md-mode="determinate"
				:md-value="amount"
			></md-progress-bar>
		</div>

		<!-- Indeterminate Mode -->
		<div class="test-section">
			<h4>Indeterminate Mode (Animated)</h4>
			<md-progress-bar md-mode="indeterminate"></md-progress-bar>
			<md-progress-bar
				class="md-accent"
				md-mode="indeterminate"
			></md-progress-bar>
		</div>

		<!-- Query Mode -->
		<div class="test-section">
			<h4>Query Mode (Reversed Animation)</h4>
			<md-progress-bar md-mode="query"></md-progress-bar>
			<md-progress-bar class="md-accent" md-mode="query"></md-progress-bar>
		</div>

		<!-- Buffer Mode -->
		<div class="test-section">
			<h4>Buffer Mode</h4>
			<md-progress-bar
				md-mode="buffer"
				:md-value="amount"
				:md-buffer="buffer"
			></md-progress-bar>
			<md-progress-bar
				class="md-accent"
				md-mode="buffer"
				:md-value="amount"
				:md-buffer="buffer"
			></md-progress-bar>
		</div>

		<h3>MdProgressSpinner - All Modes</h3>

		<!-- Determinate Spinner -->
		<div class="test-section">
			<h4>Determinate Spinner</h4>
			<md-progress-spinner
				md-mode="determinate"
				:md-value="amount"
			></md-progress-spinner>
			<md-progress-spinner
				class="md-accent"
				md-mode="determinate"
				:md-value="amount"
			></md-progress-spinner>
		</div>

		<!-- Indeterminate Spinner -->
		<div class="test-section">
			<h4>Indeterminate Spinner (Animated)</h4>
			<md-progress-spinner md-mode="indeterminate"></md-progress-spinner>
			<md-progress-spinner
				class="md-accent"
				md-mode="indeterminate"
			></md-progress-spinner>
		</div>

		<!-- Custom Size Spinners -->
		<div class="test-section">
			<h4>Custom Size Spinners</h4>
			<md-progress-spinner
				md-mode="determinate"
				:md-value="amount"
				:md-diameter="80"
				:md-stroke="8"
			></md-progress-spinner>
			<md-progress-spinner
				md-mode="indeterminate"
				:md-diameter="40"
				:md-stroke="4"
			></md-progress-spinner>
		</div>

		<!-- Controls -->
		<div class="controls">
			<div>
				Progress Value <br />
				<input type="range" v-model.number="amount" min="0" max="100" />
				{{ amount }}%
			</div>

			<div>
				Buffer Value <br />
				<input type="range" v-model.number="buffer" min="0" max="100" />
				{{ buffer }}%
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "TestProgress",
	data: () => ({
		amount: 25,
		buffer: 40,
	}),
}
</script>

<style lang="scss" scoped>
.test-section {
	margin: 24px 0;
	padding: 16px;
	border: 1px solid #e0e0e0;
	border-radius: 4px;
}

.md-progress-bar {
	margin: 16px 0;
}

.md-progress-spinner {
	margin: 16px;
}

.controls {
	margin: 24px 0;
	padding: 16px;
	border: 1px solid #ddd;
	border-radius: 4px;
	background: #f9f9f9;

	div {
		margin: 16px 0;
	}

	input {
		width: 200px;
		margin: 8px;
	}
}
</style>
