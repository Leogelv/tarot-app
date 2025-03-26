import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    // Лучшая поддержка JSX в .js файлах
    include: "**/*.{jsx,js}",
  })],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    // Избегаем конфликтов HMR
    hmr: {
      overlay: false
    },
  },
  base: '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: true, // Включаем sourcemaps для отладки
    // Отключаем минификацию для отладки проблем
    minify: process.env.NODE_ENV === 'production',
  },
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.jsx?$/,
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  optimizeDeps: {
    // Отключаем определенные оптимизации, которые могут вызывать конфликты
    exclude: ['three'],
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  // Отключаем разделение чанков
  experimental: {
    renderBuiltUrl(filename) {
      return filename;
    },
  },
}); 