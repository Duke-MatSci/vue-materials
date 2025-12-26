<script>
import { h, reactive, computed, onMounted } from "vue"

export default {
	name: "MdCardMediaCover",
	props: {
		mdTextScrim: Boolean,
		mdSolid: Boolean,
	},
	setup(props, { slots }) {
		const backdropBackground = reactive({})

		const coverClasses = computed(() => {
			return {
				"md-text-scrim": props.mdTextScrim,
				"md-solid": props.mdSolid,
			}
		})

		const coverStyles = computed(() => {
			return {
				background: backdropBackground,
			}
		})

		const applyScrimColor = (darkness) => {
			backdropBackground.background = `linear-gradient(to bottom, rgba(0, 0, 0, 0) 20%, rgba(0, 0, 0, ${
				darkness / 2
			}) 66%, rgba(0, 0, 0, ${darkness}) 100%)`
		}

		const applySolidColor = (darkness) => {
			// This will be handled by CSS classes instead of direct DOM manipulation
		}

		const getImageLightness = (image, onLoad, onError) => {
			let canvas = document.createElement("canvas")

			image.crossOrigin = "Anonymous"

			image.onload = function () {
				let colorSum = 0
				let ctx
				let imageData
				let imageMetadata
				let r
				let g
				let b
				let average

				canvas.width = this.width
				canvas.height = this.height
				ctx = canvas.getContext("2d")

				ctx.drawImage(this, 0, 0)

				imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
				imageMetadata = imageData.data

				for (let x = 0, len = imageMetadata.length; x < len; x += 4) {
					r = imageMetadata[x]
					g = imageMetadata[x + 1]
					b = imageMetadata[x + 2]

					average = Math.floor((r + g + b) / 3)
					colorSum += average
				}

				onLoad(Math.floor(colorSum / (this.width * this.height)))
			}

			image.onerror = onError
		}

		onMounted(() => {
			const applyBackground = (darkness = 0.6) => {
				if (props.mdTextScrim) {
					applyScrimColor(darkness)
				} else if (props.mdSolid) {
					applySolidColor(darkness)
				}
			}

			// Use a different approach to find the image
			setTimeout(() => {
				const cardElement = document.querySelector(".md-card-media-cover")
				if (cardElement) {
					let image = cardElement.querySelector("img")
					if (image && (props.mdTextScrim || props.mdSolid)) {
						getImageLightness(
							image,
							(lightness) => {
								let limit = 256
								let darkness =
									(Math.abs(limit - lightness) * 100) / limit + 15 / 100

								if (darkness >= 0.7) {
									darkness = 0.7
								}

								applyBackground(darkness)
							},
							applyBackground
						)
					}
				}
			}, 100)
		})

		return () => {
			const children = []

			// Add slot content
			if (slots && slots.default) {
				children.push(...slots.default())
			}

			// Add backdrop div if needed
			if (props.mdTextScrim) {
				children.push(
					h("div", {
						class: "md-card-backdrop",
						style: coverStyles.value,
					})
				)
			}

			return h(
				"div",
				{
					class: ["md-card-media-cover", coverClasses.value],
				},
				children
			)
		}
	},
}
</script>

<style lang="scss">
.md-card-media-cover {
	position: relative;
	color: #fff;

	&.md-solid {
		.md-card-area {
			background-color: rgba(#000, 0.54);
		}
	}

	&.md-text-scrim {
		.md-card-backdrop {
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1;
		}
	}

	.md-card-area {
		display: flex;
		flex-direction: column;
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		z-index: 2;
	}

	.md-card-header {
		display: flex;
		flex-direction: column;

		+ .md-card-actions {
			padding-top: 0;
		}
	}

	.md-subhead {
		opacity: 1;
	}

	.md-card-header,
	.md-card-actions {
		.md-button:not(.md-primary):not(.md-accent) {
			color: #fff !important;

			&.md-icon-button {
				.md-icon {
					color: #fff !important;
				}
			}
		}
	}
}
</style>
