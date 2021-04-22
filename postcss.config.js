const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-plugin-px2rem')
module.exports = {
  plugins: [
    autoprefixer(),
    pxtorem({
      rootValue: 50,
      mediaQuery: true,
      exclude: false,
      selectorBlackList: [],
      minPixelValue: 2
    })
  ]
}
