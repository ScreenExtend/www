import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { copyFileSync, existsSync } from 'fs'

function spaFallback(): Plugin {
  return {
    name: 'spa-404-fallback',
    apply: 'build',
    closeBundle() {
      const index = path.resolve('dist/index.html')
      if (existsSync(index)) {
        copyFileSync(index, path.resolve('dist/404.html'))
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(path.resolve(), 'src'),
    },
  },
})
