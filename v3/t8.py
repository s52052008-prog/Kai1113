import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const out=[];for(const [x,y] of [[1401,790],[1401,800],[1401,810],[1401,826],[1390,830],[1401,860],[1200,800],[1290,800],[1310,790]]){p.x=x;p.y=y;const s=solids.find(o=>hit(p,o));out.push([x,y,staticBlk(),s?JSON.stringify(s):null,NP.filter(n=>!n.vh&&!n.walk&&hit(p,n)).map(n=>n.n).join()])}return out})()""")
        for x in r: print(x)
        await b.close()
asyncio.run(main())
