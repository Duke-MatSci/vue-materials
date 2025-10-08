<template>
	<div style="padding: 20px; max-width: 600px">
		<h3>MdSelect Component Test</h3>

		<div style="margin-top: 20px">
			<h4>Single Select</h4>
			<md-field>
				<label>Choose a country</label>
				<md-select v-model="selectedCountry" name="country">
					<md-option value="usa">United States</md-option>
					<md-option value="canada">Canada</md-option>
					<md-option value="mexico">Mexico</md-option>
					<md-option value="uk">United Kingdom</md-option>
				</md-select>
			</md-field>
			<p>Selected: {{ selectedCountry }}</p>
		</div>

		<div style="margin-top: 20px">
			<h4>Multiple Select</h4>
			<div class="md-layout md-gutter">
				<div class="md-layout-item">
					<md-field>
						<label for="movies">Movies</label>
						<md-select
							v-model="selectedMovies"
							name="movies"
							id="movies"
							multiple
						>
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
			</div>
		</div>

		<div style="margin-top: 20px">
			<h4>Disabled Select</h4>
			<md-field>
				<label>Disabled</label>
				<md-select v-model="disabledValue" disabled>
					<md-option value="test">Test Option</md-option>
				</md-select>
			</md-field>
		</div>

		<div style="margin-top: 20px">
			<h4>With Placeholder</h4>
			<md-field>
				<label>With Placeholder</label>
				<md-select v-model="placeholderValue" placeholder="Select an option...">
					<md-option value="1">Option 1</md-option>
					<md-option value="2">Option 2</md-option>
					<md-option value="3">Option 3</md-option>
				</md-select>
			</md-field>
		</div>
	</div>
</template>

<script>
export default {
	name: "TestSelect",
	data() {
		return {
			selectedCountry: "usa",
			selectedMovies: [],
			disabledValue: null,
			placeholderValue: null,
		}
	},
}
</script>

<style scoped>
h3 {
	margin-bottom: 10px;
}

h4 {
	margin: 10px 0;
	font-size: 16px;
}

p {
	margin: 5px 0;
	font-size: 14px;
	color: #666;
}
</style>
