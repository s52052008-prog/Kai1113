import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page()
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(4500);ev=pg.evaluate
        print(await ev("closeDlg();T.hour=1.95;JSON.stringify([wkIn(),window.TITLE,typeof MG!='undefined'&&MG,WK.busy,dow(),T.day])"))
        await b.close()
asyncio.run(main())
