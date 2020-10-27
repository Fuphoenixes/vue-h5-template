const path = require('path');
const apiMocker = require('webpack-api-mocker');
const CompressionPlugin = require("compression-webpack-plugin");

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  publicPath:'./',
  css: {
    loaderOptions: {
      less: {
        modifyVars: require('./theme.js')
      }
    }
  },
  devServer:{
    before(app){
      apiMocker(app, path.resolve('./mock/index.js'))
    }
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
	productionSourceMap: false,
	configureWebpack: () =>{
		if(process.env.NODE_ENV === 'production'){
			return{
				plugins: [
				  // gzip
					new CompressionPlugin({
						test:/\.js$|\.html$|\.css$/, //匹配文件名
						threshold: 10240,//对超过10k的数据压缩
						deleteOriginalAssets: false //不删除源文件
					})
				]
			}
		}
	},
  chainWebpack(config) {

    // set svg-sprite-loader
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

  }
};
