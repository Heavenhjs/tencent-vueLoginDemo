import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    // 本项目的本地端口，默认是 5174 端口
    port: 5173,
    // 浏览器自动打开
    // open: true,
    // 热更新
    hmr: {
      host: "127.0.0.1",
      port: 5173,
    },
    proxy: {
      "/api/v1/": {
        target: "http://139.196.123.244:9082/ability-evaluate",
        /**
         * changeOrigin的值是true,意味着服务器host设置成target
         */
        changeOrigin: true,
      },
    },
  },
})
