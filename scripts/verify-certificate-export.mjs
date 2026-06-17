/**
 * Verifies certificate PNG export works without html2canvas oklab/oklch errors.
 */
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const require = createRequire(import.meta.url);
const BASE_URL = process.env.BASE_URL ?? 'http://127.0.0.1:3000';
const html2canvasPath = require.resolve('html2canvas/dist/html2canvas.min.js');
const compatBundlePath = fileURLToPath(
  new URL('./.html2canvas-color-compat.bundle.js', import.meta.url)
);

execSync(
  `npx esbuild lib/html2canvas-color-compat.ts --bundle --format=iife --global-name=Html2CanvasColorCompat --outfile=${compatBundlePath}`,
  { stdio: 'inherit' }
);

const compatBundle = readFileSync(compatBundlePath, 'utf8');

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const errors = [];

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  try {
    await page.goto(BASE_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });

    await page.addScriptTag({ content: compatBundle });
    await page.addScriptTag({ path: html2canvasPath });

    const result = await page.evaluate(async () => {
      const {
        inlineCompatColorsForHtml2Canvas,
        createHtml2CanvasOnClone,
        collectUnsupportedColors,
      } = Html2CanvasColorCompat;

      const container = document.createElement('div');
      container.className =
        'relative mx-auto aspect-[800/560] w-full max-w-2xl overflow-hidden rounded-lg border-4 border-unlock/50 bg-bg-secondary p-8 text-center';
      container.style.width = '800px';
      container.style.height = '560px';
      container.innerHTML = `
        <div class="absolute inset-4 border border-unlock/20 rounded"></div>
        <h2 class="font-display text-2xl font-bold text-unlock mb-2">CHỨNG NHẬN</h2>
        <p class="text-sm text-text-secondary mb-6">Phật Quang Quyền</p>
        <p class="font-display text-3xl font-bold text-text-primary mb-4">Môn sinh</p>
        <p class="font-display text-xl font-semibold text-unlock mb-6">Đai Nâu</p>
        <p class="text-sm text-text-muted">Ngày ghi nhận: 16/06/2026</p>
      `;
      document.body.appendChild(container);

      const computedBorder = window.getComputedStyle(container).borderTopColor;
      const computedBackground = window.getComputedStyle(container).backgroundColor;
      const hasModernColors =
        /oklab|oklch|color-mix/i.test(computedBorder) ||
        /oklab|oklch|color-mix/i.test(computedBackground);

      const clone = container.cloneNode(true);
      document.body.appendChild(clone);
      inlineCompatColorsForHtml2Canvas(container, clone);

      const unsupportedInline = collectUnsupportedColors(clone);
      let canvasError = null;
      let canvasSize = null;

      try {
        const canvas = await window.html2canvas(container, {
          scale: 1,
          backgroundColor: '#1A1814',
          useCORS: true,
          onclone: createHtml2CanvasOnClone(container),
        });
        canvasSize = { width: canvas.width, height: canvas.height };
      } catch (error) {
        canvasError = error instanceof Error ? error.message : String(error);
      } finally {
        container.remove();
        clone.remove();
      }

      return {
        computedBorder,
        computedBackground,
        hasModernColors,
        canvasError,
        canvasSize,
        unsupportedInline,
      };
    });

    console.log('Computed border color:', result.computedBorder);
    console.log('Computed background color:', result.computedBackground);
    console.log('Browser exposes modern color functions:', result.hasModernColors);
    console.log('Canvas size:', result.canvasSize);
    console.log('Unsupported inline colors after sanitization:', result.unsupportedInline);
    console.log('Canvas error:', result.canvasError ?? 'none');

    if (result.canvasError) {
      throw new Error(result.canvasError);
    }
    if (!result.canvasSize?.width || !result.canvasSize?.height) {
      throw new Error('html2canvas did not produce a canvas');
    }
    if (result.unsupportedInline.length > 0) {
      throw new Error(
        `Unsupported colors remain after sanitization: ${result.unsupportedInline.join(', ')}`
      );
    }
    if (errors.some((message) => /oklab|oklch|unsupported color function/i.test(message))) {
      throw new Error(`Page reported color parse errors: ${errors.join(' | ')}`);
    }

    console.log('Certificate export verification passed.');
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
