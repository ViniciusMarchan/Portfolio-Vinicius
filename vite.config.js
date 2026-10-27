import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { env } from 'node:process'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // O homepage público do repositório declara domínio próprio.
  // Para Pages sem domínio: VITE_BASE_PATH=/Portfolio-Vinicius/.
  base: env.VITE_BASE_PATH || '/',
})
