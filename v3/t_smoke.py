import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(5000)
        await pg.evaluate("st.money=3000;adopt('shiba');adopt('callduck');enterB(Z.find(z=>z.n=='全家'))")
        await pg.keyboard.down('ArrowUp');await pg.wait_for_timeout(900);await pg.keyboard.up('ArrowUp')
        await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/pet_in.png')
        await pg.evaluate("exitB()");await pg.wait_for_timeout(1500)
        for i in range(30):
            await pg.keyboard.down('ArrowRight');await pg.wait_for_timeout(200);await pg.keyboard.up('ArrowRight')
            await pg.evaluate("closeDlg()")
        await pg.screenshot(path='/tmp/pet_out.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
