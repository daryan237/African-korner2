import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT : base: './' pour que Vercel charge le CSS et JS correctement
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'build',  // IMPORTANT : on change dist -> build pour correspondre à Vercel
    sourcemap: false,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
