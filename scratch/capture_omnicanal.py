import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        
        file_path = "file:///c:/Users/sergi/Downloads/bienestar-animal/index.html"
        try:
            await page.goto(file_path, wait_until="domcontentloaded", timeout=15000)
        except Exception:
            pass 

        await page.wait_for_timeout(2000)
        
        # Focus on the bottom-right area where the widget is
        await page.screenshot(path="audit_assets/omnicanal_ia_widget.png", clip={"x": 900, "y": 400, "width": 380, "height": 400})

        await browser.close()

asyncio.run(run())
