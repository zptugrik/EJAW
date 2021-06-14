const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    devtool: "inline-source-map",
    entry: "./src/app.ts",
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "docs")
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            { test: /\.ts$/, use: ["ts-loader"] },
            { test: /\.(png|jpg|jpeg|gif|svg)$/, use: "file-loader" }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "homepage",
            template: path.join(__dirname, "index.html")
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        port: 8100,
        historyApiFallback: true,
        hot: true,
        open: true
    },
    externals: {

    }
};