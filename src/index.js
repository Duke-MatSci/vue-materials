import material from "./material"
import * as MdComponents from "./components"

const VueMaterial = {
	install(app) {
		material(app)

		Object.values(MdComponents).forEach((MdComponent) => {
			if (typeof MdComponent === "function") {
				MdComponent(app)
			}
		})
	},
}

VueMaterial.version = "__VERSION__"

export default VueMaterial

export * from "./components"
