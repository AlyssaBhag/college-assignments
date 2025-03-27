// Generated using webpack-cli https://github.com/webpack/webpack-cli

import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import WorkboxWebpackPlugin from 'workbox-webpack-plugin';


const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = MiniCssExtractPlugin.loader;


const config = {
    devtool: "source-map",
    entry: './src/client/index.js',
    output: {
        path: path.resolve(import.meta.dirname, 'dist'),
    },
    devServer: {
        open: true,
        host: 'localhost',
        directory: path.join(import.meta.dirname, '../../dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/client/index.ejs",
            filename: 'index.html',
            inject: 'body',
            title: 'INFT 2202: Animals Database',
            hash: true,
        }),

        new MiniCssExtractPlugin(),

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
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
                test: /\.s[ac]ss$/i,
                use: [stylesHandler, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                type: 'asset',
            },
            {
                test: /\.(png|jpg|gif)$/i,
                type: 'asset',
                generator: {
                    filename: 'img{name}[ext]'
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
