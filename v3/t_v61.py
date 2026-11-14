import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        r=await pg.evaluate("""(()=>{T.day=6;T.hour=10;st.cp=3;st.sta=100;mainMenu('健身房');const t1=dbox.innerText;
          const btn=[...dbox.querySelectorAll('button')].find(b=>b.innerText.includes('週末兼差'));btn&&btn.click();const t2=dbox.innerText;
          const m0=st.money,h0=T.hour;dlgFns[0]();return {t1:t1.slice(0,300),t2:t2.slice(0,400),gain:st.money-m0,h:T.hour-h0,cp:st.cp,q:Q[2].g+Q[2].s,PR:PR.coffee+','+IT.coffee.p}})()""")
        print(r)
        await pg.wait_for_timeout(1700);print(await pg.evaluate("[st.cp,Q[2].s]"))
        await pg.evaluate("closeDlg();friendsMenu()");print((await pg.evaluate("dbox.innerText"))[:80])
        await pg.evaluate("closeDlg();openDlg('x','y',[['💼 警務職涯・應徵／職涯','上班、晉升、轉職',()=>1],['a','',closeDlg]])");print(await pg.evaluate("dbox.innerText"))
        await pg.screenshot(path='/tmp/v61.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
