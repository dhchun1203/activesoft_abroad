import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/DaeHwan/activesoft_abroad/',
  build: {
    // 빌드 최적화 설정
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'i18n-vendor': ['react-i18next', 'i18next'],
        },
      },
    },
    // 청크 크기 경고 임계값 증가
    chunkSizeWarningLimit: 1000,
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: true,
    },
  },
})

