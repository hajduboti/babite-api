// var nodeExternals = require('webpack-node-externals')

// module.exports = {
//    entry: './src',
//    target: 'node',
//    externals: [nodeExternals()],
//    output: {
//       libraryTarget: 'commonjs',
//       path: 'lib',
//       filename: 'handler.js', // this should match the first part of function handler in serverless.yml
//    },
//    module: {
//       loaders: [
//          {
//             test: /\.jsx?$/,
//             exclude: /node_modules/,
//             loaders: ["babel-loader"]
//          }
//       ]
//    }
// };


module.exports = {
   module: {
     rules: [
       {
         test: /\.js$/,
         exclude: /node_modules/,
         use: [
           {
             loader: 'babel-loader',
             options: {
               presets: [
                 [
                   '@babel/preset-env',
                   { targets: { node: '12' }, useBuiltIns: 'usage', corejs: 3 }
                 ]
               ]
             }
           }
         ]
       }
     ]
   }
 }