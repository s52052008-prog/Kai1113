import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.evaluate("st.coin=20;playGame('kart')");await pg.keyboard.down('ArrowUp')
        for i in range(5):await pg.keyboard.press('Space');await pg.wait_for_timeout(500)
        await pg.keyboard.up('ArrowUp');await pg.evaluate("MG=null")
        print('hours',await pg.evaluate("JSON.stringify((BL||[]).filter?.(b=>b.n=='遊藝場').map(b=>b.hr))") if False else '')
        print(await pg.evaluate("(()=>{const b=(typeof B!=='undefined'?B:[]).find?.(x=>x.n=='遊藝場');return b?JSON.stringify(b.hr||null):'nob'})()"))
        # cafe charm
        await pg.evaluate("st.inv={};addItem('charm',1)");print('charm',await pg.evaluate("JSON.stringify(st.inv)"), await pg.evaluate("typeof IT.charm"))
        print(errs);await b.close()
asyncio.run(main())
