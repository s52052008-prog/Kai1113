import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1000)
        for k,bn in [('fire','城光復興堂'),('theft','餐廳'),('medical','咖啡店'),('brawl','遊藝場')]:
            await pg.evaluate(f"""(()=>{{closeDlg();scene=null;incCool=999;newInc();const b=BN['{bn}'];INC.k='{k}';INC.b=b;const z=Z.find(z=>z.b===b);INC.tx=z.x+z.w/2;INC.ty=b.bot+(b.bot==262?30:28);INC.th.x=INC.tx;INC.th.y=INC.ty-6;p.x=INC.tx-30;p.y=INC.ty+10;reportInc(1);}})()""")
            for i in range(14):
                await pg.wait_for_timeout(1000)
                s=await pg.evaluate("[INC&&INC.st,RESP.map(v=>v.state+':'+(v.cx|0)+','+(v.cy|0)).join(' ')].join(' | ')")
                if i in (6,9): await pg.screenshot(path=f'/tmp/inc_{k}_{i}.png')
                if i%4==0: print(k,i,s)
            await pg.evaluate("closeDlg()")
        print(errs[:6]);await b.close()
asyncio.run(main())
