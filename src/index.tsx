import { FC, useEffect, useRef } from "react"
import p5 from "p5"
import { SketchProps } from "../@types"

export const p5Events: string[] = [
  "draw",
  "windowResized",
  "preload",
  "mouseClicked",
  "doubleClicked",
  "mouseMoved",
  "mousePressed",
  "mouseWheel",
  "mouseDragged",
  "mouseReleased",
  "keyPressed",
  "keyReleased",
  "keyTyped",
  "touchStarted",
  "touchMoved",
  "touchEnded",
  "deviceMoved",
  "deviceTurned",
  "deviceShaken",
]

const Sketch: FC<SketchProps> = ({
  className = "react-p5",
  style,
  ...rest
}) => {
  const canvasParentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sketch: p5 = new p5(p => {
      p.setup(p, canvasParentRef.current)

      // map over remaining props and pass prop val to p5 instance
      Object.entries(rest).forEach(([key, val]) => {
        if (p5Events.includes(key)) {
          p[key](p, val)
        }
      })
    })

    // NOTE: assigning p5 to window because someone can need it globally to use in others libraries
    if (typeof window !== "undefined") {
      window.p5 = sketch
    }

    return () => sketch.remove()
  }, [])

  return (
    <div
      ref={canvasParentRef}
      className={className}
      data-testid="react-p5"
      style={style}
    />
  )
}

export default Sketch
