import material from "./material"
import * as MdComponents from "./components/index.js"

const VueMaterial = {
	install(app) {
		material(app)
		Object.values(MdComponents).forEach((MdComponent) => {
			app.component(MdComponent.name, MdComponent)
		})
	},
}

VueMaterial.version = "__VERSION__"

export default VueMaterial

export * from "./components/index.js"
