import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // base: './'
  resolve: {
    alias: [
      { find: '~', replacement: '/src' }
    ]
  },
  server: {
    host: '0.0.0.0', // Lắng nghe trên tất cả các IP
    port: 5173,       // Đảm bảo cổng là 5173
  }
  
})
