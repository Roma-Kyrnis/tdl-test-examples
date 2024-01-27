import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  sourcemap: true,
  clean: true,
  shims: true,
  dts: true,
  format: 'esm',
  outDir: 'dist',
  platform: 'node',
  splitting: true,
});
