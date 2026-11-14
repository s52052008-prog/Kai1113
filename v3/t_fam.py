import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        run="""(k=>{const W=wkState(),s=FRS('yijia');const sd=(d,h)=>{T.year=1;T.day=d+1;T.hour=h};const f=st.yj.vis[k];
          sd(5,10);closeDlg();frTalk({fr:'yijia',n:'劉家宜'});let i=curDlg[2].findIndex(o=>/安排行程/.test(o[0]));curDlg[2][i][2]();
          [0,1,2,3].forEach(q=>{famPick(k,q);dlgFns[0]()});const ok=curDlg[2].findIndex(o=>/就這樣排/.test(o[0]));curDlg[2][ok][2]();
          W.n=f.W;sd(5,9);closeDlg();frTalk({fr:'yijia',n:'劉家宜'});i=curDlg[2].findIndex(o=>/出發/.test(o[0]));curDlg[2][i][2]();
          for(let q=0;q<8;q++)if(!dlg.hidden)dlgFns[0]();return JSON.stringify(f)+' pt'+s.pt})"""
        await pg.evaluate("""(()=>{const s=FRS('yijia');s.met=1;st.partner='劉家宜';Object.assign(yjS(),{t1:1,t2:1});s.pt=112;st.money=40000;famCheck();wkState().n+=3;famCheck()})()""")
        print(await pg.evaluate(run+"(1)"));await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/fam1.png')
        await pg.keyboard.press('Space');await pg.wait_for_timeout(900)
        print(await pg.evaluate("(()=>{wkState().n+=4;famCheck();return JSON.stringify(st.yj.vis[2])})()"))
        print(await pg.evaluate(run+"(2)"));await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/fam2.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
