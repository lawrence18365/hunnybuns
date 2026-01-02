const { chromium } = require('playwright');
const path = require('path');

const viewports = [
  { width: 375, height: 667, name: 'phone' },
  { width: 600, height: 900, name: 'large_phone' },
  { width: 900, height: 1024, name: 'tablet' },
  { width: 1366, height: 768, name: 'laptop' },
  { width: 1920, height: 1080, name: 'desktop' }
];

(async () => {
  const browser = await chromium.launch();
  for (const vp of viewports) {
    const context = await browser.newContext({
      viewport: { width: vp.width, height: vp.height }
    });
    const page = await context.newPage();
    try {
      await page.goto('http://127.0.0.1:4173', { waitUntil: 'networkidle' });
      // Wait a bit for any animations
      await page.waitForTimeout(1000);
      await page.screenshot({ path: `screenshot_${vp.name}_${vp.width}x${vp.height}.png`, fullPage: true });
      console.log(`Captured ${vp.name} (${vp.width}x${vp.height})`);
    } catch (error) {
      console.error(`Error capturing ${vp.name}:`, error);
    }
    await context.close();
  }
  await browser.close();
})();
