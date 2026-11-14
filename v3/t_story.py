import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        await pg.evaluate("yjSong();dlgFns[0]();dlgFns[0]();dlgFns[0]();dlgFns[0]()");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/s1.png')
        await pg.evaluate("closeDlg();st.money=40000;yjWedding();dlgFns[0]();dlgFns[0]();dlgFns[0]();dlgFns[0]()");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/s2.png')
        print(errs);await b.close()
asyncio.run(main())
