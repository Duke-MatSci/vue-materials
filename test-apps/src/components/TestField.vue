<template>
	<!-- <div class="md-layout md-gutter">
		<div style="margin-bottom: 20px; padding: 0.5rem">
			<md-field>
				<label>Initial Value</label>
				<md-input v-model="initial"></md-input>
			</md-field>

			<md-field>
				<label>Initial Value (Read Only)</label>
				<md-input v-model="initial" readonly></md-input>
			</md-field>

			<md-field>
				<label>Type here!</label>
				<md-input v-model="type"></md-input>
				<span class="md-helper-text">Helper text</span>
			</md-field>

			<md-field>
				<label>With label</label>
				<md-input
					v-model="withLabel"
					placeholder="A nice placeholder"
				></md-input>
			</md-field>

			<md-field md-inline>
				<label>Inline</label>
				<md-input v-model="inline"></md-input>
			</md-field>

			<md-field>
				<label>Number</label>
				<md-input v-model="number" type="number"></md-input>
			</md-field>

			<md-field>
				<label>Textarea</label>
				<md-textarea v-model="textarea"></md-textarea>
			</md-field>

			<md-field>
				<label>Textarea with Autogrow</label>
				<md-textarea v-model="autogrow" md-autogrow></md-textarea>
			</md-field>

			<md-field>
				<label>Disabled</label>
				<md-input v-model="disabled" disabled></md-input>
			</md-field>
		</div>
		<div class="md-layout-item">
			<md-field>
				<label for="movies">Movies</label>
				<md-select v-model="selectedMovies" name="movies" id="movies" multiple>
					<md-option value="fight-club">Fight Club</md-option>
					<md-option value="godfather">Godfather</md-option>
					<md-option value="godfather-ii">Godfather II</md-option>
					<md-option value="godfather-iii">Godfather III</md-option>
					<md-option value="godfellas">Godfellas</md-option>
					<md-option value="pulp-fiction">Pulp Fiction</md-option>
					<md-option value="scarface">Scarface</md-option>
				</md-select>
			</md-field>

			<div>
				<strong>Selected movies:</strong>
				{{ selectedMovies }}
			</div>
		</div>
	</div> -->
	<div class="md-layout md-gutter">
		<div class="md-layout-item">
			<md-field>
				<label for="food">Food</label>
				<md-select v-model="food1" name="food" id="food">
					<md-optgroup label="Baked Goods">
						<md-option value="apple-pie">Apple Pie</md-option>
						<md-option value="chocolate-cake">Chocolate Cake</md-option>
					</md-optgroup>

					<md-optgroup label="Fruits">
						<md-option value="apples">Apples</md-option>
						<md-option value="bananas">Bananas</md-option>
						<md-option value="oranges">Oranges</md-option>
						<md-option value="peaches">Peaches</md-option>
					</md-optgroup>

					<md-optgroup label="Vegetables">
						<md-option value="broccoli">Broccoli</md-option>
						<md-option value="carrots">Carrots</md-option>
						<md-option value="cucumbers">Cucumbers</md-option>
					</md-optgroup>
				</md-select>
			</md-field>
		</div>

		<div class="md-layout-item">
			<md-field>
				<label for="food">Food</label>
				<md-select v-model="food2" name="food" id="food" md-dense>
					<md-optgroup label="Baked Goods">
						<md-option value="apple-pie">Apple Pie</md-option>
						<md-option value="chocolate-cake">Chocolate Cake</md-option>
					</md-optgroup>

					<md-optgroup label="Fruits">
						<md-option value="apples">Apples</md-option>
						<md-option value="bananas">Bananas</md-option>
						<md-option value="oranges">Oranges</md-option>
						<md-option value="peaches">Peaches</md-option>
					</md-optgroup>

					<md-optgroup label="Vegetables">
						<md-option value="broccoli">Broccoli</md-option>
						<md-option value="carrots">Carrots</md-option>
						<md-option value="cucumbers">Cucumbers</md-option>
					</md-optgroup>
				</md-select>
			</md-field>
		</div>
	</div>
</template>

<script>
export default {
	name: "MultipleSelect",
	data: () => ({
		selectedMovies: [],
		initial: "Initial Value",
		type: null,
		withLabel: null,
		inline: null,
		number: null,
		textarea: null,
		autogrow: null,
		disabled: null,
		food1: null,
		food2: "carrots",
	}),
}
</script>

<style lang="scss" scoped>
// .md-field {
// 	max-width: 300px;
// }
</style>
