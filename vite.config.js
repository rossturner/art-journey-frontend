import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/workspace': {
        target: 'https://ziedritz.art',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
