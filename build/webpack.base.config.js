// 公用webpack配置
const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const config = require('../config/config');
const resolve = (dir) => path.resolve(process.cwd(), dir);
const devMode = process.env.CURRENT_ENV === 'development';

const publicPath = config[process.env.CURRENT_ENV]?.domain;

const { name } = require('../package.json');

module.exports = {
  mode: devMode ? 'development' : 'production',
  entry: {
    app: ['./src/index.js'],
  },
  target: devMode ? 'web' : 'browserslist', // 当前版本开发环境设置web才能使hmr生效
  output: {
    path: resolve('public'),
    filename: devMode ? '[name].js' : '[name].[contenthash:8].js',
    chunkFilename: devMode ? '[name].js' : `chunk.[name].[contenthash:8].js`,
    publicPath: '/',
    clean: false, // 是否清空之前的构建文件
    library: `${name}`, //name为package.json中的name
    libraryTarget: 'umd',
    chunkLoadingGlobal: `webpackJsonp_${name}`,
    globalObject: 'window',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
    alias: {
      '@': resolve('src'),
      static: resolve('static'),
      config: resolve('config'),
    },
    fallback: {
      http: require.resolve("stream-http"),
      buffer: require.resolve("buffer"),
      timers: require.resolve("timers-browserify")
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader', options: { importLoaders: 1 } }, 'postcss-loader'],
      },
      {
        test: /\.(eot||ttf|woff|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: config.theme,
            },
          },
        ],
      },
      {
        // css-module
        test: /\.module\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
              modules: {
                localIdentName: devMode ? '[name]_[local]_[hash:base64:5]' : '[local]_[hash:base64:5]',
              },
            },
          },
          'postcss-loader',
          {
            loader: 'less-loader',
            options: {
              javascriptEnabled: true,
              modifyVars: config.theme,
            },
          },
        ],
      },
      { test: /\.m?js/, resolve: { fullySpecified: false } },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: 'img/[name].[hash:16].[ext]',
          publicPath,
        },
        type: 'javascript/auto',
      },
    ],
  },
  plugins: [
    // changed from eslint-loader
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      formatter: 'table',
      threads: true,
    }),
    new HtmlWebpackPlugin({
      title: config.projectName,
      inject: true,
      filename: 'index.html',
      template: 'src/index.template.html',
    }),
    new MiniCssExtractPlugin({
      filename: devMode ? '[name].css' : '[name].[contenthash:8].css',
      chunkFilename: devMode ? '[name].css' : 'chunk.[name].[contenthash:8].css',
      ignoreOrder: true, // 忽略有关顺序冲突的警告
    }),
    new CopyPlugin({
      patterns: [{ from: 'static' }],
    }),
    // 由于webpack5删除了node polyfill相关，添加该Plugin后项目中可引用process.env.NODE_ENV
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    // 将antd的momentjs替换成dayjs
    new AntdDayjsWebpackPlugin(),
    // 添加该Plugin后项目中可引用process.env.CURRENT_ENV
    new webpack.EnvironmentPlugin(['CURRENT_ENV']),
  ],
  performance: {
    hints: false,
  },
  stats: {
    children: false,
  },
};
