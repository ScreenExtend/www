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

function heroImagePreload(): Plugin {
  return {
    name: 'hero-image-preload',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(html, ctx) {
        const bundle = ctx.bundle
        if (!bundle) return html
        const files = Object.keys(bundle)
        const full = files.find(
          (f) => /assets\/feature-1-[A-Za-z0-9_-]+\.webp$/.test(f) && !f.includes('feature-1-760'),
        )
        const small = files.find((f) => /assets\/feature-1-760-[A-Za-z0-9_-]+\.webp$/.test(f))
        if (!full || !small) return html
        const tag =
          `<link rel="preload" as="image" type="image/webp" ` +
          `imagesrcset="/${small} 760w, /${full} 1369w" ` +
          `imagesizes="(min-width: 1024px) 36rem, 100vw" fetchpriority="high">`
        return html.replace('</head>', `    ${tag}\n  </head>`)
      },
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), heroImagePreload(), spaFallback()],
  resolve: {
    alias: {
      '@': path.resolve(path.resolve(), 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (
            /[\\/]node_modules[\\/](react|react-dom|scheduler|react-router|react-router-dom|@remix-run)[\\/]/.test(
              id,
            )
          ) {
            return 'react-vendor'
          }
        },
      },
    },
  },
  server: {
    allowedHosts: ["3eb9-73-93-177-73.ngrok-free.app"]
  }
})
