import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':412,'height':860},has_touch=True,is_mobile=True)
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500)
        await pg.evaluate("closeDlg();p.x=1000;p.y=200;gzEnter();ED.tool='obj';ED.cat=1;gzRefresh()");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/e6.png')
        print(errs[:4]);await b.close()
asyncio.run(main())
