import { SketchProps as SketchCoreProps } from "@react-p5/core"
import { RENDERER } from "p5"
import { ColorValue } from "@react-p5/core"
import { Dispatch, FC, SetStateAction } from "react"
export interface UIValue {
  label: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
  max?: number
}

export interface UIProps {
  values?: UIValue[]
  noLoop?: boolean
  title?: string
}

export interface SketchProps extends SketchCoreProps {
  suffix?: string | number
  padding?: number[]
  width?: number
  height?: number
  dimensions?: number[]
  renderer?: RENDERER
  background?: ColorValue
  pixelDensity?: number
  seed?: number
  renderSVG?: boolean
  enableUI?: boolean
  UIValues?: UIValue[]
  noLoop?: boolean
  sketchTitle?: string
}

declare const Sketch: FC<SketchProps>

export default Sketch
