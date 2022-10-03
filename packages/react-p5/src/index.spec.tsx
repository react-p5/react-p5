// @vitest-environment jsdom

import { it, expect, describe, beforeEach, vi } from "vitest"
import ReactDOMServer from "react-dom/server"
import { render } from "@testing-library/react"
import Sketch from "./index"
import { SketchProps } from "../@types"
import P5 from "p5"

const reactP5TestId = "react-p5"

let canvas: P5.Renderer | null = null
let setup: SketchProps["setup"]

beforeEach(() => {
  setup = (p, canvasParentRef) => {
    canvas = p.createCanvas(500, 500).parent(canvasParentRef)
    p.background(0)
  }
})

describe("react-p5", () => {
  it("Should export globally p5 instance", () => {
    expect(window.p5).toBeDefined()
  })

  // it("Should render correct in SSR mode when window is not-defined", () => {
  //   const clonedWindow = global.window
  //   delete global.window

  //   const StringComponent = ReactDOMServer.renderToString(
  //     <Sketch setup={setup} />
  //   )
  //   const StaticComponent = ReactDOMServer.renderToStaticMarkup(
  //     <Sketch setup={setup} />
  //   )

  //   global.window = clonedWindow

  //   expect(StringComponent).toMatch(
  //     `<div class="${reactP5TestId}" data-testid="${reactP5TestId}" data-reactroot=""></div`
  //   )
  //   expect(StaticComponent).toMatch(
  //     `<div class="${reactP5TestId}" data-testid="${reactP5TestId}"></div`
  //   )

  //   expect(canvas).toBeNull()
  // })

  it("Should render correct in SSR mode when window is defined", () => {
    const StringComponent = ReactDOMServer.renderToString(
      <Sketch setup={setup} />
    )
    const StaticComponent = ReactDOMServer.renderToStaticMarkup(
      <Sketch setup={setup} />
    )

    expect(StringComponent).toMatch(
      `<div class="${reactP5TestId}" data-testid="${reactP5TestId}" data-reactroot=""></div`
    )
    expect(StaticComponent).toMatch(
      `<div class="${reactP5TestId}" data-testid="${reactP5TestId}"></div`
    )
    expect(canvas).toBeNull()
  })

  it("Should call setup function on component mount with corresponding arguments", () => {
    const setup = vi.fn()
    render(<Sketch setup={setup} />)

    expect(setup).toBeCalledTimes(1)
    expect(setup).toBeCalledWith(expect.any(Object), expect.any(Element))
  })

  it("Should render MockComponent without errors", () => {
    const { getByTestId } = render(<Sketch setup={setup} />)

    expect(getByTestId(reactP5TestId)).toBeDefined()
    expect(canvas).not.toBeNull()
  })
})
