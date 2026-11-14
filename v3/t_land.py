import asyncio,sys
from playwright.async_api import async_playwright
P=[('park',1070,170),('park2',1020,80),('garden',2300,1030),('garden2',2120,930),('farm',1650,950),('street',600,600),('market',1100,950),('church',2500,250)]
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        await pg.evaluate("closeDlg();T.hour=11;hudOpen=false;try{hud()}catch(e){}")
        for n,x,y in P:
            await pg.evaluate(f"p.x={x};p.y={y}");await pg.wait_for_timeout(1300);await pg.screenshot(path=f'/tmp/ld_{n}.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
