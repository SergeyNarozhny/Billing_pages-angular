var extractTextPlugin = require('extract-text-webpack-plugin');
var modulePath = '/usr/local/lib/node_modules';

module.exports = {
	entry: './bill.module.js',
	output: {
		path: './static',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: [modulePath + '/babel-preset-es2015']
				}
			},
			{
				test: /\.post\.css$/,
				loader: extractTextPlugin.extract(
					'style-loader',
					'css-loader?modules&importLoaders=1&localIdentName=[local]'
					+ '!postcss-loader'
				),
				exclude: /node_modules/
			},
			{
				test: /\.(jpe?g|gif|png)$/,
				loader: 'file-loader?emitFile=false&name=/static/img/[name].[ext]',
				exclude: /node_modules/
			}
		]
	},
	postcss: function() {
		return [
			require('precss')(),
			require('pixrem')()
		]
	},
	resolveLoader: {
		fallback: modulePath
	},
	plugins: [
		new extractTextPlugin('bundle.css')
	]
};
