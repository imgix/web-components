/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import {getBabelOutputPlugin} from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import process from 'process';
import postcss from 'rollup-plugin-postcss';
import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';

const devMode = process.env.NODE_ENV === 'development';
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

export default {
  input: './src/index.ts',
  output: [
    // ES bundle
    {
      file: './dist/index.bundled.js',
      format: 'esm',
    },
    // IIFE bundle
    {
      file: './dist/index.cjs.bundled.js',
      format: 'cjs',
    },
  ],
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      console.error(`(!) ${warning.message}`);
    }
  },
  plugins: [
    ts(),
    replace({'Reflect.decorate': 'undefined', preventAssignment: true}),
    resolve(),
    terser({
      ecma: 2017,
      module: true,
      warnings: true,
      mangle: {
        properties: {
          regex: /^__/,
        },
      },
    }),
    postcss({
      plugins: [],
    }),
    commonjs(),
    getBabelOutputPlugin({
      presets: [
        [
          '@babel/env',
          {
            targets: {
              // target browsers with module support
              esmodules: true,
            },
            exclude: ['proposal-dynamic-import'],
          },
        ],
      ],
    }),
    summary(),
  ],
};
