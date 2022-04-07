import {resolve} from 'path';
import {defineConfig} from 'vite';

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './dev'),
    },
  },
  build: {
    cssCodeSplit: true,
    lib: {
      name: 'lib',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['umd'],
      fileName: (format) => {
        if (format === 'es') return `index.bundled.mjs`;
        if (format === 'cjs') return `index.bundled.cjs`;
        return `index.bundled.${format}.js`;
      },
    },
  },
  test: {
    globals: true,
    environment: 'happy-dom',
  },
});
