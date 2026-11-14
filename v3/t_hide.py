import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':800})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(5000);ev=pg.evaluate
        await ev("closeDlg();gzEnter();ED.cat=0;ED.tool='obj';ED.pal='lo_heart';gzRefresh();0")
        await pg.click('[data-hide]');await pg.wait_for_timeout(200)
        print(await ev("JSON.stringify([GZHIDE.size,[...document.querySelectorAll('#gzGrid [data-k]')].map(e=>e.dataset.k).includes('lo_heart'),gzSerialize().hide])"))
        await ev("ED.cat=EDCAT.indexOf(GZHCAT);gzRefresh();0");await pg.wait_for_timeout(200)
        print(await ev("[...document.querySelectorAll('#gzGrid [data-k]')].map(e=>e.dataset.k).join(',')"))
        await ev("ED.cat=EDCAT.findIndex(c=>c[0]=='📦 UI 介面');gzRefresh();0");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/h1.png')
        print(errs[:4]);await b.close()
asyncio.run(main())
