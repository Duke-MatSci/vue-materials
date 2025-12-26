import material from "../../material"
import MdCard from "./MdCard.vue"
import MdCardArea from "./MdCardArea/MdCardArea.vue"
import MdCardHeader from "./MdCardHeader/MdCardHeader.vue"
import MdCardHeaderText from "./MdCardHeader/MdCardHeaderText.vue"
import MdCardMedia from "./MdCardMedia/MdCardMedia.vue"
import MdCardMediaActions from "./MdCardMedia/MdCardMediaActions.vue"
import MdCardMediaCover from "./MdCardMedia/MdCardMediaCover.vue"
import MdCardContent from "./MdCardContent/MdCardContent.vue"
import MdCardExpand from "./MdCardExpand/MdCardExpand.vue"
import MdCardExpandTrigger from "./MdCardExpand/MdCardExpandTrigger.vue"
import MdCardExpandContent from "./MdCardExpand/MdCardExpandContent.vue"
import MdCardActions from "./MdCardActions/MdCardActions.vue"

export default (app) => {
	material(app)
	app.component(MdCard.name, MdCard)
	app.component(MdCardArea.name, MdCardArea)
	app.component(MdCardHeader.name, MdCardHeader)
	app.component(MdCardHeaderText.name, MdCardHeaderText)
	app.component(MdCardMedia.name, MdCardMedia)
	app.component(MdCardMediaActions.name, MdCardMediaActions)
	app.component(MdCardMediaCover.name, MdCardMediaCover)
	app.component(MdCardContent.name, MdCardContent)
	app.component(MdCardExpand.name, MdCardExpand)
	app.component(MdCardExpandTrigger.name, MdCardExpandTrigger)
	app.component(MdCardExpandContent.name, MdCardExpandContent)
	app.component(MdCardActions.name, MdCardActions)
}
