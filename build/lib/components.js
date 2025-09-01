import { build } from "vite"
import { resolve } from "path"
import { readdirSync, statSync, existsSync, mkdirSync } from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, "../..")
const componentsSrcDir = resolve(rootDir, "src/components")
const componentsDistDir = resolve(rootDir, "dist/components")

console.log("🧩 Starting component generation...")
console.log("  Components source dir:", componentsSrcDir)
console.log("  Components dist dir:", componentsDistDir)

function getDirectories(src) {
	console.log("  Checking for component directories in:", src)
	if (!existsSync(src)) {
		console.log("  Source directory does not exist")
		return []
	}

	const dirs = readdirSync(src).filter((file) => {
		return statSync(resolve(src, file)).isDirectory()
	})
	console.log("  Found component directories:", dirs)
	return dirs
}

function getSharableComponents() {
	const componentList = getDirectories(componentsSrcDir)
	const sharableComponents = []

	for (const component of componentList) {
		const componentIndexPath = resolve(componentsSrcDir, component, "index.js")
		if (existsSync(componentIndexPath)) {
			sharableComponents.push(component)
		}
	}

	console.log("  Sharable components with index.js:", sharableComponents)
	return sharableComponents
}

export default async function generateComponents() {
	console.log("🧩 Generating individual components...")

	// Ensure components dist directory exists
	if (!existsSync(componentsDistDir)) {
		console.log("  Creating components dist directory...")
		mkdirSync(componentsDistDir, { recursive: true })
	}

	const sharableComponents = getSharableComponents()

	if (sharableComponents.length === 0) {
		console.log("⚠️  No sharable components found")
		return
	}

	console.log(
		`  📦 Building ${sharableComponents.length} individual components...`
	)

	for (const component of sharableComponents) {
		const componentDir = resolve(componentsDistDir, component)
		if (!existsSync(componentDir)) {
			mkdirSync(componentDir, { recursive: true })
		}

		try {
			console.log(`  🔨 Building ${component}...`)

			// Build individual component
			await build({
				configFile: resolve(rootDir, "vite.component.config.js"),
				build: {
					outDir: componentDir,
					emptyOutDir: false, // Don't clean the component directory
					lib: {
						entry: resolve(componentsSrcDir, component, "index.js"),
						name: `VueMaterials${component}`,
						fileName: "index",
						formats: ["es", "umd"],
					},
					rollupOptions: {
						external: ["vue"],
						output: {
							globals: {
								vue: "Vue",
							},
						},
					},
					cssCodeSplit: false, // Disable CSS code splitting
				},
			})

			console.log(`  ✅ Built ${component}`)
		} catch (error) {
			console.error(`  ❌ Failed to build ${component}:`, error.message)
		}
	}

	// Build components index
	try {
		console.log("  🔨 Building components index...")
		await build({
			configFile: resolve(rootDir, "vite.component.config.js"),
			build: {
				outDir: componentsDistDir,
				emptyOutDir: false, // Don't clean the components directory
				lib: {
					entry: resolve(componentsSrcDir, "index.js"),
					name: "VueMaterialsComponents",
					fileName: "index",
					formats: ["es", "umd"],
				},
				rollupOptions: {
					external: ["vue"],
					output: {
						globals: {
							vue: "Vue",
						},
					},
				},
				cssCodeSplit: true,
			},
		})

		console.log("  ✅ Built components index")
	} catch (error) {
		console.error("  ❌ Failed to build components index:", error.message)
	}

	console.log("✅ Component generation completed")
}

// If this script is run directly, execute the function
if (import.meta.url === `file://${process.argv[1]}`) {
	generateComponents().catch(console.error)
}
