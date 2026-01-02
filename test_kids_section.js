const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Get absolute path to index.html
  const filePath = path.resolve(__dirname, 'index.html');
  const fileUrl = `file://${filePath}`;

  console.log(`Loading: ${fileUrl}`);
  await page.goto(fileUrl);

  // Viewports to test
  const viewports = [
    { name: 'desktop', width: 1920, height: 1080 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 375, height: 812 }
  ];

  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    
    // Wait for any animations
    await page.waitForTimeout(1000); 

    // Locate the kids section
    const kidsSection = page.locator('#little-ones');
    
    // Check if visible
    if (await kidsSection.isVisible()) {
        console.log(`Taking screenshot for ${viewport.name}...`);
        await kidsSection.screenshot({ path: `kids_section_${viewport.name}.png` });
    } else {
        console.error(`ERROR: #little-ones section not visible on ${viewport.name}`);
        // Fallback: full page screenshot to see what's going on
        await page.screenshot({ path: `full_page_debug_kids_${viewport.name}.png`, fullPage: true });
    }
  }

  await browser.close();
})();
