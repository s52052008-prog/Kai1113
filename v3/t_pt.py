import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        print(await pg.evaluate("""(()=>{st.partner='劉家宜';FRS('yijia').met=1;FRS('bokai').met=1;st.bk={met:1,z1:1};wkState().n=5;ptCheck();const a=!!st.hp2;st.bk.z2=3;ptCheck();closeDlg();st.money=5000;
          T.year=1;T.day=6;T.hour=19;phoneMenu();const o=curDlg[2][0][0];curDlg[2][0][2]();for(let i=0;i<5;i++)dlgFns[0]();return [a,o,JSON.stringify(st.hp2),st.money]})()"""))
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/pt.png');print(errs);await b.close()
asyncio.run(main())
