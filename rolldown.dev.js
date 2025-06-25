import { defineConfig } from 'rolldown';
import { dts } from 'rolldown-plugin-dts';

export default defineConfig({
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    sourcemap: true,
    minify: false,
    format: 'es',
  },
  plugins: [
    dts(),
  ]
});
