/* eslint-disable */
const CssGeneratorPlugin = require('css-generator-plugin')

module.exports = {
  css: {
    extract: false
  },
  outputDir: 'lib',
  configureWebpack: {
    module: {
      rules: [{
        test: /\.mjs$/,
        include: /node_modules/,
        type: "javascript/auto"
      }]
    }
  },
  chainWebpack: config => {
    config
      .plugin('CssGeneratorPlugin')
      .use(CssGeneratorPlugin)
  }
}
