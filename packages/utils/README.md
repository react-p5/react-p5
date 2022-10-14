![@react-p5/utils](./share-card.png)

[![npm/v](https://badgen.net/npm/v/@react-p5/utils)](https://npmjs.com/package/@react-p5/utils)
[![npm/dt](https://badgen.net/npm/dt/@react-p5/utils)](https://npmjs.com/package/@react-p5/utils)
[![stars](https://badgen.net/github/stars/react-p5/react-p5)](https://github.com/react-p5/react-p5)

## Installation

- npm

  ```bash
  npm i --save @react-p5/utils
  ```

- yarn

  ```bash
  yarn add @react-p5/utils
  ```

## Usage

#### createGrain/createOverlay

Both `createGrain` and `createOverlay` are meant to be added as the last line(s) of your `draw` function.

For example:

```ts
// sketch.tsx

import Sketch from "@react-p5/core"
import { createGrain, createOverlay } from "@react-p5/utils"
import type { FC } from "react"
import type { Graphics } from "p5"
import type { P5 } from "@react-p5/core"

interface YourProps {
  // any
}

let grain: Graphics
let overlay: Graphics

const YourComponent: FC<YourProps> = props => {
  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    grain = createGrain(p5)
    overlay = createOverlay(p5)
  }

  const draw = (p5: P5) => {
    p5.background(255)
    p5.ellipse(p5.width * 0.5, p5.height * 0.5, 100, 100)

    p5.image(overlay, 0, 0, p5.width, p5.height)
    p5.image(grain, 0, 0, p5.width, p5.height)
  }

  return <Sketch setup={setup} draw={draw} />
}
```

#### convertSeed

`convertSeed` will take a string as an input, convert it to a bite array, and then sum that array to generate a number you can pass as a seed value to `p5.randomSeed()` and/or `p5.noiseSeed()`. This is useful for creating more personalized seeds to reign in the chaos of `random()` and `noise()`

For example:

```ts
// sketch.tsx

import Sketch from "@react-p5/core"
import { convertSeed } from "@react-p5/utils"
import type { FC } from "react"
import type { Graphics } from "p5"
import type { P5 } from "@react-p5/core"

interface YourProps {
  // any
}

const seedPhrase = "p5 rules!"
const seed = convertSeed(seedPhrase)

const YourComponent: FC<YourProps> = props => {
  const setup = (p5: P5, canvasParentRef: Element) => {
    p5.createCanvas(400, 400).parent(canvasParentRef)
    p5.noiseSeed(seed)
    p5.randomSeed(seed)
  }

  const draw = (p5: P5) => {
    p5.background(255)

    // draw random array of ellipses at random vectors with random diameters
    Array.from({ length: Math.floor(p5.random(50)) }, () => {
      const x = p5.random(p5.width)
      const y = p5.random(p5.height)

      p5.ellipse(x, y, p5.random(25), p5.random(25))
    })
  }

  return <Sketch setup={setup} draw={draw} />
}
```

#### linearGradient

`linearGradient` leverages the canvas API to apply a gradient fill to any p5 shape.

For example:

```ts
// sketch.tsx

import Sketch from "@react-p5/core"
import { createGrain, linearGradient } from "@react-p5/utils"
import type { FC } from "react"
import type { Graphics } from "p5"
import type { P5 } from "@react-p5/core"
import type { ColorValue } from "@react-p5/utils"

interface YourProps {
  // any
}

const gradientArc = (
  p5: P5,
  x: number,
  y: number,
  w: number,
  h: number,
  start: number,
  stop: number,
  c1: ColorValue,
  c2: ColorValue
): void => {
  const lx1: number = x - w
  const ly1: number = y - h
  const lx2: number = x + w * 0.5
  const ly2: number = y + h * 0.5
  p5.push()
  p5.noStroke()
  linearGradient(p5, lx1, ly1, lx2, ly2, c1, c2)
  p5.arc(x, y, w, h, start, stop)
  p5.pop()
}

const YourComponent: FC<YourProps> = props => {
  const background: ColorValue = [255, 253, 252]
  let grain: Graphics
  let margin: number

  const setup = (p5: P5) => {
    grain = createGrain(p5)
  }

  const draw = (p5: P5) => {
    margin = p5.width * 0.1
    const cx: number = p5.width * 0.5
    const cy: number = p5.height * 0.5
    const scale: number = 120
    const ellipseUnit: number = p5.width * 0.175

    p5.background(background)

    Array.from({ length: 10 }, (_, i) => {
      const unit: number = p5.width * 0.05 * (10 - i)
      gradientArc(
        p5,
        cx,
        cy,
        unit,
        unit,
        p5.PI + p5.HALF_PI,
        p5.HALF_PI,
        [255, 0, 0],
        background
      )
    })
    Array.from({ length: 10 }, (_, i) => {
      const unit: number = p5.width * 0.05 * (10 - i)
      gradientArc(
        p5,
        cx,
        cy,
        unit,
        unit,
        p5.HALF_PI,
        p5.PI + p5.HALF_PI,
        background,
        0
      )
    })

    p5.push()
    p5.ellipseMode(p5.CORNERS)
    const e1x1 = margin
    const e1y1 = p5.height - margin
    const e1x2 = margin + ellipseUnit
    const e1y2 = p5.height - margin - ellipseUnit
    linearGradient(
      p5,
      e1x2 + scale,
      e1y2 - scale,
      e1x1,
      e1y1,
      [255, 0, 0],
      background
    )
    p5.stroke(20, 10)
    p5.strokeWeight(5)
    p5.ellipse(e1x1, e1y1, e1x2, e1y2)
    p5.pop()

    p5.push()
    p5.ellipseMode(p5.CORNERS)
    const e2x1 = p5.width - margin
    const e2y1 = margin
    const e2x2 = p5.width - margin - ellipseUnit
    const e2y2 = margin + ellipseUnit
    linearGradient(
      p5,
      e2x1,
      e2y1,
      e2x2 - scale * 1.3,
      e2y2 + scale * 1.3,
      background,
      0
    )
    p5.stroke(255, 0, 0, 10)
    p5.strokeWeight(5)
    p5.ellipse(e2x1, e2y1, e2x2, e2y2)
    p5.pop()

    p5.image(grain, 0, 0, p5.width, p5.height)
  }

  return <Sketch setup={setup} draw={draw} />
}
```
