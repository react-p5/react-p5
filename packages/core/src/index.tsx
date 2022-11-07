import { FC, useEffect, useRef } from "react"
import p5 from "p5"
import type { SketchProps } from "types"

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
  setup,
  ...rest
}) => {
  const currentSketch = useRef<p5 | null>(null)
  const canvasParentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (currentSketch.current === null) {
      currentSketch.current = new p5(p => {
        p.setup = () => {
          setup(p, canvasParentRef.current as Element)
        }
        // map over remaining props and pass prop val to p5 instance
        Object.entries(rest).forEach(([key, val]) => {
          if (p5Events.includes(key)) {
            p[key] = (...rest: any) => {
              val(p, ...(rest as []))
            }
          }
        })
      }, canvasParentRef.current as HTMLElement)

      // NOTE: assigning p5 to window because someone can need it globally to use in others libraries
      if (typeof window !== "undefined") {
        // window.p5 = currentSketch.current
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        window.p5 = p5
      }
    } else {
      // map over remaining props and pass prop val to p5 instance
      const p: any = currentSketch.current
      Object.entries(rest).forEach(([key, val]) => {
        if (p5Events.includes(key)) {
          p[key] = (...rest: any) => {
            val(p, ...(rest as []))
          }
        }
      })
    }
  }, [setup, rest])

  useEffect(() => {
    return () => currentSketch.current?.remove()
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
