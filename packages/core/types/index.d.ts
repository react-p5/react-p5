// P5 interface contains all p5 utils, you can check all available methods and props at this url https://p5js.org/reference/
import type P5Types from "p5"
import type { FC } from "react"

export interface P5 extends P5Types {
  constructor: { [key: string]: any }
  SVG?: any
}

declare global {
  interface Window {
    p5: P5Types
  }
}

// TODO: flesh out remaining type interfaces for p5 methods.

export type P5Function = (p5: P5) => void

export type ColorValue = string | number | number[]

export type Setup = (p5: P5, canvasParentRef: Element) => void

export type KeyPressed = (p5: P5, e?: KeyboardEvent) => void

export type WindowResized = P5Function

export type Draw = P5Function

export type MouseClicked = (p5: P5, e?: MouseEvent) => void

export interface SketchProps {
  /**	ClassName for canvas parent ref  */
  className?: string
  /**	Styles for canvas parent ref  */
  style?: { [key: string]: number | string }
  /**	The setup() function is called once when the program starts.  */
  setup: Setup
  /**	Called directly after setup(), the draw() function continuously executes the lines of code contained inside its block until the program is stopped or noLoop() is called.  */
  draw?: Draw
  /**	The windowResized() function is called once every time the browser window is resized.  */
  windowResized?: WindowResized
  /**	Called directly before setup(), the preload() function is used to handle asynchronous loading of external files in a blocking way.  */
  preload?: P5Function
  /**	The mouseClicked() function is called once after a mouse button has been pressed and then released.  */
  mouseClicked?: P5Function
  /**	The mouseMoved() function is called every time the mouse moves and a mouse button is not pressed.  */
  mouseMoved?: P5Function
  /**	The doubleClicked() function is executed every time a event listener has detected a dblclick event which is a part of the DOM L3 specification.  */
  doubleClicked?: P5Function
  /**	The mousePressed() function is called once after every time a mouse button is pressed.  */
  mousePressed?: MouseClicked
  /**	The function mouseWheel() is executed every time a vertical mouse wheel event is detected either triggered by an actual mouse wheel or by a touchpad.  */
  mouseWheel?: P5Function
  /**	The mouseDragged() function is called once every time the mouse moves and a mouse button is pressed. If no mouseDragged() function is defined, the touchMoved() function will be called instead if it is defined.  */
  mouseDragged?: P5Function
  /**	The mouseReleased() function is called every time a mouse button is released.  */
  mouseReleased?: P5Function
  /**	The keyPressed() function is called once every time a key is pressed. The keyCode for the key that was pressed is stored in the keyCode variable.  */
  keyPressed?: KeyPressed
  /**	The keyReleased() function is called once every time a key is released. See key and keyCode for more information.  */
  keyReleased?: P5Function
  /**	The keyTyped() function is called once every time a key is pressed, but action keys such as Backspace, Delete, Ctrl, Shift, and Alt are ignored.  */
  keyTyped?: P5Function
  /**	The touchStarted() function is called once after every time a touch is registered.  */
  touchStarted?: P5Function
  /**	The touchMoved() function is called every time a touch move is registered.  */
  touchMoved?: P5Function
  /**	The touchEnded() function is called every time a touch ends. If no touchEnded() function is defined, the mouseReleased() function will be called instead if it is defined.  */
  touchEnded?: P5Function
  /**	The deviceMoved() function is called when the device is moved by more than the threshold value along X, Y or Z axis. The default threshold is set to 0.5. The threshold value can be changed using setMoveThreshold()  */
  deviceMoved?: P5Function
  /**	The deviceTurned() function is called when the device rotates by more than 90 degrees continuously.  */
  deviceTurned?: P5Function
  /**	The deviceShaken() function is called when the device total acceleration changes of accelerationX and accelerationY values is more than the threshold value. The default threshold is set to 30.  */
  deviceShaken?: P5Function
}

/** This Component lets you integrate p5 Sketches into your React App */
declare const Sketch: FC<SketchProps>

export default Sketch
