import asyncio,sys,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type in('error',) else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(1500)
        # set clear noon weather: choose day where wx()==0
        await pg.evaluate("for(let d=1;d<30;d++){T.day=d;if(wx()==0)break;}T.hour=12")
        async def shot(name,x,y):
            await pg.evaluate(f"p.x={x};p.y={y};p.vx=p.vy=0")
            await pg.wait_for_timeout(700)
            await pg.screenshot(path=f'/tmp/{name}.png')
        for nm,x,y in [('a',84,664),('b',700,400),('c',1000,700),('d',200,150),('e',900,100),('f',1500,950)]:
            await shot(nm,x,y)
        print('\n'.join(errs[:20]))
        await b.close()
asyncio.run(main())
