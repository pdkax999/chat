import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
const name = "IChat";

export default defineConfig({
    plugins: [ // 必有插件
        VueJsx(),
        vue()
    ],
    resolve: {
        alias: { // 路径别名
            "@": resolve(__dirname, 'src'),
        }
    },
    configureWebpack: {
        name: name,
        resolve: {
          alias: {
            "@": resolve("src"),
          },
          extensions: [".js", ".vue", ".json", ".ts"],
        },
      },
      chainWebpack(config) {
        config.plugins.delete("preload"); // TODO: need test
        config.plugins.delete("prefetch"); // TODO: need test
        config.module
          .rule("images")
          .use("url-loader")
          .loader("url-loader")
          .tap((options) => {
            options.limit = 999999999;
            return options;
          })
          .end();
      },
})
