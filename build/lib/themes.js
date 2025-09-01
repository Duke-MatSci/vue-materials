import { resolve } from "path"
import { readdirSync, statSync, existsSync, copyFileSync, mkdirSync } from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, "../..")
const cssSrcDir = resolve(rootDir, "src/css")
const cssDistDir = resolve(rootDir, "dist")

console.log("🎨 Starting CSS theme copying...")
console.log("  CSS source dir:", cssSrcDir)
console.log("  CSS dist dir:", cssDistDir)

function copyCssFiles(source, destination) {
	if (!existsSync(source)) {
		console.log("  Source directory does not exist:", source)
		return
	}

	// Copy all files and subdirectories recursively
	function copyRecursive(src, dest) {
		const items = readdirSync(src)

		for (const item of items) {
			const srcPath = resolve(src, item)
			const destPath = resolve(dest, item)

			if (statSync(srcPath).isDirectory()) {
				// Create destination directory if it doesn't exist
				if (!existsSync(destPath)) {
					mkdirSync(destPath, { recursive: true })
				}
				// Recursively copy subdirectories
				copyRecursive(srcPath, destPath)
			} else {
				// Copy files directly
				try {
					copyFileSync(srcPath, destPath)
					console.log(`  ✅ Copied: ${item}`)
				} catch (error) {
					console.error(`  ❌ Failed to copy ${item}:`, error.message)
				}
			}
		}
	}

	copyRecursive(source, destination)
}

export default async function generateThemes() {
	console.log("🎨 Copying CSS themes and files...")

	// Copy all CSS files and subdirectories to dist
	copyCssFiles(cssSrcDir, cssDistDir)

	console.log("✅ CSS theme copying completed")
}

// If this script is run directly, execute the function
if (import.meta.url === `file://${process.argv[1]}`) {
	generateThemes().catch(console.error)
}
