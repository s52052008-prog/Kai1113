import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const out=[];for(let y=650;y<830;y+=4){p.x=1390;p.y=y;const s=solids.find(o=>hit(p,o));if(staticBlk())out.push([y,JSON.stringify(s)])}return out})()""")
        for x in r: print(x)
        await b.close()
asyncio.run(main())
