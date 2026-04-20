import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 1000})
        
        file_path = "file:///c:/Users/sergi/Downloads/bienestar-animal/smart-collar-aventuras-sin-sustos.html"
        try:
            await page.goto(file_path, wait_until="domcontentloaded", timeout=15000)
        except Exception:
            pass 

        await page.wait_for_timeout(2000)
        
        # Take a screenshot of the top part of the landing page
        await page.screenshot(path="audit_assets/aventuras_sin_sustos_page.png", full_page=False)

        await browser.close()

asyncio.run(run())
