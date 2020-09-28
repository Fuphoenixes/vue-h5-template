const path = require('path');
const apiMocker = require('webpack-api-mocker');
const CompressionPlugin = require("compression-webpack-plugin");

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
};