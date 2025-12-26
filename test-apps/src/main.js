import { createApp } from "vue"
import App from "./App.vue"

// Import Vue Materials components
import VueMaterials from "../../dist/vue-materials.js"
import "../../dist/vue-material.min.css"
// import "../../dist/style.css"
import "../../dist/theme/default.css"

const app = createApp(App)

// Use Vue Materials
app.use(VueMaterials)

app.mount("#app")
