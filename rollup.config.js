const lib = require('./package.json');
const {terser} = require("rollup-plugin-terser");
const outputFileName = 'jsUtil'
const input = './src/index.js'

const buildConfig = (config) => {
  const build = ({minified}) => ({
    input,
    ...config,
    output: {
      ...config.output,
      file: `${config.output.file}.${minified ? "min.js" : "js"}`
    },
    plugins: [
      minified && terser(),
    ]
  })

  return [
    build({minified: false}),
    build({minified: true}),
  ]
}

module.exports = async () => {
  const year = new Date().getFullYear();
  const banner = `// ${lib.name} v${lib.version} Copyright (c) ${year} ${lib.author}`
  return [
    ...buildConfig({
      output: {
        file: `dist/${outputFileName}`,
        format: 'esm',
        preferConst: true,
        exports: 'named',
        banner
      }
    })
  ]
}