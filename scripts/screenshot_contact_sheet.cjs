const { chromium } = require('playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 2600 } });
  await page.goto('file://' + path.resolve('tmp_photos/contact_sheet.html'));
  await page.waitForTimeout(1000);
  await page.screenshot({ path: 'C:/Users/sergi/.gemini/antigravity/brain/07e5fa21-4213-4de0-a034-d282eacfb57f/audit_contact_sheet.png', fullPage: true });
  await browser.close();
  console.log('Saved contact sheet screenshot to brain');
})();
