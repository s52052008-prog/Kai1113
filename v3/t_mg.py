import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        for k in ['pachi','bey','kart']:
            await pg.evaluate(f"st.coin=20;playGame('{k}')")
            await pg.wait_for_timeout(300)
            await pg.keyboard.down('ArrowRight')
            for i in range(6):
                await pg.keyboard.press('Space');await pg.wait_for_timeout(700)
            await pg.keyboard.up('ArrowRight')
            await pg.screenshot(path=f'/tmp/mg_{k}.png')
            await pg.evaluate("MG=null")
        print(errs[:8]);await b.close()
asyncio.run(main())
