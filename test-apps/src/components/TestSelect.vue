<template>
  <div style="padding: 20px; max-width: 600px;">
    <h3>MdSelect Component Test</h3>

    <div style="margin-top: 20px;">
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

    <div style="margin-top: 20px;">
      <h4>Multiple Select</h4>
      <md-field>
        <label>Choose programming languages</label>
        <md-select v-model="selectedLanguages" name="languages" multiple>
          <md-option value="js">JavaScript</md-option>
          <md-option value="py">Python</md-option>
          <md-option value="java">Java</md-option>
          <md-option value="cpp">C++</md-option>
          <md-option value="go">Go</md-option>
        </md-select>
      </md-field>
      <p>Selected: {{ selectedLanguages }}</p>
    </div>

    <div style="margin-top: 20px;">
      <h4>Disabled Select</h4>
      <md-field>
        <label>Disabled</label>
        <md-select v-model="disabledValue" disabled>
          <md-option value="test">Test Option</md-option>
        </md-select>
      </md-field>
    </div>

    <div style="margin-top: 20px;">
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
  name: 'TestSelect',
  data() {
    return {
      selectedCountry: 'usa',
      selectedLanguages: ['js', 'py'],
      disabledValue: null,
      placeholderValue: null
    }
  }
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
