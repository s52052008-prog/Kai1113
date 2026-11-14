import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        print(await pg.evaluate("""()=>{const o={};DEC.filter(d=>d.__pk).forEach(d=>{const b=B.find(b=>d.x>=b.x-30&&d.x<=b.x+b.w+30&&d.y>b.bot&&d.y<b.bot+80);const n=b?b.n:'?';o[n]=(o[n]||0)+1});
        const dbg=[];const b=B.find(b=>b.n=='全家');const base=b.bot+48;for(const d of DEC){if(d.__pk)continue;if(d.x<b.x+b.w&&d.x+d.w>b.x&&d.y+d.h>base-34&&d.y+d.h*.4<base)dbg.push([d.x,d.y,d.w,d.h])}
        const so=solids.filter(q=>q.x<b.x+b.w&&q.x+q.w>b.x&&q.y+q.h>base-34&&q.y<base).map(q=>[q.x,q.y,q.w,q.h]);
        return JSON.stringify([o,dbg,so,b.x,b.w,b.bot,b.dx])}"""))
        await b.close()
asyncio.run(main())
