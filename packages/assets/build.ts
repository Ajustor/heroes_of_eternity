import { copy, mkdir, readdir, rm, pathExists } from 'fs-extra'

console.log('Start building assets')
await Bun.build({
  entrypoints: ['./src/index.ts'],
  outdir: './dist',
  minify: true,
  splitting: true,
  target: 'bun',
})

if (!(await pathExists('./dist/assets'))) {
  await mkdir('./dist/assets')
}

const files = await readdir('./assets')

for (const file of files) {
  await copy(`./assets/${file}`, `./dist/assets/${file}`)
}

console.log('Building finish')