// Build script for @gds/core
// Uses tsc for JS+declaration output, then copies CSS files to dist
import { execSync } from 'child_process';
import { copyFileSync, mkdirSync, readdirSync, existsSync } from 'fs';
import { resolve } from 'path';

const outDir = resolve(import.meta.dirname, 'dist');
const stylesDir = resolve(import.meta.dirname, 'src/styles');

// Step 1: Compile TypeScript to JS + declarations
console.log('Compiling TypeScript...');
execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit', cwd: import.meta.dirname });

// tsc with --emitDeclarationOnly only produces .d.ts files.
// We need full JS output too. Let's use tsc for everything.
execSync('npx tsc', { stdio: 'inherit', cwd: import.meta.dirname });

// Step 2: Copy CSS files to dist root
if (existsSync(stylesDir)) {
  if (!existsSync(outDir)) mkdirSync(outDir, { recursive: true });
  for (const file of readdirSync(stylesDir)) {
    if (file.endsWith('.css')) {
      copyFileSync(resolve(stylesDir, file), resolve(outDir, file));
      console.log(`copied ${file} -> dist/`);
    }
  }
}

// Verify output
const componentCount = countFiles(outDir, '.js');
const cssCount = countFiles(outDir, '.css');
console.log(`Build complete: ${componentCount} JS files, ${cssCount} CSS files`);

function countFiles(dir, ext) {
  let count = 0;
  const walk = (d) => {
    for (const entry of readdirSync(d, { withFileTypes: true })) {
      const full = resolve(d, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules') walk(full);
      else if (entry.name.endsWith(ext)) count++;
    }
  };
  walk(dir);
  return count;
}