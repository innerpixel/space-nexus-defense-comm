import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: '/space-nexus-defense-comm/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['vue', 'vue-router', 'pinia'],
          'ai': ['@tensorflow/tfjs', 'face-api.js'],
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'favicon.ico') return 'favicon.ico'
          return 'assets/[name]-[hash][extname]'
        }
      }
    }
  },
  server: {
    fs: {
      strict: false
    }
  }
})
