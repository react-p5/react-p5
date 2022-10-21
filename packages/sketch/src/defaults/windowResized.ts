import type { Color } from "p5"
import type { ColorValue, P5 } from "@react-p5/core"

interface WindowResized {
  p5: P5
  width?: number
  height?: number
  dimensions?: number[]
  padding?: number[]
  background?: ColorValue
  seed?: number
  noLoop?: boolean
}

const windowResized = ({
  p5,
  width,
  height,
  dimensions,
  padding,
  background,
  seed,
  noLoop,
}: WindowResized) => {
  const usedWidth = dimensions ? dimensions[0] : width ? width : p5.windowWidth
  const usedHeight = dimensions
    ? dimensions[1]
    : height
    ? height
    : p5.windowHeight
  const aspectRatio = usedWidth / usedHeight
  const windowRatio = p5.windowWidth / p5.windowHeight
  const paddingWidth = padding && padding.length > 0 ? padding[0] * 2 : 0
  const paddingHeight =
    padding && padding.length === 2
      ? padding[1] * 2
      : padding && padding.length === 1
      ? padding[0] * 2
      : 0
  const maxWidth = Math.round(p5.windowWidth - paddingWidth)
  const maxHeight = Math.round(p5.windowHeight - paddingHeight)

  seed && p5.randomSeed(seed)
  seed && p5.noiseSeed(seed)

  if (usedWidth > p5.windowWidth || usedHeight > p5.windowHeight) {
    if (aspectRatio > windowRatio) {
      const newHeight = Math.round(maxWidth / aspectRatio)
      p5.resizeCanvas(maxWidth, newHeight)
    } else {
      const newWidth = Math.round(maxHeight * aspectRatio)
      p5.resizeCanvas(newWidth, maxHeight)
    }
  } else {
    p5.resizeCanvas(usedWidth, usedHeight)
  }

  background && p5.background(background as unknown as Color)

  noLoop ? (p5.loop(), p5.noLoop()) : p5.loop()
}

export default windowResized
