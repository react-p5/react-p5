import type { NextPage } from "next"
import Head from "next/head"
import dynamic from "next/dynamic"
import { createGrain, linearGradient } from "@react-p5/utils"
import { ColorValue, Draw, P5, Setup } from "@react-p5/core"
import type { Graphics } from "p5"
import { FunctionComponent, useState } from "react"
import { SketchProps } from "@react-p5/sketch"

const Sketch = dynamic(
  () =>
    import("@react-p5/sketch").then(mod => {
      return mod.default
    }) as Promise<FunctionComponent<SketchProps>>,
  { ssr: false }
)

const Home: NextPage = () => {
  const width: number = 2048
  const height: number = 2048
  const dimensions: number[] = [width, height]
  const padding: number[] = [40]
  const background: ColorValue = [255, 253, 252]
  let grain: Graphics
  let margin: number
  const [beep, setBeep] = useState<number>(0)

  // const gradientArc = (
  //   p5: P5,
  //   x: number,
  //   y: number,
  //   w: number,
  //   h: number,
  //   start: number,
  //   stop: number,
  //   c1: ColorValue,
  //   c2: ColorValue
  // ): void => {
  //   const lx1: number = x - w;
  //   const ly1: number = y - h;
  //   const lx2: number = x + w * 0.5;
  //   const ly2: number = y + h * 0.5;
  //   p5.push();
  //   p5.noStroke();
  //   linearGradient(p5, lx1, ly1, lx2, ly2, c1, c2);
  //   p5.arc(x, y, w, h, start, stop);
  //   p5.pop();
  // };

  // const setup: Setup = (p5) => {
  //   grain = createGrain(p5);
  // };

  // const draw: Draw = (p5) => {
  //   margin = p5.width * 0.1;
  //   const cx: number = p5.width * 0.5;
  //   const cy: number = p5.height * 0.5;
  //   const scale: number = 120;
  //   const ellipseUnit: number = p5.width * 0.175;

  //   p5.background(background);

  //   Array.from({ length: 10 }, (_, i) => {
  //     const unit: number = p5.width * 0.05 * (10 - i);
  //     gradientArc(
  //       p5,
  //       cx,
  //       cy,
  //       unit,
  //       unit,
  //       p5.PI + p5.HALF_PI,
  //       p5.HALF_PI,
  //       [255, 0, 0],
  //       background
  //     );
  //   });
  //   Array.from({ length: 10 }, (_, i) => {
  //     const unit: number = p5.width * 0.05 * (10 - i);
  //     gradientArc(
  //       p5,
  //       cx,
  //       cy,
  //       unit,
  //       unit,
  //       p5.HALF_PI,
  //       p5.PI + p5.HALF_PI,
  //       background,
  //       0
  //     );
  //   });

  //   p5.push();
  //   p5.ellipseMode(p5.CORNERS);
  //   const e1x1 = margin;
  //   const e1y1 = p5.height - margin;
  //   const e1x2 = margin + ellipseUnit;
  //   const e1y2 = p5.height - margin - ellipseUnit;
  //   linearGradient(
  //     p5,
  //     e1x2 + scale,
  //     e1y2 - scale,
  //     e1x1,
  //     e1y1,
  //     [255, 0, 0],
  //     background
  //   );
  //   p5.stroke(20, 10);
  //   p5.strokeWeight(5);
  //   p5.ellipse(e1x1, e1y1, e1x2, e1y2);
  //   p5.pop();

  //   p5.push();
  //   p5.ellipseMode(p5.CORNERS);
  //   const e2x1 = p5.width - margin;
  //   const e2y1 = margin;
  //   const e2x2 = p5.width - margin - ellipseUnit;
  //   const e2y2 = margin + ellipseUnit;
  //   linearGradient(
  //     p5,
  //     e2x1,
  //     e2y1,
  //     e2x2 - scale * 1.3,
  //     e2y2 + scale * 1.3,
  //     background,
  //     0
  //   );
  //   p5.stroke(255, 0, 0, 10);
  //   p5.strokeWeight(5);
  //   p5.ellipse(e2x1, e2y1, e2x2, e2y2);
  //   p5.pop();

  //   p5.image(grain, 0, 0, p5.width, p5.height);
  // };

  const setup: Setup = (p5, ref) => {
    p5.createCanvas(500, 500, p5.SVG).parent(ref)
    p5.background(255)
  }

  const draw: Draw = p5 => {
    p5.noLoop()
    p5.noFill()
    p5.rect(p5.width * 0.5, p5.height * 0.5, 200, 200)
  }

  return (
    <div>
      <Head>
        <title>Nextjs @react-p5 Example</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Sketch
          // setup={setup}
          draw={draw}
          renderSVG
          dimensions={dimensions}
          padding={padding}
          background={background}
          // enableUI
          // UIValues={[{ label: "beep", setValue: setBeep, value: beep }]}
        />
      </main>
    </div>
  )
}

export default Home
