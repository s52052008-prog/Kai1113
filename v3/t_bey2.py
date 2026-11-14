import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1000)
        await pg.evaluate("st.coin=20;playGame('bey');window.__G=MG")
        for i in range(16):
            await pg.wait_for_timeout(400)
            print(await pg.evaluate("(()=>{const G=window.__G;return JSON.stringify([G.t.toFixed(1),__bd.P.x|0,__bd.P.y|0,__bd.P.sp|0,__bd.E.x|0,__bd.E.y|0,__bd.E.sp|0])})()"))
        await b.close()
asyncio.run(main())
