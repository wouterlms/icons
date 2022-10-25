import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    'src/index',
    'src/transformer',
    'src/icons',
  ],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})
