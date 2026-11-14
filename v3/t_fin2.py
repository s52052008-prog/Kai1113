import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.evaluate("st.inv={};st.money=100;1");await pg.wait_for_timeout(300)
        await pg.evaluate("closeDlg();finishCafeDay()")
        for i in range(16):
            await pg.wait_for_timeout(150)
            print(await pg.evaluate("[curDlg&&curDlg[0],dlgFns.length,dlg.hidden]"));await pg.evaluate("dlgFns[0]&&dlgFns[0]()")
        print(await pg.evaluate("[st.money,JSON.stringify(st.inv),st.cafe]"),errs);await b.close()
asyncio.run(main())
