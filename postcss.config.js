const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-plugin-px2rem');
module.exports = ({ file }) => {
	let ROOTValue;
	if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
		ROOTValue = 50
	} else {
		ROOTValue = 100
	}
	return {
		plugins: [
			autoprefixer(),
			pxtorem({
				rootValue: ROOTValue,
				mediaQuery: true,
				exclude:false,
				selectorBlackList: [],
				minPixelValue: 2
			})
		]
	}
};