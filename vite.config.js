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
		lib: {
			// the entry file that is loaded whenever someone imports
			// your plugin in their app
			entry: path.resolve(__dirname, "src/index.js"),

			// the exposed global variable
			// is required when formats includes 'umd' or 'iife'
			name: "VueMaterials",

			// the proper extensions will be added, ie:
			// name.js (es module)
			// name.umd.cjs) (common js module)
			// default fileName is the name option of package.json
			fileName: "vue-materials",
		},
		rollupOptions: {
			// make sure to externalize deps that shouldn't be bundled
			// into your library
			external: ["vue"],
			output: {
				// Provide global variables to use in the UMD build
				// for externalized deps
				globals: {
					vue: "Vue",
				},
				// preserveModules: true,
				dir: "dist",
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
		outDir: "dist",
		emptyOutDir: false, // Don't clean the dist directory by default
		cssCodeSplit: false, // Disable CSS code splitting
	},
})
