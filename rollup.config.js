// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './src/svelte-device-info.ts',
  output: [
    {
      file:     './dist/svelte-device-info.js',
      format:    'umd', // builds for both Node.js and Browser
      name:      'Device', // required for UMD modules
      noConflict:true,
      sourcemap: true,
      exports:   'default',
    },{
      file:     './dist/svelte-device-info.esm.js',
      format:   'esm',
      sourcemap:true
    }
  ],
  plugins: [
    commonjs(), resolve(), typescript(),
    terser({ format:{ comments:false } })
  ],
};