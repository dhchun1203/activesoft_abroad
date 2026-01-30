import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  build: {
    // 빌드 최적화 설정
    minify: 'esbuild',
    target: 'es2015',
    cssCodeSplit: true,
    // 소스맵 비활성화로 빌드 크기 감소 (프로덕션)
    sourcemap: false,
    // 빌드 시 불필요한 주석 제거
    terserOptions: {
      compress: {
        drop_console: true, // console.log 제거
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // node_modules 의존성을 별도 청크로 분리
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor';
            }
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor';
            }
            return 'vendor';
          }
          // 큰 컴포넌트를 별도 청크로 분리
          if (id.includes('ProductSection')) {
            return 'product-section';
          }
        },
        // 청크 파일명 최적화
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/css/[name]-[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(png|jpe?g|svg|gif|webp)$/)) {
            return 'assets/images/[name]-[hash][extname]';
          }
          if (assetInfo.name?.match(/\.(mp4|webm|ogg)$/)) {
            return 'assets/videos/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // 청크 크기 경고 임계값 증가
    chunkSizeWarningLimit: 1000,
    // 빌드 성능 최적화
    reportCompressedSize: false, // 압축 크기 보고 비활성화로 빌드 속도 향상
  },
  // 개발 서버 최적화
  server: {
    hmr: {
      overlay: true,
    },
  },
  // 정적 파일 최적화
  assetsInclude: ['**/*.mp4', '**/*.png', '**/*.jpg'],
})

