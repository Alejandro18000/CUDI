import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 900})
        
        file_path = "file:///c:/Users/sergi/Downloads/bienestar-animal/planes-suscripcion-bienestar-animal.html"
        try:
            await page.goto(file_path, wait_until="domcontentloaded", timeout=15000)
        except Exception:
            pass # ignore timeout if any, we still try taking screenshot

        await page.wait_for_timeout(3000)
        await page.screenshot(path="audit_assets/planes_suscripcion_page.png", full_page=False)

        await browser.close()

asyncio.run(run())
