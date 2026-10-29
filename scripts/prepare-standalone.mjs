import { copyFile, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const vendorDirectory = resolve(projectRoot, 'public/vendor');

await mkdir(vendorDirectory, { recursive: true });

for (const [source, destination] of [
  ['node_modules/react/umd/react.production.min.js', 'react.production.min.js'],
  ['node_modules/react-dom/umd/react-dom.production.min.js', 'react-dom.production.min.js'],
  ['node_modules/@babel/standalone/babel.min.js', 'babel.min.js'],
]) {
  await copyFile(resolve(projectRoot, source), resolve(vendorDirectory, destination));
}
