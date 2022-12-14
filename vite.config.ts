import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      //transform on: { click: xx } to onClick: xxx
      //merge static and dyn  amic class / style attributes / onXXX handlers
      // options are passed on to @vue/babel-plugin-jsx
      transformOn: true,
      mergeProps: true
    }),
  ],
})
