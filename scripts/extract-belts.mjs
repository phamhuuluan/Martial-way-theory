/**
 * Extract individual belt icons from the PQQ training program poster (IMG_1422.JPG).
 * Requires: python3 with Pillow in .venv-image (see scripts/setup-image-venv.sh)
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const python = path.join(root, '.venv-image', 'bin', 'python3');
const script = path.join(root, 'scripts', 'lib', 'extract-belts.py');

const result = spawnSync(python, [script], { stdio: 'inherit', cwd: root });
process.exit(result.status ?? 1);
