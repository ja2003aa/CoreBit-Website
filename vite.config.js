import { copyFileSync, existsSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/

/**
 * Real Windows ICO from favicon.png. Safari often ignores a PNG file renamed
 * to .ico (inconsistent tab icon vs generic placeholder).
 */
function faviconIcoFromPng() {
  return {
    name: 'favicon-ico-from-png',
    apply: 'build',
    async closeBundle() {
      const pngPath = resolve('dist/favicon.png')
      if (!existsSync(pngPath)) return
      const pngToIco = (await import('png-to-ico')).default
      const buf = await pngToIco(pngPath)
      writeFileSync(resolve('dist/favicon.ico'), buf)
    },
  }
}

/** GitHub Pages has no Netlify-style rewrites; 404.html must match index.html for SPA routes. */
function githubPagesSpaFallback() {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const indexHtml = resolve('dist/index.html')
      const notFoundHtml = resolve('dist/404.html')
      if (existsSync(indexHtml)) {
        copyFileSync(indexHtml, notFoundHtml)
      }
    },
  }
}

/** Bust favicon cache each deploy (GITHUB_RUN_NUMBER in Actions). */
function faviconCacheBust() {
  return {
    name: 'favicon-cache-bust',
    apply: 'build',
    transformIndexHtml(html) {
      const v =
        process.env.GITHUB_RUN_NUMBER ||
        process.env.GITHUB_SHA?.slice(0, 7) ||
        String(Date.now())
      return html
        .replace(/href="\/favicon\.ico"/g, `href="/favicon.ico?v=${v}"`)
        .replace(/href="\/favicon\.png"/g, `href="/favicon.png?v=${v}"`)
        .replace(/href="\/corebit-mark\.svg"/g, `href="/corebit-mark.svg?v=${v}"`)
    },
  }
}

export default defineConfig({
  plugins: [react(), faviconCacheBust(), faviconIcoFromPng(), githubPagesSpaFallback()],
  base: '/',
})
