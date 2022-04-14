/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import postcss from 'rollup-plugin-postcss';
import summary from 'rollup-plugin-summary';
import {terser} from 'rollup-plugin-terser';
import ts from 'rollup-plugin-ts';

export default {
  input: './src/index.ts',
  output: {
    file: './dist/index.bundled.js',
    format: 'esm',
  },
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
    summary(),
  ],
};
