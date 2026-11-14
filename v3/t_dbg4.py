import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500);ev=pg.evaluate
        print(await ev("closeDlg();enterB(Z.find(z=>z.n=='家'));closeDlg();JSON.stringify(rm.sol.filter(o=>o.x<530&&o.x+o.w>440&&o.y<130))"))
        await b.close()
asyncio.run(main())
