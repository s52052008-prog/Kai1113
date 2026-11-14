import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        print(await pg.evaluate("""(()=>{const s=FRS('yijia');s.met=1;s.pt=32;T.year=1;T.day=6;T.hour=18;frTalk({fr:'yijia',n:'劉家宜'});const i=curDlg[2].findIndex(o=>/生日/.test(o[0]));curDlg[2][i][2]();dlgFns[0]();for(let k=0;k<4;k++)dlgFns[0]();return [s.pt,st.yj.bday]})()"""))
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/bd.png');print(errs);await b.close()
asyncio.run(main())
