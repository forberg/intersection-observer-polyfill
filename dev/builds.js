const path = require('path');
const _ = require('lodash');
const webpack = require('webpack');

const builds = {
    general: {
        resolve: {
            extensions: ['', '.js']
        },
        module: {
            loaders: [{
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015-loose', 'stage-1'],
                    plugins: ['add-module-exports', 'transform-es2015-modules-commonjs']
                }
            }]
        }
    }
};

builds.production = _.merge({}, builds.general, {
    entry: './index.js',
    output: {
        libraryTarget: 'umd',
        library: 'IntersectionObserver',
        path: './dist/',
        filename: 'IntersectionObserver.js'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
});

builds.prodGlobal = _.merge({}, builds.production, {
    entry: './index.global.js',
    output: {
        filename: 'IntersectionObserver.global.js'
    }
});

module.exports = builds;