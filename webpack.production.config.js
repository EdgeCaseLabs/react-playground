var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var node_modules_dir = path.resolve(__dirname, 'node_modules');

var config = {
    //devtool: "source-map",
    entry: {
        app: [
            path.resolve(APP_DIR, 'main.js')
        ],
        // vendor_jquery: [
        //     'jquery',
        // ],
        // vendor_alt: [
        //     'alt',
        //     // 'react',
        //     // 'react-dom',
        //     // 'react-router'
        // ]              
    },
    output: {
        path: BUILD_DIR,
        filename: 'bundle.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: [node_modules_dir],
            loaders: ['jsx?harmony', 'babel?' + JSON.stringify({
                "presets": ['es2015', 'stage-0', 'react']
            })],
            include: APP_DIR
        }, {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        }]
    },
    //resolve not just the default .js files but also .jsx
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: 'production'
        }),
        //new webpack.optimize.CommonsChunkPlugin({names: ['vendor_jquery', 'vendor_alt'], filename: '[name].bundle.js?[hash]', minChunks: Infinity}),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
};

module.exports = config;