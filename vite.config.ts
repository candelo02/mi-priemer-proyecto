import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 5173,
    proxy: {
      // Redirige /api/* al servidor Express en el puerto 3001
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        // No se hace rewrite: /api/pqrs -> http://localhost:3001/api/pqrs
      },
    },
  },
})