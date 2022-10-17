![@react-p5/core](./share-card.png)

[![npm/v](https://badgen.net/npm/v/@react-p5/core)](https://npmjs.com/package/@react-p5/core)
[![npm/dt](https://badgen.net/npm/dt/@react-p5/core)](https://npmjs.com/package/@react-p5/core)
[![stars](https://badgen.net/github/stars/react-p5/react-p5)](https://github.com/react-p5/react-p5)

## First and Foremost

This package is a fork of [Gherciu Gheorghe](https://github.com/Gherciu)'s [react-p5](https://github.com/Gherciu/react-p5) library. Even this documentation is nearly 1:1 with the original package, just with updated imports.

## So why fork the project?

My reasoning behind forking the original was two-fold. One, it has gone largely untouched sinced 2020 and I wanted to upgrade the project to React 18, to use functional components instead of class components; I wanted to rewrite it in TypeScript, and implement modern build tools to improve the DX of this project.

The second reason was that I have a long term goal that relies on this core package. Over the past several months, I've been building up a [p5 starter](https://github.com/xanderjl/p5-starter). There's a very handy wrapper I've written around the core `<Sketch />` component from the original `react-p5` package that mimics the functionality of [Matt DesLaurier](https://github.com/mattdesl)'s [canvas-sketch](https://github.com/mattdesl/canvas-sketch). I want to create a few packages under the `@react-p5` organization that will enable artists to fold these patterns into their React sites, regardless of the meta framework they prefer.

The first three I have planned are this `core` package, `sketch`, and `utils`. I intend on fleshing out my ideas further in the [roadmap](https://github.com/orgs/react-p5/projects/1?query=is%3Aopen+sort%3Aupdated-desc) in the coming months.

## Installation

- npm

  ```bash
  npm i --save @react-p5/core
  ```

- yarn

  ```bash
  yarn add @react-p5/core
  ```

## Usage

#### JavaScript

```js
import React from "react"
import Sketch from "@react-p5/core"

let x = 50
let y = 50
export default props => {
  const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(500, 500).parent(canvasParentRef)
  }

  const draw = p5 => {
    p5.background(0)
    p5.ellipse(x, y, 70, 70)
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++
  }

  return <Sketch setup={setup} draw={draw} />
}
```

#### Typescript

```typescript
import React from "react"
import Sketch from "@react-p5/core"
import type p5Types from "@types/p5" //Import this for typechecking and intellisense

interface ComponentProps {
  //Your component props
}

let x = 50
const y = 50

const YourComponent: React.FC<ComponentProps> = (props: ComponentProps) => {
  //See annotations in JS for more information
  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(500, 500).parent(canvasParentRef)
  }

  const draw = (p5: p5Types) => {
    p5.background(0)
    p5.ellipse(x, y, 70, 70)
    x++
  }

  return <Sketch setup={setup} draw={draw} />
}
```

### Tips

- If you need to get the `browser event object` inside your p5 methods like `mouseClicked` or others you can do it by accessing the second arg.

```js
mouseClicked(_p5, event) {
  console.log(event)
}
```

#### Events that are accessed using props are always attached to `window`.

That means that events are triggered throughout the whole page ([see the p5 docs for reference](https://p5js.org/reference/#/p5.Element/mousePressed)).

If you would like to attach events only to canvas see the example below.
As an example limiting click events to the canvas:

```javascript
const setup = (p5, canvasParentRef) => {
  cnv = p5.createCanvas(width, height).parent(canvasParentRef)
  cnv.mousePressed(event => {
    console.log("Clicked on the canvas. Event:", event)
  })
}
```

#### Using it in an SSR environment (Next.js or Gatsby)

Importing this package for example in a Next.js or Gatsby app may give you this error:

```
ReferenceError: window is not defined
```

This is because importing `p5` requires `window` to be available, and it isn't when server side rendering.

For Next.js we can fix this using [Next.js dynamic imports with No SSR](https://nextjs.org/docs/advanced-features/dynamic-import#with-no-ssr).

```
import dynamic from 'next/dynamic'

// Will only import `@react-p5/core` on client-side
const Sketch = dynamic(() => import('@react-p5/core').then((mod) => mod.default), {
  ssr: false,
})
```

For Gatsby we can use loadable-components. See [Gatsby docs: Load client-side dependent components with loadable-components](https://www.gatsbyjs.com/docs/using-client-side-only-packages/#workaround-4-load-client-side-dependent-components-with-loadable-components).

```
import Loadable from "@loadable/component"

const Sketch = Loadable(
  () => import("@react-p5/core")
);

export default LoadablePage;
```

#### With p5.sound

I frequently see this question even if the implimentation is super simple)) The only needed thing is to import "p5.sound" lib. I created a [Special CodeSandbox DEMO](https://codesandbox.io/s/react-p5-forked-9ixi4?file=/src/index.js) if someone needs to see the implimentation.

#### With p5.sound + next.js (or other framework which has support for SSR)

This question also is frequently asked and the only difference from the normal aprouch is that in SSR mode the react-p5 lib should not be loaded because p5 doesn't support SSR and there is no sense for it to be support. So, if you are using react-p5 plus next.js and you need also p5.sound then try to use dynamic imports as in the code bellow which definitelly will help you.

```js
import dynamic from "next/dynamic"

// Will only import `react-p5` on client-side
const Sketch = dynamic(
  () =>
    import("@react-p5/core").then(mod => {
      // importing sound lib ONLY AFTER REACT-P5 is loaded
      require("p5/lib/addons/p5.sound")
      // returning react-p5 default export
      return mod.default
    }),
  {
    ssr: false,
  }
)
```

## Props

| Prop                                                           |      Required      |   Type   | Description                                                                                                                                                                                                           |
| -------------------------------------------------------------- | :----------------: | :------: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className                                                      |        :x:         |  String  | ClassName for canvas parent ref                                                                                                                                                                                       |
| style                                                          |        :x:         |  Object  | Styles for canvas parent ref                                                                                                                                                                                          |
| [setup](https://p5js.org/reference/#/p5/setup)                 | :heavy_check_mark: | Function | The setup() function is called once when the program starts.                                                                                                                                                          |
| [draw](https://p5js.org/reference/#/p5/draw)                   |        :x:         | Function | Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.                                             |
| [windowResized](https://p5js.org/reference/#/p5/windowResized) |        :x:         | Function | The windowResized() function is called once every time the browser window is resized.                                                                                                                                 |
| [preload](https://p5js.org/reference/#/p5/preload)             |        :x:         | Function | Called directly before setup(), the preload() function is used to handle asynchronous loading of external files in a blocking way.                                                                                    |
| [mouseClicked](https://p5js.org/reference/#/p5/mouseClicked)   |        :x:         | Function | The mouseClicked() function is called once after a mouse button has been pressed and then released.                                                                                                                   |
| [mouseMoved](https://p5js.org/reference/#/p5/mouseMoved)       |        :x:         | Function | The mouseMoved() function is called every time the mouse moves and a mouse button is not pressed.                                                                                                                     |
| [doubleClicked](https://p5js.org/reference/#/p5/doubleClicked) |        :x:         | Function | The doubleClicked() function is executed every time a event listener has detected a dblclick event which is a part of the DOM L3 specification.                                                                       |
| [mousePressed](https://p5js.org/reference/#/p5/mousePressed)   |        :x:         | Function | The mousePressed() function is called once after every time a mouse button is pressed.                                                                                                                                |
| [mouseWheel](https://p5js.org/reference/#/p5/mouseWheel)       |        :x:         | Function | The function mouseWheel() is executed every time a vertical mouse wheel event is detected either triggered by an actual mouse wheel or by a touchpad.                                                                 |
| [mouseDragged](https://p5js.org/reference/#/p5/mouseDragged)   |        :x:         | Function | The mouseDragged() function is called once every time the mouse moves and a mouse button is pressed. If no mouseDragged() function is defined, the touchMoved() function will be called instead if it is defined.     |
| [mouseReleased](https://p5js.org/reference/#/p5/mouseReleased) |        :x:         | Function | The mouseReleased() function is called every time a mouse button is released.                                                                                                                                         |
| [keyPressed](https://p5js.org/reference/#/p5/keyPressed)       |        :x:         | Function | The keyPressed() function is called once every time a key is pressed. The keyCode for the key that was pressed is stored in the keyCode variable.                                                                     |
| [keyReleased](https://p5js.org/reference/#/p5/keyReleased)     |        :x:         | Function | The keyReleased() function is called once every time a key is released. See key and keyCode for more information.                                                                                                     |
| [keyTyped](https://p5js.org/reference/#/p5/keyTyped)           |        :x:         | Function | The keyTyped() function is called once every time a key is pressed, but action keys such as Backspace, Delete, Ctrl, Shift, and Alt are ignored.                                                                      |
| [touchStarted](https://p5js.org/reference/#/p5/touchStarted)   |        :x:         | Function | The touchStarted() function is called once after every time a touch is registered.                                                                                                                                    |
| [touchMoved](https://p5js.org/reference/#/p5/touchMoved)       |        :x:         | Function | The touchMoved() function is called every time a touch move is registered.                                                                                                                                            |
| [touchEnded](https://p5js.org/reference/#/p5/touchEnded)       |        :x:         | Function | The touchEnded() function is called every time a touch ends. If no touchEnded() function is defined, the mouseReleased() function will be called instead if it is defined.                                            |
| [deviceMoved](https://p5js.org/reference/#/p5/deviceMoved)     |        :x:         | Function | The deviceMoved() function is called when the device is moved by more than the threshold value along X, Y or Z axis. The default threshold is set to 0.5. The threshold value can be changed using setMoveThreshold() |
| [deviceTurned](https://p5js.org/reference/#/p5/deviceTurned)   |        :x:         | Function | The deviceTurned() function is called when the device rotates by more than 90 degrees continuously.                                                                                                                   |
| [deviceShaken](https://p5js.org/reference/#/p5/deviceShaken)   |        :x:         | Function | The deviceShaken() function is called when the device total acceleration changes of accelerationX and accelerationY values is more than the threshold value. The default threshold is set to 30.                      |
