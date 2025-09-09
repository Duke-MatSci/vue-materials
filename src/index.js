import material from "./material"
import * as MdComponents from "./components"
import pkg from "../package.json" assert { type: "json" }

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

VueMaterial.version = pkg.version || "0.0.0"

export default VueMaterial

export * from "./components"
