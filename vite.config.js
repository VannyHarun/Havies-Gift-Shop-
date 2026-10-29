import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.GITHUB_ACTIONS && repositoryName && !repositoryName.endsWith('.github.io')
  ? `/${repositoryName}/`
  : '/'

// https://vitejs.dev/config/
export default defineConfig({
  base,
  plugins: [
    react(),
    {
      name: 'standalone-store-dev-root',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((request, response, next) => {
          if (request.url?.split('?')[0] !== '/') return next()
          response.statusCode = 302
          response.setHeader('Location', '/index-standalone.html')
          response.end()
        })
      }
    }
  ],
  server: {
    port: 3000,
    open: false
  }
})
