import { Glob, $ } from "bun"
import { renameSync, readdirSync } from "fs"
import { join } from "path"

await $`rm -rf dist`
const files = new Glob("./src/**/*.{ts,tsx}").scan()



for await (const file of files) {
  // Build CJS
  await Bun.build({
    format: "cjs",
    outdir: "dist/cjs",
    root: "src",
    entrypoints: [file],
    minify: false,
  })

  // Build ESM
  await Bun.build({
    format: "esm",
    outdir: "dist/esm",
    root: "src",
    entrypoints: [file],
    minify: false,
  })
}

// rename .js → .cjs
for (const f of readdirSync("dist/cjs")) {
  if (f.endsWith(".js")) {
    renameSync(join("dist/cjs", f), join("dist/cjs", f.replace(/\.js$/, ".cjs")))
  }
}


await $`tsc --declaration --emitDeclarationOnly --outDir dist/types --rootDir src`

