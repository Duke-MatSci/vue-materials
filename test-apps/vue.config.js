const { defineConfig } = require("@vue/cli-service")
const path = require("path")

module.exports = defineConfig({
	transpileDependencies: true,
	devServer: {
		port: 8080,
		open: true,
	},
	configureWebpack: {
		resolve: {
			alias: {
				"@": require("path").resolve(__dirname, "src"),
				"vue-materials": require("path").resolve(
					__dirname,
					"dist/vue-materials.js"
				),
			},
		},
	},
})
