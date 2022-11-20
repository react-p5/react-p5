import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ReactP5",
      formats: ["es", "umd"],
      fileName: format => `react-p5-sketch.${format}.js`
    },
    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "p5",
        "@chakra-ui/react",
        "@emotion/react",
        "@emotion-styled",
        "framer-motion"
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM"
        },
        exports: "named"
      }
    }
  }
})

export default config
