import SketchCore from "@react-p5/core"
import {
  setup as setupDefaults,
  windowResized as windowResizedDefaults,
  keyPressed as keyPressedDefaults,
} from "src/defaults"
import { FC, useRef } from "react"
import type { Draw, KeyPressed, Setup, WindowResized } from "@react-p5/core"
import type { SketchProps } from "types"
import { useGetOs } from "src/hooks"
import { Box } from "@chakra-ui/react"
import UI from "./UI"

const Sketch: FC<SketchProps> = ({
  setup,
  draw,
  windowResized,
  keyPressed,
  mouseClicked,
  suffix,
  padding,
  width,
  height,
  dimensions,
  renderer,
  background,
  pixelDensity,
  seed,
  renderSVG,
  enableUI,
  UIValues,
  noLoop = false,
  sketchTitle,
  ...rest
}) => {
  const os = useGetOs()
  const uiRef = useRef<HTMLDivElement>(null)

  const defaultSetup: Setup = (p5, canvasParentRef) => {
    setupDefaults({
      p5,
      canvasParentRef,
      width,
      height,
      dimensions,
      background,
      padding,
      renderer,
      renderSVG,
      seed,
      pixelDensity,
    })
    setup && setup(p5, canvasParentRef)
  }

  const defaultDraw: Draw = p5 => {
    if (typeof seed !== "undefined") {
      p5.noiseSeed(seed)
      p5.randomSeed(seed)
    }

    noLoop && p5.noLoop()

    draw && draw(p5)
  }

  const defaultWindowResized: WindowResized = p5 => {
    windowResizedDefaults({
      p5,
      width,
      height,
      dimensions,
      padding,
      background,
      seed,
      noLoop,
    })

    windowResized && windowResized(p5)
  }

  const date = new Date().toLocaleString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  })
  const fileName = date + (suffix ? `-${suffix}` : "")

  const defaultKeyPressed: KeyPressed = (p5, event) => {
    keyPressedDefaults({
      p5,
      event,
      os,
      fileName,
      seed,
      width,
      dimensions,
      background,
      renderSVG,
      noLoop,
    })

    keyPressed && keyPressed(p5, event)
  }

  return (
    <>
      {UIValues?.length && (
        <UI ref={uiRef} values={UIValues} noLoop={noLoop} title={sketchTitle} />
      )}
      <Box
        css={{
          ".canvas-wrapper": {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
            minHeight: "100vh",
          },
          ".p5Canvas": {
            boxShadow: "1px 3px 6px -1px rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <SketchCore
          className="canvas-wrapper"
          setup={defaultSetup}
          draw={defaultDraw}
          windowResized={defaultWindowResized}
          keyPressed={defaultKeyPressed}
          noLoop={noLoop}
          {...rest}
        />
      </Box>
    </>
  )
}

export default Sketch
