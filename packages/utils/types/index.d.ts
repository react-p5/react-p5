// P5 interface contains all p5 utils, you can check all available methods and props at this url https://p5js.org/reference/
import type p5Types from "p5"

export interface P5 extends p5Types {
  constructor: { [key: string]: any }
  SVG?: any
}

declare global {
  interface Window {
    p5: P5
  }
}

export type ColorValue = string | number | number[]
