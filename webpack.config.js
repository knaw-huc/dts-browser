const path = require('path')
const endpoint = require('./build/endpoint')

module.exports = {
	devServer: {
		contentBase: path.resolve(__dirname),
		disableHostCheck: true,
		historyApiFallback: true,
		port: 3333,
		proxy: {
			[endpoint.basePath]: {
				target: endpoint.baseUrl,
				changeOrigin: true,
			},
		}
	},
  entry: './src/index.tsx',
  output: {
		filename: 'bundle.js',
		path: __dirname + '/dist',
		publicPath: '/dist/',
  },
  mode: 'development',
  module: {
    rules: [
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{
				test: /\.tsx?$/,
				loader: "ts-loader",
			}
		]
	},
	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
	}
};
