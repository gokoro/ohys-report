import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import styleX from 'vite-plugin-stylex'
import { stylexPlugin } from 'vite-plugin-stylex-dev'

// https://vitejs.dev/config/
export default defineConfig((config) => {
  const { mode } = config

  return {
    plugins: [react(), mode === 'development' ? stylexPlugin() : styleX()],
  }
})
