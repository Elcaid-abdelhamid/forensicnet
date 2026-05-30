import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    proxy: {
      '/predict': 'http://localhost:7860',
      '/health': 'http://localhost:7860',
    }
  }
})