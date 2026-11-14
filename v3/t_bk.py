import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        r=await pg.evaluate("""(()=>{FRS('yuhao').met=1;FRS('yuhao').pt=55;FRS('yijia').met=1;FRS('yijia').pt=55;Object.assign(yjS(),{t1:1});
          bkCheck();const t1=dbox.innerText.slice(0,60);closeDlg();T.year=1;T.day=6;T.hour=19;st.sta=100;phoneMenu();const t2=curDlg[2][0][0]+(curDlg[2][0][3]?'(dis)':'');
          curDlg[2][0][2]();for(let i=0;i<6;i++)if(!dlg.hidden)dlgFns[0]();return [t1,t2,JSON.stringify(st.bk),FRS('bokai').pt,FRS('yuhao').pt]})()""")
        print(r);await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/bb.png');await pg.keyboard.press('Space');await pg.wait_for_timeout(900)
        r=await pg.evaluate("""(()=>{const W=wkState();const f=FRS('bokai');W.n+=5;f.pt=60;bkCheck();const a=dbox.innerText.slice(0,50);dlgFns[0]();W.n+=4;bkCheck();const b2=dbox.innerText.slice(0,40);dlgFns[0]();f.pt=70;W.n+=8;bkCheck();const c=dbox.innerText.slice(0,30);closeDlg();W.n++;T.year=1;T.day=7;T.hour=11;st.money=9000;phoneMenu();curDlg[2][0][2]();for(let i=0;i<5;i++)dlgFns[0]();return [a,b2,c,dbox.innerText.slice(0,260),JSON.stringify(st.bk)]})()""")
        print(r)
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/bkw.png');await pg.keyboard.press('Space');await pg.wait_for_timeout(900)
        await pg.evaluate("closeDlg();T.year=1;T.day=6;T.hour=17;st.bk.night=0;p.x=340;p.y=200;")
        await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/bk2.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
