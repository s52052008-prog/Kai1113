import asyncio,base64,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500)
        d=await pg.evaluate("S.toDataURL('image/png')")
        open('/tmp/world.png','wb').write(base64.b64decode(d.split(',')[1]))
        print(errs[:5]);await b.close()
asyncio.run(main())
