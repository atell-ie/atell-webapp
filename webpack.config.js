const path = require("path");
const DefinePlugin = require("webpack").DefinePlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const package = require("./package");

module.exports = (env = {}) => {
    const host = JSON.stringify(env.host);
    // Keep this comment for Development purposes
    console.log("ENVIRONMENT:", host);
    const version = JSON.stringify(package.version);

    return {
        devServer: {
            port: 3001,
            // hot: true,
            historyApiFallback: true,
            allowedHosts: "all"
        },
        mode: host === "prod" ? "production" : "development",
        devtool: host === "prod" ? "source-map" : "inline-source-map",
        cache: {
            type: "filesystem"
        },
        entry: ["./index.js"],
        module: {
            rules: [
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheCompression: false,
                            cacheDirectory: true,
                            presets: [
                                [
                                    "@babel/preset-env",
                                    {
                                        debug: false,
                                        useBuiltIns: "usage",
                                        corejs: 3
                                    }
                                ],
                                "@babel/preset-react"
                            ]
                        }
                    }
                },
                {
                    test: /\.m?js$/, // 🔥 ADD THIS 🔥
                    resolve: {
                        fullySpecified: false
                    }
                },
                {
                    test: /\.mp4$/,
                    use: "file-loader?name=videos/[name].[ext]"
                },
                {
                    test: /\.css$/i,
                    use: ["css-loader"] //"style-loader", 
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: "asset/resource"
                }
            ]
        },        
        // optimization: {
        //     splitChunks: {
        //         chunks: "all",
        //     },
        // },
        watchOptions: {
            ignored: [
                "__tests__",
                "resources",
                "scripts",
                "statis",
                "node_modules"
            ]
        },
        output: {
            path: path.resolve(__dirname, "public/"),
            publicPath: "/",
            filename: "[name].js"
        },
        resolve: {
            extensions: [".js", ".jsx", ".json"],
            modules: [path.resolve(__dirname, "node_modules"), "node_modules"]
        },        
        plugins: [
            new DefinePlugin({
                "process.env": {
                    HOST: host,
                    version: `${version}`
                }
            }),
            new HtmlWebpackPlugin({
                hash: true,
                title: package.description,
                template: "./index.html",
                filename: "./index.html"
            })
            // new CopyWebpackPlugin({
            //     patterns: [{ from: "static", to: "static" }],
            // }),
        ]
    };
};
