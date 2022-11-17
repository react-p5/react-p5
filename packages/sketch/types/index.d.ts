import {
  Setup,
  SketchProps as SketchCoreProps,
  ColorValue
} from "@react-p5/core"
import { RENDERER } from "p5"
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

export interface SketchProps extends Omit<SketchCoreProps, "setup"> {
  setup?: Setup
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
