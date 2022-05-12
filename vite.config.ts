import {resolve} from 'path';
import pkg from 'vite';
const {defineConfig} = pkg;

export default defineConfig({
  publicDir: false,
  resolve: {
    alias: {
      '~': resolve(__dirname, './src'),
      '@': resolve(__dirname, './dev'),
    },
  },
  build: {
    emptyOutDir: false,
    cssCodeSplit: true,
    lib: {
      name: 'lib',
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['umd', 'es'],
      fileName: (format) => {
        if (format === 'es') return `index.bundled.mjs`;
        return `index.bundled.${format}.js`;
      },
    },
  },
});
