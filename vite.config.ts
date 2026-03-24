import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { compressAssetPlugin } from './vite-plugin-compress-assets'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), compressAssetPlugin()],
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': ['lucide-react'],
        },
      },
    },
    cssCodeSplit: true,
    minify: 'esbuild',
    target: 'esnext',
    reportCompressedSize: true,
  },
})
