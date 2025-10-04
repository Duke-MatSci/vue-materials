<template>
  <div class="test-radio-container">
    <h1>MdRadio Component Tests</h1>

    <!-- Test 1: Basic Radio Group -->
    <section class="test-section">
      <h2>1. Basic Radio Group</h2>
      <div class="test-item">
        <md-radio v-model="basicValue" value="option1">Option 1</md-radio>
        <md-radio v-model="basicValue" value="option2">Option 2</md-radio>
        <md-radio v-model="basicValue" value="option3">Option 3</md-radio>
        <p>Selected: {{ basicValue }}</p>
      </div>
    </section>

    <!-- Test 2: Default 'on' Value -->
    <section class="test-section">
      <h2>2. Default 'on' Value (No value prop)</h2>
      <div class="test-item">
        <md-radio v-model="defaultValue">Use Default Value</md-radio>
        <p>Value: {{ defaultValue === 'on' ? 'on (default)' : defaultValue || 'none' }}</p>
      </div>
    </section>

    <!-- Test 3: Numeric Values -->
    <section class="test-section">
      <h2>3. Numeric Values</h2>
      <div class="test-item">
        <md-radio v-model="numberValue" :value="1">One</md-radio>
        <md-radio v-model="numberValue" :value="2">Two</md-radio>
        <md-radio v-model="numberValue" :value="3">Three</md-radio>
        <p>Selected Number: {{ numberValue }}</p>
      </div>
    </section>

    <!-- Test 4: Boolean Values -->
    <section class="test-section">
      <h2>4. Boolean Values</h2>
      <div class="test-item">
        <md-radio v-model="boolValue" :value="true">True</md-radio>
        <md-radio v-model="boolValue" :value="false">False</md-radio>
        <p>Selected: {{ boolValue }}</p>
      </div>
    </section>

    <!-- Test 5: Disabled State -->
    <section class="test-section">
      <h2>5. Disabled State</h2>
      <div class="test-item">
        <md-radio v-model="disabledValue" value="enabled">Enabled</md-radio>
        <md-radio v-model="disabledValue" value="disabled" disabled>Disabled (Unchecked)</md-radio>
        <md-radio v-model="disabledValue2" value="disabled-checked" disabled>Disabled (Checked)</md-radio>
        <p>Values: {{ disabledValue }}, {{ disabledValue2 }}</p>
      </div>
    </section>

    <!-- Test 6: Required State -->
    <section class="test-section">
      <h2>6. Required State (See Asterisk)</h2>
      <div class="test-item">
        <md-radio v-model="requiredValue" value="yes" required>Required Option 1</md-radio>
        <md-radio v-model="requiredValue" value="no" required>Required Option 2</md-radio>
        <p>Selected: {{ requiredValue || 'none' }}</p>
      </div>
    </section>

    <!-- Test 7: Without Label (No Slot) -->
    <section class="test-section">
      <h2>7. Without Label (No Slot)</h2>
      <div class="test-item">
        <md-radio v-model="noLabelValue" value="a"></md-radio>
        <span style="margin-left: 8px; margin-right: 16px;">A</span>
        <md-radio v-model="noLabelValue" value="b"></md-radio>
        <span style="margin-left: 8px; margin-right: 16px;">B</span>
        <md-radio v-model="noLabelValue" value="c"></md-radio>
        <span style="margin-left: 8px;">C</span>
        <p>Selected: {{ noLabelValue || 'none' }}</p>
      </div>
    </section>

    <!-- Test 8: Theme Styling (Primary) -->
    <section class="test-section">
      <h2>8. Theme Styling</h2>
      <div class="test-item">
        <md-radio v-model="themeValue" value="accent" class="md-accent">Accent Theme (Default)</md-radio>
        <md-radio v-model="themeValue" value="primary" class="md-primary">Primary Theme</md-radio>
        <p>Selected Theme: {{ themeValue }}</p>
      </div>
    </section>

    <!-- Test 9: Ripple Effect Test -->
    <section class="test-section">
      <h2>9. Ripple Effect (Click to Test)</h2>
      <div class="test-item">
        <md-radio v-model="rippleTest" value="r1">Click for Ripple 1</md-radio>
        <md-radio v-model="rippleTest" value="r2">Click for Ripple 2</md-radio>
        <p>Selected: {{ rippleTest }}</p>
      </div>
    </section>

    <!-- Test 10: Name Attribute (Form Grouping) -->
    <section class="test-section">
      <h2>10. Name Attribute (Form Grouping)</h2>
      <div class="test-item">
        <form @submit.prevent="handleSubmit">
          <div style="margin-bottom: 16px;">
            <strong>Group 1 (name="group1"):</strong><br>
            <md-radio v-model="formValue1" name="group1" value="g1-a">Group 1 - A</md-radio>
            <md-radio v-model="formValue1" name="group1" value="g1-b">Group 1 - B</md-radio>
          </div>
          <div style="margin-bottom: 16px;">
            <strong>Group 2 (name="group2"):</strong><br>
            <md-radio v-model="formValue2" name="group2" value="g2-x">Group 2 - X</md-radio>
            <md-radio v-model="formValue2" name="group2" value="g2-y">Group 2 - Y</md-radio>
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>Group 1: {{ formValue1 || 'none' }}, Group 2: {{ formValue2 || 'none' }}</p>
        <p v-if="formSubmitted">Submitted: Group1={{ formSubmittedValue1 }}, Group2={{ formSubmittedValue2 }}</p>
      </div>
    </section>

    <!-- Test 11: Custom IDs -->
    <section class="test-section">
      <h2>11. Custom ID Attributes</h2>
      <div class="test-item">
        <md-radio v-model="idValue" id="custom-radio-1" value="c1">Custom ID 1</md-radio>
        <md-radio v-model="idValue" id="custom-radio-2" value="c2">Custom ID 2</md-radio>
        <p>Selected: {{ idValue }}</p>
        <p class="note">Check HTML inspector for custom IDs</p>
      </div>
    </section>

    <!-- Test 12: Object Values -->
    <section class="test-section">
      <h2>12. Object Values</h2>
      <div class="test-item">
        <md-radio v-model="objectValue" :value="option1Obj">Option Object 1</md-radio>
        <md-radio v-model="objectValue" :value="option2Obj">Option Object 2</md-radio>
        <p>Selected: {{ objectValue ? JSON.stringify(objectValue) : 'none' }}</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TestRadio',
  data() {
    return {
      // Test 1: Basic
      basicValue: 'option2',

      // Test 2: Default
      defaultValue: null,

      // Test 3: Numbers
      numberValue: 2,

      // Test 4: Booleans
      boolValue: true,

      // Test 5: Disabled
      disabledValue: 'enabled',
      disabledValue2: 'disabled-checked',

      // Test 6: Required
      requiredValue: null,

      // Test 7: No Label
      noLabelValue: 'b',

      // Test 8: Theme
      themeValue: 'accent',

      // Test 9: Ripple
      rippleTest: null,

      // Test 10: Form
      formValue1: null,
      formValue2: null,
      formSubmitted: false,
      formSubmittedValue1: null,
      formSubmittedValue2: null,

      // Test 11: IDs
      idValue: null,

      // Test 12: Objects
      option1Obj: { id: 1, name: 'Object 1' },
      option2Obj: { id: 2, name: 'Object 2' },
      objectValue: null
    }
  },
  methods: {
    handleSubmit() {
      this.formSubmitted = true
      this.formSubmittedValue1 = this.formValue1
      this.formSubmittedValue2 = this.formValue2
      console.log('Form submitted:', { group1: this.formValue1, group2: this.formValue2 })
      setTimeout(() => {
        this.formSubmitted = false
      }, 3000)
    }
  }
}
</script>

<style scoped>
.test-radio-container {
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

.test-item p.note {
  font-size: 12px;
  color: #999;
  font-style: italic;
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
