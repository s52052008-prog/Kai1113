import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1000)
        async def ent(n,day=None,hour=None):
            await pg.evaluate("closeDlg();if(scene)exitB()")
            if day is not None: await pg.evaluate(f"for(let d=1;d<=7;d++){{T.day=d;if(dow()=={day})break}}")
            if hour is not None: await pg.evaluate(f"T.hour={hour}")
            await pg.evaluate(f"enterB(Z.find(z=>z.n=='{n}'));st.coin=30")
            await pg.wait_for_timeout(1500)
            await pg.screenshot(path=f'/tmp/room_{n}_{day}.png')
        await ent('寵物店');await ent('服飾店');await ent('遊藝場');await ent('消防局')
        await ent('城光復興堂',6,10.0);await ent('城光復興堂',2,19.5);await ent('城光復興堂',5,14.5);await ent('城光復興堂',0,15)
        print(errs[:8]);await b.close()
asyncio.run(main())
