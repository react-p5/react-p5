import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
const config = defineConfig({
  plugins: [
    react(),
    dts({
      include: "./types/index.d.ts",
      exclude: "./src",
      entryRoot: "./types",
    }),
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "ReactP5",
      formats: ["es", "umd"],
      fileName: format => `react-p5.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "p5"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          p5: "P5",
        },
        exports: "named",
      },
    },
  },
})

export default config
