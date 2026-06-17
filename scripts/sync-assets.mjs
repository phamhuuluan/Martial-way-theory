#!/usr/bin/env node
/**
 * Syncs source illustration assets into public/ for static export.
 * Source: assets/illustrations/
 * Target: public/assets/
 */
import { cpSync, existsSync, mkdirSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'assets', 'illustrations');
const publicRoot = join(root, 'public', 'assets');

function syncDir(relativePath) {
  const source = join(sourceRoot, relativePath);
  const target = join(publicRoot, relativePath);

  if (!existsSync(source)) return;

  mkdirSync(target, { recursive: true });

  for (const entry of readdirSync(source, { withFileTypes: true })) {
    if (entry.name.startsWith('.')) continue;

    const from = join(source, entry.name);
    const to = join(target, entry.name);

    if (entry.isDirectory()) {
      syncDir(join(relativePath, entry.name));
    } else {
      cpSync(from, to, { force: true });
    }
  }
}

mkdirSync(publicRoot, { recursive: true });

// World PNGs (flat in assets/illustrations/)
mkdirSync(join(publicRoot, 'worlds'), { recursive: true });
for (const entry of readdirSync(sourceRoot, { withFileTypes: true })) {
  if (!entry.isFile() || !entry.name.endsWith('.png')) continue;
  cpSync(
    join(sourceRoot, entry.name),
    join(publicRoot, 'worlds', entry.name),
    { force: true }
  );
}

// Achievement badge SVG + PNG
syncDir('achievements');

console.log('Synced assets/illustrations → public/assets');
