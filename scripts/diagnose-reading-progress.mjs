/**
 * Reproduces reading-progress behavior on a live lesson page.
 * Run while dev server is up: node scripts/diagnose-reading-progress.mjs
 */
import { chromium } from 'playwright';

const LESSON_URL =
  process.env.LESSON_URL ?? 'http://127.0.0.1:3004/world/brown/lesson-01';

async function readDiagnostics(page) {
  return page.evaluate(() => {
    const progressText = [...document.querySelectorAll('p.text-text-muted')]
      .map((el) => el.textContent?.trim())
      .find((text) => text && /^\d+%/.test(text));

    const percentMatch = progressText?.match(/^(\d+)%/);
    const displayedPercent = percentMatch ? Number(percentMatch[1]) : null;

    const readingRoot = document.querySelector('.prose-lesson')?.parentElement;
    const prose = document.querySelector('.prose-lesson');

    const scrollContainerCandidates = [];
    let node = (readingRoot ?? prose)?.parentElement ?? null;
    while (node) {
      const style = window.getComputedStyle(node);
      const overflowY = style.overflowY;
      const scrollable =
        (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') &&
        node.scrollHeight > node.clientHeight + 1;
      scrollContainerCandidates.push({
        tag: node.tagName.toLowerCase(),
        className: node.className,
        overflowY,
        scrollHeight: node.scrollHeight,
        clientHeight: node.clientHeight,
        scrollTop: node.scrollTop,
        scrollable,
      });
      node = node.parentElement;
    }

    const measure = (el) => {
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const viewportBottom = window.innerHeight - 152;
      const viewed = Math.min(
        el.scrollHeight,
        Math.max(0, viewportBottom - rect.top)
      );
      return {
        scrollHeight: el.scrollHeight,
        clientHeight: el.clientHeight,
        rectTop: rect.top,
        rectBottom: rect.bottom,
        computedPercent: el.scrollHeight
          ? Math.floor((viewed / el.scrollHeight) * 100)
          : 0,
      };
    };

    return {
      displayedPercent,
      progressText,
      window: {
        scrollY: window.scrollY,
        innerHeight: window.innerHeight,
        documentScrollHeight: document.documentElement.scrollHeight,
        bodyScrollHeight: document.body.scrollHeight,
      },
      readingRoot: measure(readingRoot),
      prose: measure(prose),
      scrollContainerCandidates,
    };
  });
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(LESSON_URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForFunction(
      () => !document.body.textContent?.includes('Đang tải hành trình'),
      undefined,
      { timeout: 20000 }
    );
    await page.waitForTimeout(500);

    // Complete onboarding modal if it blocks the page.
    const onboardingInput = page.locator('input[type="text"]');
    if (await onboardingInput.isVisible().catch(() => false)) {
      await onboardingInput.fill('Test User');
      await page.locator('form button[type="submit"]').click();
      await page.waitForTimeout(800);
    }

    await page.locator('.prose-lesson').waitFor({ state: 'attached', timeout: 15000 });

    const samples = [];
    samples.push({ label: 'initial', ...(await readDiagnostics(page)) });

    await page.evaluate(() => window.scrollTo(0, 800));
    await page.waitForTimeout(400);
    samples.push({ label: 'scroll-800', ...(await readDiagnostics(page)) });

    const scrollDiagnostics = await page.evaluate(() => {
      const root = document.querySelector('.prose-lesson')?.parentElement;
      const measure = () => {
        if (!root) return null;
        const rect = root.getBoundingClientRect();
        const viewed = Math.min(
          root.scrollHeight,
          Math.max(0, window.innerHeight - 152 - rect.top)
        );
        return Math.floor((viewed / root.scrollHeight) * 100);
      };
      return {
        rootExists: !!root,
        rootScrollHeight: root?.scrollHeight ?? null,
        measureAtCurrentScroll: measure(),
        htmlScrollTop: document.documentElement.scrollTop,
        windowScrollY: window.scrollY,
      };
    });
    console.log('\nScroll diagnostics after scroll-800:', scrollDiagnostics);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(400);
    samples.push({ label: 'bottom', ...(await readDiagnostics(page)) });

    console.log(JSON.stringify(samples, null, 2));

    const initial = samples[0].displayedPercent ?? 0;
    const mid = samples[1].displayedPercent ?? 0;
    const bottom = samples[2].displayedPercent ?? 0;

    console.log('\nSummary:');
    console.log(`  UI progress: initial=${initial}% mid=${mid}% bottom=${bottom}%`);
    console.log(
      `  UI changed during scroll: ${initial !== mid || mid !== bottom ? 'YES' : 'NO'}`
    );

    if (samples[0].readingRoot) {
      console.log(
        `  Custom formula (readingRoot): initial=${samples[0].readingRoot.computedPercent}% bottom=${samples[2].readingRoot.computedPercent}%`
      );
    }
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
