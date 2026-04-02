import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          reactVendor: ['react', 'react-dom', 'react-refresh']
        }
      }
    },
    minify: 'terser',
    terserOptions: {}
  },
  server: {
    port: 2001,
    warmup: {
      clientFiles: ['./src/main.tsx']
    }
  }
})
