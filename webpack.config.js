const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WorkboxWebpackPlugin = require("workbox-webpack-plugin");

const isProduction = process.env.NODE_ENV === "production";

const stylesHandler = MiniCssExtractPlugin.loader;

const config = {
  entry: "./src/client/index.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Specify an output filename
    publicPath: "/", // Ensure correct public path
  },
  mode: "development",
  resolve: {
    extensions: [".ts", ".js", "tsx", "jsx"],
  },
  devServer: {
    open: true,
    host: "localhost",
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "dist"),
      publicPath: "/dist",
    },
    proxy: [
      {
        context: ["/api"],
        target: "http://localhost:3000",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/client/index.html",
    }),

    new MiniCssExtractPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(css)$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: "asset",
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: "ts-loader",
        resolve: {
          extensions: [".ts", ".tsx", ".js", ".json"],
        },
      },
    ],
  },
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
  } else {
    config.mode = "development";
  }
  return config;
};