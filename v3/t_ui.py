import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        await pg.evaluate("st.money=3000;['jordan','gakuran','phones','food','coffee'].forEach(k=>{try{addItem(k,2)}catch(e){}});toggleEquip('jordan');openBag()")
        await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/ui_bag.png')
        await pg.evaluate("closeDlg();const n=NP.find(n=>n.n&&n.n.includes('貓奶奶'))||NP[3];talk(n)")
        await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/ui_talk.png')
        await pg.evaluate("closeDlg();openMenu()")
        await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/ui_menu.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
