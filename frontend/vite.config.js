import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  server:{
    port: 5173,
    allowedHosts:["63888688d733.ngrok-free.app"]
  },
  plugins: [react(),tailwindcss()],
})
