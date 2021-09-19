import { defineConfig } from 'vite'
import Vue from "@vitejs/plugin-vue";
import path from "path";
export default defineConfig({
  plugins: [
      Vue({
          include: [/\.vue$/],
          script: {
              refSugar: true,
          },
      }),
  ],
    resolve: {
        alias: {
            "~/": `${path.resolve(__dirname, "src")}/`,
        },
    },
})
