import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '127.0.0.1',  // Explicitly bind to IPv4 to fix connection issues
    port: 5173,
    strictPort: true
  }
})
