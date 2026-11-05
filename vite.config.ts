import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// VITE_BASE задаёт подпапку сайта: «/denvorko/» на GitHub Pages или «/» на своём домене.
export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  plugins: [react()],
  ssgOptions: {
    dirStyle: 'nested',
    script: 'async',
  },
})
