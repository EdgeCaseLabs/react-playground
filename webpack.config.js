var path = require('path');
var webpack = require('webpack');
var BUILD_DIR = path.resolve(__dirname, 'public');
var APP_DIR = path.resolve(__dirname, 'src');
var node_modules_dir = path.resolve(__dirname, 'node_modules');
var pkg = require('./package')

var config = {
    devtool: "source-map",
    entry:
    {
        app: [
            'webpack-dev-server/client?http://localhost:' + pkg.config['webpack-dev-port'] + '/', // WebpackDevServer host and port
            'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
            path.resolve(APP_DIR, 'main.js')
        ],
        vendor: [
            'alt',
            'react',
            'react-dom',
            'react-router'
        ]
    },
    output:
    {
        path: BUILD_DIR,
        publicPath: 'http://localhost:' + pkg.config['webpack-dev-port'] + '/js/',
        filename: 'bundle.js'
    },
    module:
    {
        loaders: [
        {
            test: /\.jsx?$/,
            exclude: [node_modules_dir],
            loaders: ['react-hot', 'jsx?harmony', 'babel?' + JSON.stringify(
            {
                "presets": ['es2015', 'stage-0', 'react']
            })],
            include: APP_DIR
        },
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader?mimetype=image/svg+xml'
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/font-woff"
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/font-woff"
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader?mimetype=application/octet-stream"
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            loader: "file-loader"
        }, 
        ]
    },
    //resolve not just the default .js files but also .jsx
    resolve:
    {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin(
        {
            names: ['vendor'],
            filename: 'vendor.bundle.js?[hash]',
            minChunks: Infinity
        }),
        // Webpack 1.0 
        new webpack.optimize.OccurenceOrderPlugin(),
        // Webpack 2.0 fixed this mispelling 
        // new webpack.optimize.OccurrenceOrderPlugin(), 
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
module.exports = config;