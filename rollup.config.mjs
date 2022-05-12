/**
 * @license
 * Copyright 2018 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import process from 'process';
import postcss from 'rollup-plugin-postcss';
import postcssLit from 'rollup-plugin-postcss-lit';
import summary from 'rollup-plugin-summary';
import ts from 'rollup-plugin-ts';

const devMode = process.env.NODE_ENV === 'development';
console.log(`${devMode ? 'development' : 'production'} mode bundle`);

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
    postcss(),
    postcssLit(),
    commonjs(),
    summary(),
  ],
};
