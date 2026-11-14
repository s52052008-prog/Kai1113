import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1000)
        for mode in ['idle','mash']:
          for n in range(3):
            await pg.evaluate("st.coin=20;playGame('bey')")
            for i in range(60):
                if mode=='mash' and i%4==0: await pg.keyboard.press('Space')
                await pg.wait_for_timeout(500)
                if await pg.evaluate("!MG||MG.done"): break
            print(mode,await pg.evaluate("MG?[MG.t,MG.done]:null"),await pg.evaluate("dlg.hidden?'':document.querySelector('#dbox .font-bold').textContent"))
            await pg.wait_for_timeout(1200)
            if n==0: await pg.screenshot(path=f'/tmp/bey_{mode}.png')
        await b.close()
asyncio.run(main())
