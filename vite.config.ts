import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function serverlessDevPlugin() {
  return {
    name: 'serverless-dev-middleware',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || ''
        if (!url.startsWith('/api/')) return next()
        try {
          const route = url.replace(/^\/api\//, '').split('?')[0]
          const handlerPath = path.resolve(process.cwd(), 'server', 'handlers', `${route}.ts`)
          const mod = await server.ssrLoadModule(handlerPath)
          const handle = mod.handle || (mod.default && (mod.default.handle || mod.default))
          if (typeof handle !== 'function') {
            res.statusCode = 500
            res.end('Handler not found')
            return
          }

          const origin = `${req.headers['x-forwarded-proto'] || 'http'}://${req.headers.host || 'localhost'}`
          const fullUrl = new URL(req.url!, origin)

          const headers = new Headers()
          for (const [k, v] of Object.entries(req.headers)) {
            if (Array.isArray(v)) {
              v.forEach(val => headers.append(k, val))
            } else if (v != null) {
              headers.set(k, String(v))
            }
          }

          const method = req.method || 'GET'
          let bodyInit: any = undefined
          if (method !== 'GET' && method !== 'HEAD') {
            const chunks: Buffer[] = []
            await new Promise<void>((resolve, reject) => {
              req.on('data', (chunk) => chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)))
              req.on('end', () => resolve())
              req.on('error', reject)
            })
            bodyInit = Buffer.concat(chunks)
          }

          const request = new Request(fullUrl.toString(), {
            method,
            headers,
            body: bodyInit,
          })

          const response: Response = await handle(request)

          res.statusCode = response.status
          response.headers.forEach((value, key) => {
            if (key.toLowerCase() === 'content-length') return
            res.setHeader(key, value)
          })

          const body = response.body
          if (body) {
            const reader = body.getReader()
            const pump = async () => {
              try {
                while (true) {
                  const { done, value } = await reader.read()
                  if (done) break
                  res.write(Buffer.from(value))
                }
                res.end()
              } catch {
                res.end()
              }
            }
            pump()
          } else {
            const text = await response.text()
            res.end(text)
          }
        } catch (err) {
          server.ssrFixStacktrace(err as Error)
          res.statusCode = 500
          res.end('API error')
        }
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), serverlessDevPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
})