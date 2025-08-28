import { resolve } from "path"
import {
	readdirSync,
	statSync,
	existsSync,
	writeFileSync,
	mkdirSync,
	readFileSync,
} from "fs"
import { fileURLToPath } from "url"
import { dirname } from "path"
import sass from "sass"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const rootDir = resolve(__dirname, "../..")
const themeSrcDir = resolve(rootDir, "src/theme/prebuilt")
const themeDistDir = resolve(rootDir, "dist/theme")

console.log("🎨 Starting theme generation...")
console.log("  Theme source dir:", themeSrcDir)
console.log("  Theme dist dir:", themeDistDir)

function getThemeFiles(source) {
	console.log("  Checking for theme files in:", source)
	if (!existsSync(source)) {
		console.log("  Source directory does not exist")
		return []
	}

	const files = readdirSync(source).filter((file) => {
		return (
			!statSync(resolve(source, file)).isDirectory() && file.endsWith(".scss")
		)
	})
	console.log("  Found theme files:", files)
	return files
}

export default async function generateThemes() {
	console.log("🎨 Generating themes...")

	// Ensure theme dist directory exists
	if (!existsSync(themeDistDir)) {
		console.log("  Creating theme dist directory...")
		mkdirSync(themeDistDir, { recursive: true })
	}

	const themeFiles = getThemeFiles(themeSrcDir)

	if (themeFiles.length === 0) {
		console.log("⚠️  No theme files found in src/theme/prebuilt")
		return
	}

	console.log(`  Processing ${themeFiles.length} theme files...`)

	for (const theme of themeFiles) {
		const themePath = resolve(themeSrcDir, theme)
		const themeContents = readFileSync(themePath, "utf8")
		const cssFileName = theme.replace(".scss", ".css")
		const cssFilePath = resolve(themeDistDir, cssFileName)

		try {
			const result = await sass.compileAsync(themePath, {
				style: "compressed",
				loadPaths: [themeSrcDir],
			})

			writeFileSync(cssFilePath, result.css, "utf8")
			console.log(`  ✅ Generated ${cssFileName}`)
		} catch (error) {
			console.error(`  ❌ Failed to compile ${theme}:`, error.message)
		}
	}

	// Also copy SCSS theme files for source access
	console.log("  Copying SCSS theme files...")
	const allThemeFiles = getThemeFiles(resolve(rootDir, "src/theme"))
	for (const theme of allThemeFiles) {
		const srcPath = resolve(rootDir, "src/theme", theme)
		const destPath = resolve(themeDistDir, theme)

		try {
			const content = readFileSync(srcPath, "utf8")
			writeFileSync(destPath, content, "utf8")
			console.log(`  ✅ Copied ${theme}`)
		} catch (error) {
			console.error(`  ❌ Failed to copy ${theme}:`, error.message)
		}
	}

	console.log("✅ Theme generation completed")
}

// If this script is run directly, execute the function
if (import.meta.url === `file://${process.argv[1]}`) {
	generateThemes().catch(console.error)
}
