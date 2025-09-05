import path from "node:path"
import { defineConfig } from "vite"
import vuePlugin from "@vitejs/plugin-vue"

const base = "/"

export default defineConfig({
	base,
	plugins: [
		vuePlugin({
			// Ensure Vue plugin doesn't bundle Vue
			template: {
				compilerOptions: {
					// Disable custom element handling that might cause issues
					isCustomElement: () => false,
				},
			},
		}),
	],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"~": path.resolve(__dirname, "src"),
			"@localconfig": path.resolve(__dirname, "src"),
		},
	},
	css: {
		// Completely disable CSS compilation - we'll copy CSS files directly
		preprocessorOptions: {
			scss: false,
		},
		// Disable CSS modules
		modules: false,
		// Disable CSS injection
		inject: false,
		// Disable CSS code splitting
		codeSplit: false,
	},
	build: {
		// Library mode configuration
		lib: {
			entry: path.resolve(__dirname, "src/components/index.js"), // Default entry, will be overridden by build script
			name: "VueMaterialsComponent",
			fileName: "index",
		},
		rollupOptions: {
			// Make sure to externalize deps that shouldn't be bundled
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				globals: {
					vue: "Vue",
				},
			},
			// Disable CSS processing in rollup
			onwarn(warning, warn) {
				// Suppress CSS-related warnings
				if (
					warning.code === "CSS_CHUNK_LOAD_FAILED" ||
					warning.message.includes("CSS")
				) {
					return
				}
				warn(warning)
			},
		},
		// outDir will be set by the build script
		emptyOutDir: false, // Don't clean the output directory
		cssCodeSplit: false, // Disable CSS code splitting
	},
})
