import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        print(await pg.evaluate("JSON.stringify(LN.map(l=>({id:l.id,ax:l.ax,c:l.c,dir:l.dir,a:l.a,b:l.b,pool:l.pool})))"))
        print(await pg.evaluate("advance.toString().slice(0,300)"))
        print(await pg.evaluate("JSON.stringify(Z.filter(z=>['派出所','消防局','診所','城光復興堂'].includes(z.n)))"))
        print(await pg.evaluate("JSON.stringify(PAVE.slice(0,3))+PA.length"))
        await b.close()
asyncio.run(main())
