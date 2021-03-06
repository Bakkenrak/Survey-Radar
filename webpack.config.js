var webpack = require('webpack');

module.exports = {
	entry: [
		'./src/app.js'
	],
	module: {
	    loaders: [{
	      test: /\.js$/,
	      exclude: /node_modules/,
	      loader: 'babel'
	    }]
	},
	resolve: {
	    extensions: ['', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'client.js'
	},
	devServer: {
		contentBase: './dist',
	}
}