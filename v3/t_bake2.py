import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page()
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(4000)
        print(await pg.evaluate("(()=>{const s=new Set(EO.map(e=>e.sig));const k=Object.keys(MAP_BAKED.mv);return [k.length,k.filter(x=>s.has(x)).length,k.filter(x=>!s.has(x))]})()"))
        await b.close()
asyncio.run(main())
