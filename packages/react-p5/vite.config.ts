import { defineConfig } from "vite"
import path from "path"
import react from "@vitejs/plugin-react"
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ insertTypesEntry: true })],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.tsx"),
      name: "react-p5",
      formats: ["es", "umd", "cjs"],
      fileName: format => `react-p5.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "p5"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
})
