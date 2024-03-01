const path = require("path")
const glob = require("glob")

import { defineConfig } from "vite"
import eslint from "@rollup/plugin-eslint"

let input = {}

glob
  .sync("./src/**/*.html")
  .map((file) => {
    return [file.substring(`.${path.sep}src${path.sep}`.length), file]
  })
  .forEach((f) => {
    input[f[0]] = f[1]
  })

export default defineConfig({
  root: "src",
  build: {
    manifest: true,
    outDir: "../dist",
    emptyOutDir: true,
    rollupOptions: {
      input
    },
  },
  server: {
    port: 8080,
    open: "/",
  },
  plugins: [
    {
      ...eslint({
        include: ["src/**/*.js"],
      }),
      enforce: "pre",
      apply: "build",
    },
  ],
})
