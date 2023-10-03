const TerserPlugin = require('terser-webpack-plugin');
const PostCSSPresetEnv = require('postcss-preset-env');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Path = require('path');
const Fs = require('fs');

module.exports = (env, argv) => {
	const webpackConfig = {
		stats: 'summary',
		entry: Path.resolve(__dirname, 'src/Page.jsx'),
		mode: 'development',
		devtool: false,
		target: ['web', 'es5'],
		watch: false,
		watchOptions: {
			ignored: [
				'**/node_modules/',
				'**/public/',
				'**/dist/'
			],
			aggregateTimeout: 600,
			poll: 1000
		},
		output: {
//			clean: true,
			path: Path.normalize(__dirname + '/dist'),
			filename: '[contenthash].js',
			publicPath: ''
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/i,
					exclude: [/nodeModules/],
					use: [
						{
							loader: 'babel-loader',
							options: {
								compact: true,
								exclude: [/nodeModules/],
							},
						}
					]
				},
				{
					test: /\.(css|scss|sass)$/i,
					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
							}
						},
						{
							loader: 'css-loader',
							options: {
								url: true,
								modules: {
									localIdentName: '[local]',
								}
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [PostCSSPresetEnv({
										features: {
											'nesting-rules': true,
											'custom-selectors': {preserve: true}
										}
									})]
								}
							}
						},
						{
							loader: 'sass-loader',
							options: {
								implementation: require('sass')
							}
						}
					]
				}
 			]
		},
		resolve: {
			extensions: ['.js', '.jsx', '.json']
		},
		plugins: [
		new MiniCssExtractPlugin({
				filename: '[contenthash].css',
				ignoreOrder: true,
			})
		],
	};
	return webpackConfig;
}