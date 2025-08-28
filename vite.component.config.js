import path from "node:path"
import { defineConfig } from "vite"
import vuePlugin from "@vitejs/plugin-vue"

const base = "/"

export default defineConfig({
	base,
	plugins: [vuePlugin()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"~": path.resolve(__dirname, "src"),
			"@localconfig": path.resolve(__dirname, "src"),
		},
	},
	build: {
		// outDir will be set by the build script
		emptyOutDir: false, // Don't clean the output directory
	},
})
