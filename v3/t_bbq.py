import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        print(await pg.evaluate("""(()=>{['bokai','yilun','yijia','yuhao'].forEach(k=>{FRS(k).met=1;FRS(k).pt=60});st.bk={met:1,inv:1,z1:1};
          const W=wkState();W.n=10;FRS('bokai').pt=70;bkCheck();const z2a=!!st.bk.z2;closeDlg();
          bbqCheck();const t=dbox.innerText.slice(0,40);closeDlg();T.year=1;T.day=6;T.hour=18;phoneMenu();const o=curDlg[2][0][0];curDlg[2][0][2]();for(let i=0;i<5;i++)dlgFns[0]();
          return [z2a,t,o,JSON.stringify(st.bbq),FRS('yijia').pt]})()"""))
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/bbq.png');await pg.keyboard.press('Space');await pg.wait_for_timeout(900)
        print(await pg.evaluate("(()=>{closeDlg();wkState().n=20;bkCheck();return !!st.bk.z2})()"))
        print(errs);await b.close()
asyncio.run(main())
