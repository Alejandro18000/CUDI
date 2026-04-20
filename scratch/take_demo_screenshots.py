import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page(viewport={"width": 1280, "height": 800})
        
        # Load the HTML file
        file_path = "file:///c:/Users/sergi/Downloads/bienestar-animal/simulador-gemelo-digital-telemetria.html"
        await page.goto(file_path, wait_until="networkidle")
        
        # Take screenshot of the default active tab (IA / Salud)
        # Wait a bit for animations
        await page.wait_for_timeout(1000)
        await page.screenshot(path="audit_assets/demo_salud_new.png", full_page=False)

        # Click on Profile tab
        await page.click("button[onclick=\"switchAppTab('perfil')\"]", force=True)
        await page.wait_for_timeout(1000)
        await page.screenshot(path="audit_assets/demo_perfil_new.png", full_page=False)

        # Click on Social/IA tab
        await page.click("button[onclick=\"switchAppTab('social')\"]", force=True)
        await page.wait_for_timeout(1000)
        await page.screenshot(path="audit_assets/demo_ia_new.png", full_page=False)

        # Click on Market/Tienda tab
        await page.click("button[onclick=\"switchAppTab('tienda')\"]", force=True)
        await page.wait_for_timeout(1000)
        await page.screenshot(path="audit_assets/demo_tienda_new.png", full_page=False)

        await browser.close()

asyncio.run(run())
