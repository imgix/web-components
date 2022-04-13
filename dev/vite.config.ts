import {resolve} from 'path';
import pkg from 'vite';
import viteConfig from '../vite.config';
const {defineConfig} = pkg;

export default defineConfig({
  ...viteConfig,
  root: resolve(__dirname, './'),
  publicDir: resolve(__dirname, './public'),
});
