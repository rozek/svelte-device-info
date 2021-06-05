// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input: './svelte-device-info.ts',
  output: {
    dir: './',
    format: 'umd', // builds for both Node.js and Browser
    name:'Device', // required for UMD modules
    noConflict:true,
    sourcemap: true,
    exports: 'default',
  },
  plugins: [typescript(), terser()],
};