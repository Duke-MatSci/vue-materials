import { build } from "vite"
import { resolve } from "path"
import { readdirSync, statSync, existsSync, mkdirSync } from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import generateThemes from "./themes.js"
import generateComponents from "./components.js"
import copyBaseFiles from "./copy-base.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, "../..")
const distDir = resolve(rootDir, "dist")

// Ensure dist directory exists
if (!existsSync(distDir)) {
	mkdirSync(distDir, { recursive: true })
}

async function buildLibrary() {
	console.log("🏗️  Building vue-materials library...")

	try {
		// Build main library first
		console.log("📦 Building main library...")
    await build({
      configFile: resolve(rootDir, "vite.config.js"),
      build: {
        outDir: distDir,
        emptyOutDir: false, // Don't clean the dist directory
        sourcemap: true,
				lib: {
					entry: resolve(rootDir, "src/index.js"),
					name: "VueMaterials",
					fileName: "vue-materials",
					formats: ["es", "umd"],
				},
				rollupOptions: {
					external: ["vue"],
					output: {
						globals: {
							vue: "Vue",
						},
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
        cssCodeSplit: false, // Disable CSS code splitting
      },
    })

		console.log("✅ Main library built successfully")

		// Generate themes directly into dist
		console.log("🎨 Generating themes...")
		await generateThemes()
		console.log("✅ Themes generated successfully")

		// Generate individual components directly into dist
		console.log("🧩 Generating individual components...")
		await generateComponents()
		console.log("✅ Individual components generated successfully")

		// Copy base files and CSS
		console.log("📁 Copying base files and CSS...")
		await copyBaseFiles()
		console.log("✅ Base files and CSS copied successfully")

		console.log("🎉 Vue Materials library built successfully! \\o/")
	} catch (error) {
		console.error("❌ Build failed:", error)
		process.exit(1)
	}
}

buildLibrary()
