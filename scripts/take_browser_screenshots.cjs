const { chromium } = require('playwright');
const path = require('path');

const brainDir = 'C:/Users/sergi/.gemini/antigravity/brain/07e5fa21-4213-4de0-a034-d282eacfb57f';

(async () => {
  const browser = await chromium.launch({ headless: true });
  
  // 1. Screenshot of Demo App Store & Deep Product Modal
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('file://' + path.resolve('simulador-gemelo-digital-telemetria.html'));
    await page.waitForTimeout(1500);

    // If onboarding is visible, complete it
    await page.evaluate(() => {
      if (typeof appDemoAutoFill === 'function') appDemoAutoFill();
      if (typeof proceedToDashboard === 'function') proceedToDashboard();
      if (typeof switchTab === 'function') {
        const storeNav = document.querySelector('.nav-item[onclick*="store"]');
        switchTab('store', storeNav);
      }
    });
    await page.waitForTimeout(1000);

    // Take screenshot of Store with filters
    await page.screenshot({ path: path.join(brainDir, 'demo_app_store_filtered.png') });
    console.log('Saved demo_app_store_filtered.png');

    // Open a product modal (e.g. first product or Smart Collar GPS Ultra)
    await page.evaluate(() => {
      if (typeof openProductModal === 'function') {
        openProductModal('cudi-smart-collar-ultra');
      }
    });
    await page.waitForTimeout(800);

    // Switch to clinical study tab inside modal
    await page.evaluate(() => {
      if (typeof switchProductModalTab === 'function') {
        switchProductModalTab('study');
      }
    });
    await page.waitForTimeout(600);
    await page.screenshot({ path: path.join(brainDir, 'demo_app_product_deep_modal.png') });
    console.log('Saved demo_app_product_deep_modal.png');

    await page.close();
  } catch (err) {
    console.error('Error taking demo app screenshot:', err);
  }

  // 2. Screenshot of AI Assistant with 15 Hardware Cards & Open Domain
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto('file://' + path.resolve('index.html'));
    await page.waitForTimeout(1500);

    // Open AI Panel and ask for hardware
    await page.evaluate(async () => {
      if (window.CudiAI) {
        window.CudiAI.toggle(true);
        const input = document.getElementById('cudi-ai-input');
        if (input) {
          input.value = 'que collares de gps tienen';
          window.CudiAI.send();
        }
      }
    });
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(brainDir, 'ai_hardware_15_cards.png') });
    console.log('Saved ai_hardware_15_cards.png');

    // Also test cart drawer
    await page.evaluate(() => {
      if (window.toggleCart) {
        window.toggleCart();
      }
    });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(brainDir, 'universal_cart_side_drawer.png') });
    console.log('Saved universal_cart_side_drawer.png');

    await page.close();
  } catch (err) {
    console.error('Error taking AI and cart screenshot:', err);
  }

  await browser.close();
  console.log('All screenshots completed successfully!');
})();
