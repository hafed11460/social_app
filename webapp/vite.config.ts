import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import { resolve } from "path";
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react(),],
  resolve: {
    alias: {
      '@components': resolve(__dirname, 'src/components'),
      '@assets': resolve(__dirname, 'src/assets'),
      // '@layouts': resolve(__dirname, 'src/layouts'),
    },
  },
  server: {
    open: true,
  },
  build: {
     manifest: true,
    rollupOptions: {
      assetFileNames:()=>{
        return "assets/js/index.min.css"
      },
      entryFileNames:()=>{
        return "assets/js/[name].min.css"
      }
      // overwrite default .html entry
    },
  },
  // build: {
  //   outDir: "build",
  //   sourcemap: true,
  // },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
