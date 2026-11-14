import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        print(await pg.evaluate("""(()=>{FRS('yijia').met=1;FRS('yijia').pt=105;st.partner='劉家宜';const y=yjS();y.t1=y.t2=1;y.confW=1;wkState().n=4;mbCheck();closeDlg();
          T.year=1;T.day=6;T.hour=19.5;phoneMenu();const o=curDlg[2][0][0];curDlg[2][0][2]();for(let i=0;i<6;i++)dlgFns[0]();return [o,JSON.stringify(st.mbd),FRS('yijia').pt]})()"""))
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/mb.png');print(errs);await b.close()
asyncio.run(main())
