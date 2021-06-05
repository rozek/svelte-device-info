import typescript from '@rollup/plugin-typescript';

export default {
  input: './svelte-device-info.ts',
  output: {
    dir: './',
    format: 'umd',  // builds for both Node.js and Browser
    name:'svelte-device-info', // required for UMD modules
    sourcemap: true,
    exports: 'default',
  },
  plugins: [typescript()],
};