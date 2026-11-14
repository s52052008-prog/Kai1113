import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(4000)
        print(await pg.evaluate("JSON.stringify([EO.filter(e=>e.add&&!e.rm).length,EO.filter(e=>!e.add&&e.rm).length,Object.keys(EFL).length])"))
        await pg.evaluate("closeDlg();gzEnter();gzZoom(.25);ED.cx=0;ED.cy=0;gzClampCam()");await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/b1.png')
        await pg.evaluate("ED.cx=1500;gzClampCam()");await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/b2.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
