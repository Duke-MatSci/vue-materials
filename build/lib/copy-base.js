import { resolve } from "path"
import {
	readdirSync,
	statSync,
	existsSync,
	writeFileSync,
	mkdirSync,
	copyFileSync,
} from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, "../..")
const baseSrcDir = resolve(rootDir, "src/base")
const baseDistDir = resolve(rootDir, "dist/base")
const cssSrcDir = resolve(rootDir, "src/css")
const cssDistDir = resolve(rootDir, "dist")

function copyThemeFiles(source, destination) {
	if (!existsSync(source)) {
		return
	}

	const files = readdirSync(source).filter((file) => {
		return (
			!statSync(resolve(source, file)).isDirectory() && file.endsWith(".scss")
		)
	})

	for (const file of files) {
		const srcPath = resolve(source, file)
		const destPath = resolve(destination, file)

		try {
			copyFileSync(srcPath, destPath)
			console.log(`  ✅ Copied ${file}`)
		} catch (error) {
			console.error(`  ❌ Failed to copy ${file}:`, error.message)
		}
	}
}

function copyCssFiles(source, destination) {
	if (!existsSync(source)) {
		return
	}

	// Copy all files and subdirectories recursively to the root dist directory
	function copyRecursive(src, dest) {
		const items = readdirSync(src)

		for (const item of items) {
			const srcPath = resolve(src, item)
			const destPath = resolve(dest, item)

			if (statSync(srcPath).isDirectory()) {
				// Recursively copy subdirectories
				copyRecursive(srcPath, destPath)
			} else {
				// Copy files directly to dist root
				try {
					copyFileSync(srcPath, destPath)
					console.log(`  ✅ Copied CSS: ${item}`)
				} catch (error) {
					console.error(`  ❌ Failed to copy CSS ${item}:`, error.message)
				}
			}
		}
	}

	copyRecursive(source, destination)
}

export default async function copyBaseFiles() {
	// Ensure base dist directory exists
	if (!existsSync(baseDistDir)) {
		mkdirSync(baseDistDir, { recursive: true })
	}

	// Copy base theme files
	copyThemeFiles(baseSrcDir, baseDistDir)

	// Copy CSS files directly to dist root
	console.log("  📁 Copying CSS files...")
	copyCssFiles(cssSrcDir, cssDistDir)

	// Copy component theme files to their respective directories
	const componentsSrcDir = resolve(rootDir, "src/components")
	const componentsDistDir = resolve(rootDir, "dist/components")

	if (existsSync(componentsSrcDir)) {
		const componentDirs = readdirSync(componentsSrcDir).filter((file) => {
			return statSync(resolve(componentsSrcDir, file)).isDirectory()
		})

		for (const component of componentDirs) {
			const componentSrcDir = resolve(componentsSrcDir, component)
			const componentDistDir = resolve(componentsDistDir, component)

			if (existsSync(componentDistDir)) {
				copyThemeFiles(componentSrcDir, componentDistDir)
			}
		}
	}
}
