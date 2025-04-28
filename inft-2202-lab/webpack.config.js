// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';

const isProduction = process.env.NODE_ENV == 'production';

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        path: path.resolve('dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/index.ejs",
            filename: 'index.html',
            inject: 'body',
            title: 'INFT 2202: Product Database',
            hash: true,
        }),
        new MiniCssExtractPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                { from: 'node_modules/bootstrap/dist/css/bootstrap.min.css', to: 'css/' },
                { from: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css', to: 'css/' },
                { from: 'node_modules/@fortawesome/fontawesome-free/webfonts', to: 'webfonts/' },
            ],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler,'css-loader'],
            },
            {
            test: /\.scss$/i,
            use: [stylesHandler, 'css-loader', 'sass-loader'],
            },

            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset',
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'img/[name][ext]', // Corrected path
                }
            },
            {
                test: /\.ejs$/,
                use: {
                    loader:'ejs-compiled-loader',
                    options:{
                        htmlmin: true,
                        htmlminOptions: {
                            removeComments: true
                        }
                    }
                }
            }
        ]
    }
};

export default () => {
    if (isProduction) {
        config.mode = 'production';
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
