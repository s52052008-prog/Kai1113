import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        for mode in ['idle','mash']:
          for n in range(4):
            await pg.evaluate("st.coin=20;window.T0=st.tix;playGame('bey')")
            for i in range(120):
                if mode=='mash' and i%3==0:
                    await pg.keyboard.down('ArrowRight') if i%6==0 else await pg.keyboard.down('ArrowLeft')
                    await pg.keyboard.press('Space')
                await pg.wait_for_timeout(250)
                if await pg.evaluate("!MG||MG.done"): break
            await pg.keyboard.up('ArrowRight');await pg.keyboard.up('ArrowLeft')
            await pg.wait_for_timeout(1100)
            print(mode,round(await pg.evaluate("MG?MG.t:0"),1),await pg.evaluate("st.tix-T0"),await pg.evaluate("dlg.hidden?'':document.querySelector('#dbox .font-bold').textContent"))
        await b.close()
asyncio.run(main())
