<template>
  <div class="test-chips-container">
    <h1>MdChips Component Tests</h1>

    <!-- Test 1: Basic Chips -->
    <section class="test-section">
      <h2>1. Basic Chips</h2>
      <div class="test-item">
        <md-chips v-model="basicChips" md-placeholder="Add a tag...">
          <label>Basic Tags</label>
        </md-chips>
        <p>Current tags: {{ JSON.stringify(basicChips) }}</p>
      </div>
    </section>

    <!-- Test 2: Static Chips (Read-only) -->
    <section class="test-section">
      <h2>2. Static Chips (Read-only)</h2>
      <div class="test-item">
        <md-chips v-model="staticChips" md-static>
          <label>Static Tags (Can't Edit)</label>
        </md-chips>
        <p>These chips cannot be modified</p>
      </div>
    </section>

    <!-- Test 3: Chip Limit -->
    <section class="test-section">
      <h2>3. Chip Limit (Max 3)</h2>
      <div class="test-item">
        <md-chips v-model="limitedChips" md-placeholder="Max 3 tags" :md-limit="3">
          <label>Limited Tags</label>
        </md-chips>
        <p>Count: {{ limitedChips.length }} / 3</p>
        <p>Input hidden when limit reached</p>
      </div>
    </section>

    <!-- Test 4: Check Duplicates -->
    <section class="test-section">
      <h2>4. Duplicate Detection</h2>
      <div class="test-item">
        <md-chips v-model="duplicateChips" md-placeholder="Try duplicates" md-check-duplicated>
          <label>Chips with Duplicate Check</label>
        </md-chips>
        <p>Try adding a duplicate tag - it will be highlighted</p>
      </div>
    </section>

    <!-- Test 5: Auto Insert on Blur -->
    <section class="test-section">
      <h2>5. Auto Insert on Blur</h2>
      <div class="test-item">
        <md-chips v-model="autoInsertChips" md-placeholder="Tab or click away" md-auto-insert>
          <label>Auto Insert Tags</label>
        </md-chips>
        <p>Tags are automatically inserted when you blur the input</p>
      </div>
    </section>

    <!-- Test 6: Format Function (Uppercase) -->
    <section class="test-section">
      <h2>6. Format Function (Uppercase)</h2>
      <div class="test-item">
        <md-chips v-model="formattedChips" md-placeholder="Type lowercase" :md-format="uppercaseFormat">
          <label>Formatted Tags</label>
        </md-chips>
        <p>All tags converted to uppercase: {{ JSON.stringify(formattedChips) }}</p>
      </div>
    </section>

    <!-- Test 7: Custom Scoped Slot -->
    <section class="test-section">
      <h2>7. Custom Chip Rendering</h2>
      <div class="test-item">
        <md-chips v-model="customChips" md-placeholder="Add custom tags">
          <label>Custom Styled Tags</label>
          <template #md-chip="{ chip }">
            <strong>🏷️ {{ chip }}</strong>
          </template>
        </md-chips>
        <p>Chips use custom rendering with emoji and bold text</p>
      </div>
    </section>

    <!-- Test 8: Event Handlers -->
    <section class="test-section">
      <h2>8. Event Handlers</h2>
      <div class="test-item">
        <md-chips
          v-model="eventChips"
          md-placeholder="Add/remove tags"
          @md-insert="onInsert"
          @md-delete="onDelete"
          @md-click="onClick">
          <label>Event Test Tags</label>
        </md-chips>
        <p>Last event: {{ lastEvent }}</p>
        <p>Event details: {{ eventDetails }}</p>
      </div>
    </section>

    <!-- Test 9: Email Input Type -->
    <section class="test-section">
      <h2>9. Email Input Type</h2>
      <div class="test-item">
        <md-chips v-model="emailChips" md-placeholder="Add emails" md-input-type="email">
          <label>Email Tags</label>
        </md-chips>
        <p>Input validates email format</p>
      </div>
    </section>

    <!-- Test 10: Themed Chips (Primary) -->
    <section class="test-section">
      <h2>10. Primary Theme</h2>
      <div class="test-item">
        <md-chips v-model="primaryChips" md-placeholder="Add tags" class="md-primary">
          <label>Primary Theme Tags</label>
        </md-chips>
      </div>
    </section>

    <!-- Test 11: Themed Chips (Accent) -->
    <section class="test-section">
      <h2>11. Accent Theme</h2>
      <div class="test-item">
        <md-chips v-model="accentChips" md-placeholder="Add tags" class="md-accent">
          <label>Accent Theme Tags</label>
        </md-chips>
      </div>
    </section>

    <!-- Test 12: Backspace to Delete -->
    <section class="test-section">
      <h2>12. Backspace to Delete</h2>
      <div class="test-item">
        <md-chips v-model="backspaceChips" md-placeholder="Try backspace when empty">
          <label>Backspace Test</label>
        </md-chips>
        <p>Press backspace in empty input to delete last chip</p>
      </div>
    </section>

    <!-- Test 13: Individual Chip Props -->
    <section class="test-section">
      <h2>13. Individual Chip Components</h2>
      <div class="test-item">
        <div style="padding: 16px;">
          <md-chip>Static Chip</md-chip>
          <md-chip md-deletable @md-delete="() => console.log('Deleted!')">Deletable Chip</md-chip>
          <md-chip md-clickable @click="() => console.log('Clicked!')">Clickable Chip</md-chip>
          <md-chip md-deletable md-clickable>Both</md-chip>
          <md-chip md-disabled>Disabled Chip</md-chip>
          <md-chip md-duplicated>Duplicated Style</md-chip>
        </div>
        <p>Individual chips with different states</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'TestChips',
  data() {
    return {
      // Test 1: Basic
      basicChips: ['Vue', 'React', 'Angular'],

      // Test 2: Static
      staticChips: ['Read', 'Only', 'Tags'],

      // Test 3: Limited
      limitedChips: ['One', 'Two'],

      // Test 4: Duplicates
      duplicateChips: ['Test', 'Duplicate'],

      // Test 5: Auto insert
      autoInsertChips: ['Auto', 'Insert'],

      // Test 6: Format
      formattedChips: ['FORMATTED', 'UPPERCASE'],

      // Test 7: Custom
      customChips: ['Custom', 'Rendering'],

      // Test 8: Events
      eventChips: ['Event', 'Test'],
      lastEvent: 'None',
      eventDetails: '',

      // Test 9: Email
      emailChips: ['test@example.com'],

      // Test 10-11: Themed
      primaryChips: ['Primary', 'Theme'],
      accentChips: ['Accent', 'Theme'],

      // Test 12: Backspace
      backspaceChips: ['Press', 'Backspace'],
    }
  },
  methods: {
    uppercaseFormat(value) {
      return value ? value.toUpperCase() : value
    },
    onInsert(chip) {
      this.lastEvent = 'md-insert'
      this.eventDetails = `Inserted: ${chip}`
      console.log('Chip inserted:', chip)
    },
    onDelete(chip, index) {
      this.lastEvent = 'md-delete'
      this.eventDetails = `Deleted: ${chip} at index ${index}`
      console.log('Chip deleted:', chip, index)
    },
    onClick(chip, index) {
      this.lastEvent = 'md-click'
      this.eventDetails = `Clicked: ${chip} at index ${index}`
      console.log('Chip clicked:', chip, index)
    }
  }
}
</script>

<style scoped>
.test-chips-container {
  padding: 24px;
  max-width: 900px;
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
  font-size: 13px;
}

.test-item p:first-of-type {
  margin-top: 16px;
}
</style>
