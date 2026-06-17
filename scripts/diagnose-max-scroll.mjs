import { chromium } from 'playwright';

const LESSON_URL =
  process.env.LESSON_URL ?? 'http://127.0.0.1:3004/world/brown/lesson-01';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

  try {
    await page.goto(LESSON_URL, { waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => !document.body.textContent?.includes('Đang tải hành trình')
    );

    const onboardingInput = page.locator('input[type="text"]');
    if (await onboardingInput.isVisible().catch(() => false)) {
      await onboardingInput.fill('Test User');
      await page.locator('form button[type="submit"]').click();
      await page.waitForTimeout(800);
    }

    const maxScrollResult = await page.evaluate(() => {
      const root = document.querySelector('.prose-lesson')?.parentElement;
      if (!root) return null;

      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo(0, maxScroll);

      const rect = root.getBoundingClientRect();
      const viewportBottom = window.innerHeight - 152;
      const viewed = Math.min(
        root.scrollHeight,
        Math.max(0, viewportBottom - rect.top)
      );

      return {
        maxScroll,
        scrollY: window.scrollY,
        rootScrollHeight: root.scrollHeight,
        rectTop: rect.top,
        rectBottom: rect.bottom,
        viewportBottom,
        formulaPercent: Math.floor((viewed / root.scrollHeight) * 100),
      };
    });

    await page.waitForTimeout(600);

    const ui = await page.evaluate(() => {
      return [...document.querySelectorAll('p.text-text-muted')]
        .map((el) => el.textContent?.trim())
        .find((text) => text && /^\d+%/.test(text));
    });

    console.log(JSON.stringify({ maxScrollResult, uiAfterWait: ui }, null, 2));
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
