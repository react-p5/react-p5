import type { NextPage } from 'next'
import Head from 'next/head'
import { SketchProps } from 'react-p5/@types'
import styles from '../styles/Home.module.css'
import dynamic from 'next/dynamic'

const Sketch = dynamic(() => import("react-p5/dist").then((mod) =>  mod.default
), {ssr: false});

const setup: SketchProps["setup"] = (p5, canvasParentRef) => {
  p5.createCanvas(400,400).parent(canvasParentRef)
  p5.background(0)

}

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Next.js!</a>
        </h1>
        <Sketch setup={setup} />
      </main>
    </div>
  )
}

export default Home