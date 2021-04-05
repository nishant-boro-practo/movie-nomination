var path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    writeToDisk: true,
    hot: true,
    watchContentBase: true,
    host: "localhost",
    port: 3000,
    open: true,
  },
});
