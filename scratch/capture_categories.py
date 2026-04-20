import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1600})
        
        file_path = "file:///c:/Users/sergi/Downloads/bienestar-animal/index.html"
        try:
            await page.goto(file_path, wait_until="domcontentloaded", timeout=15000)
        except Exception:
            pass 

        await page.wait_for_timeout(2000)
        
        # Select the element and scroll to it
        selector = "#store-grid"
        element = page.locator(selector)
        await element.scroll_into_view_if_needed()
        await page.wait_for_timeout(1000)
        
        # Take a screenshot of the grid
        await element.screenshot(path="audit_assets/marketplace_categories_full.png")

        await browser.close()

asyncio.run(run())
