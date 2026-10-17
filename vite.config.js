import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { spawn } from 'node:child_process'
import { createConnection } from 'node:net'
import path from 'node:path'

function startApiServer() {
  let apiProcess
  const apiPort = 5001

  return {
    name: 'start-api-server',
    configureServer() {
      const serverPath = path.resolve(import.meta.dirname, '../server/index.js')

      const startIfUnavailable = () => {
        apiProcess = spawn(process.execPath, [serverPath], {
          cwd: path.dirname(serverPath),
          stdio: 'inherit',
          windowsHide: false,
        })

        apiProcess.once('error', (error) => {
          console.error('Unable to start the Panchangam API:', error.message)
        })

        process.once('exit', stopApiServer)
        process.once('SIGINT', stopApiServer)
        process.once('SIGTERM', stopApiServer)
      }

      const apiCheck = createConnection({ host: 'localhost', port: apiPort })
      apiCheck.once('connect', () => {
        apiCheck.destroy()
      })
      apiCheck.once('error', () => {
        apiCheck.destroy()
        startIfUnavailable()
      })

      function stopApiServer() {
        if (apiProcess && !apiProcess.killed) {
          apiProcess.kill()
          apiProcess = undefined
        }
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [startApiServer(), react(), tailwindcss()],
  server: {
    proxy: {
      '/admin': {
        target: 'http://localhost:5175',
        changeOrigin: true,
      },
      '/api': 'http://127.0.0.1:5001',
      '/uploads': 'http://127.0.0.1:5001',
    },
  },
})
