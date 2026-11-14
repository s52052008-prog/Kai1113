import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        await pg.evaluate("st.money=2000;adopt('rabbit');adopt('frenchie');st.comp=st.pets[1].id;syncPet();p.x=300;p.y=330")
        await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/an_out.png')
        await pg.evaluate("enterB(Z.find(z=>z.n=='家'))");await pg.wait_for_timeout(900);await pg.screenshot(path='/tmp/an_in.png')
        print(errs);await b.close()
asyncio.run(main())
