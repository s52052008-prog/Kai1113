import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500);ev=pg.evaluate
        await ev("closeDlg();enterB(Z.find(z=>z.n=='家'));closeDlg();p.x=300;p.y=150;gzEnter();window._gd=gzRDown;gzRDown=function(){console.log('down',...arguments);return _gd.apply(this,arguments)};0")
        await ev("ED.tool='obj';ED.pal='lf_238';ED.pw=0;gzRefresh()");await pg.mouse.click(500,350);await pg.wait_for_timeout(300)
        print(await ev("JSON.stringify([ED.on,ED.room,ED.tool,ED.pal,dlg.hidden,rm.fur.length,ROOMED.size])"))
        print(errs[:6]);await b.close()
asyncio.run(main())
