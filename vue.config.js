const { defineConfig } = require("@vue/cli-service")
const path = require("path")

const minify =
  process.env.NODE_ENV === "development"
    ? false
    : {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true
      }

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = defineConfig({
  publicPath:
    process.env.NODE_ENV === "production" ? "/form-generator-vue3/" : "/",
  pages: {
    index: {
      entry: "src/views/index/main.ts",
      template: "public/index.html",
      filename: "index.html",
      chunks: ["chunk-vendors", "chunk-common", "index"],
      minify
    }
  },
  devServer: {
    overlay: false
  },
  productionSourceMap: false,
  configureWebpack: {},
  chainWebpack(config) {
    // set svg-sprite-loader
    config.module.rule("svg").exclude.add(resolve("src/icons")).end()
    config.module
      .rule("icons")
      .test(/\.svg$/)
      .include.add(resolve("src/icons"))
      .end()
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]"
      })
      .end()
  },
  transpileDependencies: true
})
