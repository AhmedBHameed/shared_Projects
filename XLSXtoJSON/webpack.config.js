const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const publicPath = 'assets/';

const extractSass = new ExtractTextPlugin({
    filename: "[name].[contenthash].css",
    disable: isProd,
    allChunks: true

});
const extractHtml = new htmlWebpackPlugin({
	title: 'XLSX to JSON',
	minify:{
		collapseWhitespace: false
	},
	hash: true,
	template: './src/index.html' // Load a custom template (ejs by default see the FAQ for details)
});

var isProd  = process.env.NODE_ENV === 'production', // this will return true or false depend on package.json
    cssDev  = ["style-loader","css-loader","sass-loader"],
    cssProd = extractSass.extract({
        use:[{
                loader: "css-loader", // translates SASS into Common CSS
                options: {sourceMap: true, convertToAbsoluteUrls: true } // convertTo.. will resolve images path
            }, {
                loader: "sass-loader"
            }],
        fallback: "style-loader"
    });
var cssConfig = isProd ? cssProd: cssDev;
module.exports={
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        watchContentBase: true,
        hot: true,
        inline: true,
        open: true,
        port: 9009,
        openPage: ''
    },
    node: {
		fs: "empty"
	},
    devtool: "source-map", // show .map files for better debugging.
    entry: './src/ts/app.ts',
    output:{
        path: path.resolve(__dirname, 'dist'),
        filename: 'app.bundle.js'
    },
    node: {
        fs: "empty"
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss', '.css']
    },
    module:{
        rules: 
        [{   
            test: /\.scss$/, 
            use: cssConfig
        },{
            test: /\.tsx?$/,
            loader: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|json|xml|ico)(\?.*)?$/i,
            loader: [
                'file-loader?name='+publicPath+'[name].[ext]',
                {
                    loader: 'image-webpack-loader',
                    options: 
                    {
                        query: 
                        {
                            progressive: true,
                            optimizationLevel: 7,
                            interlaced: false,
                            pngquant:
                            {
                                quality: '65-90',
                                speed: 4
                            }
                        }
                    }
                }
            ]
        }]
    },
    plugins: [ extractHtml, extractSass,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.IgnorePlugin(/cptable/)]
}