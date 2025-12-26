<template>
  <div class="test-switch-container">
    <h1>MdSwitch Component Tests</h1>

    <!-- Test 1: Boolean Toggle Mode -->
    <section class="test-section">
      <h2>1. Boolean Toggle Mode</h2>
      <div class="test-item">
        <md-switch v-model="booleanValue">Boolean Switch</md-switch>
        <p>Value: {{ booleanValue }}</p>
      </div>
    </section>

    <!-- Test 2: Array Toggle Mode -->
    <section class="test-section">
      <h2>2. Array Toggle Mode (Multiple Selection)</h2>
      <div class="test-item">
        <md-switch v-model="arrayValue" value="option1">Option 1</md-switch>
        <md-switch v-model="arrayValue" value="option2">Option 2</md-switch>
        <md-switch v-model="arrayValue" value="option3">Option 3</md-switch>
        <p>Selected: {{ arrayValue.join(', ') || 'None' }}</p>
      </div>
    </section>

    <!-- Test 3: Single Select Mode with Value Binding -->
    <section class="test-section">
      <h2>3. Single Select Mode (Value Binding)</h2>
      <div class="test-item">
        <md-switch v-model="singleValue" value="red">Red</md-switch>
        <md-switch v-model="singleValue" value="green">Green</md-switch>
        <md-switch v-model="singleValue" value="blue">Blue</md-switch>
        <p>Selected Color: {{ singleValue || 'None' }}</p>
      </div>
    </section>

    <!-- Test 4: Custom True/False Values -->
    <section class="test-section">
      <h2>4. Custom trueValue and falseValue</h2>
      <div class="test-item">
        <md-switch v-model="customValue" :true-value="'yes'" :false-value="'no'">
          Custom Values
        </md-switch>
        <p>Value: {{ customValue }}</p>
      </div>
    </section>

    <!-- Test 5: Disabled State -->
    <section class="test-section">
      <h2>5. Disabled State</h2>
      <div class="test-item">
        <md-switch v-model="disabledOnValue" disabled>Disabled (On)</md-switch>
        <md-switch v-model="disabledOffValue" disabled>Disabled (Off)</md-switch>
        <p>Values: On={{ disabledOnValue }}, Off={{ disabledOffValue }}</p>
      </div>
    </section>

    <!-- Test 6: Required State -->
    <section class="test-section">
      <h2>6. Required State</h2>
      <div class="test-item">
        <md-switch v-model="requiredValue" required>Required Field</md-switch>
        <p>Value: {{ requiredValue }}</p>
      </div>
    </section>

    <!-- Test 7: Without Label (No Slot) -->
    <section class="test-section">
      <h2>7. Without Label (No Slot)</h2>
      <div class="test-item">
        <md-switch v-model="noLabelValue"></md-switch>
        <span style="margin-left: 16px;">Value: {{ noLabelValue }}</span>
      </div>
    </section>

    <!-- Test 8: Theme Styling (Primary) -->
    <section class="test-section">
      <h2>8. Theme Styling</h2>
      <div class="test-item">
        <md-switch v-model="themeValue" class="md-primary">Primary Theme</md-switch>
        <md-switch v-model="themeValue2" class="md-accent">Accent Theme (Default)</md-switch>
        <p>Values: Primary={{ themeValue }}, Accent={{ themeValue2 }}</p>
      </div>
    </section>

    <!-- Test 9: Ripple Effect Test -->
    <section class="test-section">
      <h2>9. Ripple Effect (Click to Test)</h2>
      <div class="test-item">
        <md-switch v-model="rippleTest">Click for Ripple</md-switch>
        <p>Value: {{ rippleTest }}</p>
      </div>
    </section>

    <!-- Test 10: Indeterminate State -->
    <section class="test-section">
      <h2>10. Indeterminate State</h2>
      <div class="test-item">
        <md-switch v-model="indeterminateValue" :indeterminate="true">Indeterminate</md-switch>
        <p>Value: {{ indeterminateValue }}</p>
      </div>
    </section>

    <!-- Test 11: Name Attribute (Form Integration) -->
    <section class="test-section">
      <h2>11. Form Integration (Name Attribute)</h2>
      <div class="test-item">
        <form @submit.prevent="handleSubmit">
          <md-switch v-model="formValue" name="agreement">I agree to terms</md-switch>
          <button type="submit" style="margin-left: 16px;">Submit</button>
        </form>
        <p>Form Value: {{ formValue }}</p>
        <p v-if="formSubmitted">Submitted: {{ formSubmittedValue }}</p>
      </div>
    </section>

    <!-- Test 12: Multiple Switches with Different IDs -->
    <section class="test-section">
      <h2>12. ID Attribute Test</h2>
      <div class="test-item">
        <md-switch v-model="id1Value" id="switch-1">Switch 1</md-switch>
        <md-switch v-model="id2Value" id="switch-2">Switch 2</md-switch>
        <p>Values: Switch1={{ id1Value }}, Switch2={{ id2Value }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TestSwitch',
  data() {
    return {
      // Test 1: Boolean
      booleanValue: false,

      // Test 2: Array
      arrayValue: [],

      // Test 3: Single Select
      singleValue: null,

      // Test 4: Custom Values
      customValue: 'no',

      // Test 5: Disabled
      disabledOnValue: true,
      disabledOffValue: false,

      // Test 6: Required
      requiredValue: false,

      // Test 7: No Label
      noLabelValue: false,

      // Test 8: Theme
      themeValue: false,
      themeValue2: false,

      // Test 9: Ripple
      rippleTest: false,

      // Test 10: Indeterminate
      indeterminateValue: false,

      // Test 11: Form
      formValue: false,
      formSubmitted: false,
      formSubmittedValue: null,

      // Test 12: IDs
      id1Value: false,
      id2Value: true
    }
  },
  methods: {
    handleSubmit() {
      this.formSubmitted = true
      this.formSubmittedValue = this.formValue
      console.log('Form submitted with value:', this.formValue)
      setTimeout(() => {
        this.formSubmitted = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.test-switch-container {
  padding: 24px;
  max-width: 800px;
  margin: 0 auto;
}

h1 {
  margin-bottom: 32px;
  color: #333;
}

.test-section {
  margin-bottom: 32px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 4px;
}

.test-section h2 {
  margin-top: 0;
  margin-bottom: 16px;
  color: #666;
  font-size: 18px;
}

.test-item {
  background: white;
  padding: 16px;
  border-radius: 4px;
}

.test-item p {
  margin: 8px 0 0 0;
  color: #666;
  font-family: monospace;
}

button {
  padding: 8px 16px;
  background: #448aff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #2979ff;
}
</style>
