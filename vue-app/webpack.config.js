const resolve = require('path').resolve;
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const url = require('url');
const publicPath = '';

module.exports = (options = {}) => ({
    entry: {
        //vendor: './src/vendor',
        index: './src/main.js',
    },
    output: {
        path: resolve(__dirname, 'dist'),
        filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
        chunkFilename: '[id].js?[chunkhash]',
        publicPath: options.dev ? '/assets/' : publicPath,
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: ['vue-loader'],
        },
          {
            test: /\.js$/,
            use: ['babel-loader'],
            exclude: /node_modules/,
        },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        },
          {
            test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 10000,
                },
            },],
        },
        ],
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin({
        names: ['vendor', 'manifest'],
    }),
      new HtmlWebpackPlugin({
        template: 'src/index.html',
    }),
    ],
    resolve: {
        alias: {
            '~': resolve(__dirname, 'src'),
            'vue': 'vue/dist/vue.js',
        },
    },
    devServer: {
        host: '0.0.0.0',
        port: 8010,
        disableHostCheck: true,
        proxy: {
            '/license-storage/api/public/index.php/api/': {
                target: 'http://192.168.255.138:8080/license/api/public/index.php/api/',
                //changeOrigin: true,
                pathRewrite: {'^/license-storage/api/public/index.php/api/': ''},
            },
        },
        historyApiFallback: {
            index: url.parse(options.dev ? '/assets/' : publicPath).pathname,
        },
    },
    devtool: options.dev ? '#eval-source-map' : '#source-map',
});
