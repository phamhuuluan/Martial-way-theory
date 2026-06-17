/**
 * Captures browser console logs while scrolling a lesson page.
 */
import { chromium } from 'playwright';

const LESSON_URL =
  process.env.LESSON_URL ?? 'http://127.0.0.1:3004/world/brown/lesson-01';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
  const logs = [];
  page.on('console', (msg) => {
    logs.push(`[${msg.type()}] ${msg.text()}`);
  });

  try {
    await page.goto(LESSON_URL, {
      waitUntil: 'domcontentloaded',
      timeout: 60000,
    });
    await page.reload({ waitUntil: 'domcontentloaded' });
    await page.waitForFunction(
      () => !document.body.textContent?.includes('Đang tải hành trình'),
      undefined,
      { timeout: 20000 }
    );

    const onboardingInput = page.locator('input[type="text"]');
    if (await onboardingInput.isVisible().catch(() => false)) {
      await onboardingInput.fill('Test User');
      await page.locator('form button[type="submit"]').click();
      await page.waitForTimeout(800);
    }

    await page.waitForTimeout(1000);
    logs.length = 0;
    await page.evaluate(() => console.log('playwright-console-test'));

    await page.evaluate(() => window.scrollTo(0, 1200));
    await page.waitForTimeout(800);

    const ui = await page.evaluate(() => {
      const text = [...document.querySelectorAll('p.text-text-muted')]
        .map((el) => el.textContent?.trim())
        .find((value) => value && /^\d+%/.test(value));
      return text ?? 'missing';
    });

    console.log('UI after scroll:', ui);
    console.log('Console messages:', logs.filter((l) => l.includes('reading-progress')));
    console.log('Total console messages:', logs.length);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
