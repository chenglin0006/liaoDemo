// 测试和生产环境webpack配置
const webpack = require('webpack');
const path = require('path');
const { merge } = require('webpack-merge');
const { RetryChunkLoadPlugin } = require('webpack-retry-chunk-load-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const webpackBaseConfig = require('./webpack.base.config.js');
const config = require('../config/config');
const resolve = (dir) => path.resolve(process.cwd(), dir);
const plugins = [
  // 构建后提醒用户刷新页面
  // new RetryChunkLoadPlugin({
  //   lastResortScript: 'window.location.reload(true);',
  // }),
  // 打包文件分析并生成静态文件
  new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
];
let webpackProdConfig = merge(webpackBaseConfig, {
  // dev 环境不开启soure-map
  devtool: process.env.CURRENT_ENV !== 'dev' ? 'source-map' : 'eval',
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    // 运行文件单独打包
    runtimeChunk: 'single',
    // 根据模块的相对路径生成的hash作为模块id，防止vendor的module.id因解析顺序而增量变化
    moduleIds: 'deterministic',
    // js、css压缩
    minimizer: [`...`, new CssMinimizerPlugin()],
  },
  plugins,
});

module.exports = webpackProdConfig;
