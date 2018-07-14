const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin'); // 注意版本号 webpack 4 以上版本请下载 @next 版本
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

let output = null;
let htmlOut = null;
let isdev = true;
output = path.resolve(__dirname, '../app/public/dist');
htmlOut = path.join(__dirname,'../app/view/index.html');
if(process.env.NODE_ENV !== "development") {
  isdev = false;
}

let config = {
  entry: path.join(__dirname,'./src/index.js'),
  output: {
    path: output,
    chunkFilename: `[name].min.js`,
    filename: `[name].min.js`
  },
  module:{
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: /(node_modules|bower_components)/, 
        use: { 
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react','env'],
            plugins: [
              [
                  "import",
                  {libraryName: "antd", style: true}
              ] 
            ]
          }
        } 
      },
      {
        test: /\.(less|css)$/,
        use: ExtractTextPlugin.extract({ 
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: 'postcss.config.js'  // 这个得在项目根目录创建此文件
                }
              }
            },
            {
              loader:  'less-loader',
              options: { 
                javascriptEnabled: true 
              } 
            }
          ]
        })
      },
      {
        test: /\.html$/,
        use: [ 
          {
            loader: 'html-loader',
            options: { 
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'img/[name].[ext]'
            } 
          }
        ]
      }
    ]  
  },
  
  resolve: {
    alias: {
      Utils: path.resolve(__dirname + '/src/utils'),
      components: path.resolve(__dirname + '/src/components'),
    },
    extensions: ['.js','.jsx']
  },
  mode: process.env.NODE_ENV,
  plugins: [
    new webpack.ProvidePlugin({
      antd: "antd",
    }),

    // 提取样式，生成单独文件
    new ExtractTextPlugin("styles.css"),
    new BrowserSyncPlugin({
      host: '127.0.0.1',
      port: 7002,
      proxy: 'http://127.0.0.1:7001/'
    })

  ]

//  // 提供静态服务
//   devServer:{ 
//     port: 9999,
//     historyApiFallback: true,
//     headers: { // 添加头部信息
//       "X-Custom-Foo": "bar"
//     },
//     proxy: { // 请求代理
//       "/api": {
//         target: "http://118.31.19.119:8082",
//         pathRewrite: { '^/api': '' }
//       },
//     }
//   },

}

if(isdev) {
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;