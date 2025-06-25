import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';
import del from 'rollup-plugin-delete';

export default defineConfig({
  input: 'src/index.ts',
  treeshake: true,
  output: [
    {
      dir: 'dist',
      minify: true,
      format: 'es',
    },
  ],
  plugins: [
    dts(),
    del({ targets: 'dist' })
  ]
});
