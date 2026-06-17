#!/usr/bin/env node
/**
 * Syncs source assets into public/ for static export.
 * - assets/illustrations/ → public/assets/
 * - assets/doc/ → public/assets/doc/ + content/documents.json
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { basename, join } from 'node:path';

const root = process.cwd();
const sourceRoot = join(root, 'assets', 'illustrations');
const publicRoot = join(root, 'public', 'assets');
const docSource = join(root, 'assets', 'doc');
const docTarget = join(publicRoot, 'doc');

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

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes}B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)}KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`;
}

function findDocFile(expectedName) {
  if (!existsSync(docSource)) return null;

  const files = readdirSync(docSource);
  const normalized = expectedName.normalize('NFC').toLowerCase();
  const exact = files.find((f) => f.normalize('NFC').toLowerCase() === normalized);
  if (exact) return join(docSource, exact);

  const num = expectedName.match(/^\d+/);
  const partial = files.find((f) => num && f.startsWith(num[0]));
  return partial ? join(docSource, partial) : null;
}

function buildDocumentEntry(entry, srcPath) {
  const fileName = basename(srcPath);
  const destPath = join(docTarget, fileName);
  cpSync(srcPath, destPath, { force: true });

  const stat = statSync(srcPath);
  return {
    id: entry.id,
    title: entry.title,
    description: entry.description ?? entry.subtitle,
    type: 'docx',
    size: formatBytes(stat.size),
    url: `/assets/doc/${encodeURIComponent(fileName)}`,
    fileName,
    updatedAt: stat.mtime.toISOString().slice(0, 10),
    beltId: entry.belt ?? entry.beltId,
    courseId: entry.courseId,
    lessonId: entry.lessonId ?? entry.id,
    order: entry.order,
  };
}

function syncExtraDocuments() {
  const extraPath = join(root, 'content', 'extra-documents.json');
  if (!existsSync(extraPath)) return [];

  const extra = JSON.parse(readFileSync(extraPath, 'utf-8'));
  const documents = [];

  for (const entry of extra) {
    const srcPath = findDocFile(entry.file);
    if (!srcPath) {
      console.warn(`Extra doc not found: ${entry.file}`);
      continue;
    }

    documents.push(buildDocumentEntry(entry, srcPath));
  }

  return documents;
}

function syncLessonDocuments() {
  const manifestPath = join(root, 'content', 'manifest.json');
  if (!existsSync(manifestPath)) {
    console.warn('content/manifest.json not found — skip doc sync');
    return;
  }

  mkdirSync(docTarget, { recursive: true });
  const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'));
  const documents = [];

  for (const entry of manifest) {
    const srcPath = findDocFile(entry.file);
    if (!srcPath) {
      console.warn(`Doc not found for ${entry.id}: ${entry.file}`);
      continue;
    }

    documents.push(buildDocumentEntry(entry, srcPath));
  }

  documents.push(...syncExtraDocuments());
  documents.sort((a, b) => a.order - b.order);

  writeFileSync(
    join(root, 'content', 'documents.json'),
    JSON.stringify(documents, null, 2),
    'utf-8'
  );

  console.log(`Synced assets/doc → public/assets/doc (${documents.length} files)`);
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

syncLessonDocuments();

console.log('Synced assets/illustrations → public/assets');
