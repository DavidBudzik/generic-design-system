// Build script for @gds/core — uses Vite's build API directly
import { build } from 'vite';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';

const outDir = resolve(import.meta.dirname, 'dist');
const stylesDir = resolve(import.meta.dirname, 'src/styles');

await build({
  logLevel: 'info',
  build: {
    lib: {
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    rollupOptions: {
      external: ['lit'],
      output: {
        preserveModules: true,
        dir: outDir,
        format: 'es',
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]',
      },
    },
    target: 'es2022',
    sourcemap: true,
    minify: false,
  },
});

// Copy CSS files to dist
if (existsSync(stylesDir)) {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  for (const file of readdirSync(stylesDir)) {
    if (file.endsWith('.css')) {
      copyFileSync(resolve(stylesDir, file), resolve(outDir, file));
      console.log(`copied ${file} -> dist/`);
    }
  }
}

console.log('GDS core build complete');