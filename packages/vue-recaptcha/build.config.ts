import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  declaration: true,
  entries: [
    {
      builder: 'mkdist',
      input: './src',
      format: 'esm',
    },
    {
      builder: 'mkdist',
      input: './src',
      ext: 'cjs',
      format: 'cjs',
    },
  ],
})
