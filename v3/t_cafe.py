import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        await pg.evaluate("T.hour=10;enterB(Z.find(z=>z.n=='咖啡店'))")
        await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/cafe1.png')
        for i in range(9):
            await pg.evaluate("dlgFns[0]&&dlgFns[0]()");await pg.wait_for_timeout(120)
            if i==2: await pg.screenshot(path='/tmp/cafe2.png')
        print(await pg.evaluate("[st.cafe,dlg.hidden,curDlg&&curDlg[0]]"))
        # accept path
        for k in range(5):
            await pg.evaluate("cafeKid()")
            await pg.wait_for_timeout(100)
            await pg.evaluate("dlgFns[0]()")   # choose activity 0
            await pg.wait_for_timeout(100)
            await pg.evaluate("dlgFns[0]()")   # choose option
            await pg.wait_for_timeout(100)
            for j in range(3):
                await pg.evaluate("dlg.hidden||dlgFns[0]()");await pg.wait_for_timeout(100)
        await pg.evaluate("closeDlg()")
        await pg.evaluate("cafeKid()");await pg.wait_for_timeout(200)
        for j in range(8):
            await pg.evaluate("dlg.hidden||dlgFns[0]()");await pg.wait_for_timeout(100)
        print(await pg.evaluate("[st.cafe,st.cafeN,st.inv.charm,st.money,T.hour]"))
        await pg.screenshot(path='/tmp/cafe3.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
