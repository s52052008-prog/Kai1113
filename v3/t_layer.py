import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        print(await pg.evaluate("(()=>{closeDlg();T.hour=14;const b=B.find(b=>b.n=='書局');p.x=b.x+b.w/2-6;p.y=b.bot-60;return [p.x,p.y,staticBlk(),BOV.length]})()"))
        await pg.keyboard.down('ArrowDown');await pg.wait_for_timeout(700);await pg.keyboard.up('ArrowDown');await pg.wait_for_timeout(300)
        print(await pg.evaluate("[p.x,p.y]"));await pg.screenshot(path='/tmp/ly1.png')
        await pg.evaluate("T.hour=20;p.x=1130;p.y=1060");await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/ly2.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
