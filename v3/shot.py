import asyncio,sys,json
from playwright.async_api import async_playwright
# usage: shot.py name x y [hour]
pts=[a.split(',') for a in sys.argv[1:]]
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type=='error' else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(1200)
        await pg.evaluate("for(let d=1;d<30;d++){T.day=d;if(wx()==0)break;}T.hour=12")
        for p in pts:
            n,x,y=p[0],p[1],p[2]
            h=p[3] if len(p)>3 else '12'
            await pg.evaluate(f"T.hour={h};p.x={x};p.y={y};p.vx=p.vy=0;")
            await pg.wait_for_timeout(600)
            await pg.screenshot(path=f'/tmp/{n}.png')
        print('\n'.join(errs[:15]))
        await b.close()
asyncio.run(main())
