import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(4500);ev=pg.evaluate
        await ev("closeDlg();hud();tm();0");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/p1a.png')
        print('cal',await ev("JSON.stringify([cal(1),cal(30),cal(65),staMax()])"))
        # food block
        print(await ev("st.full=95;enterB(Z.find(z=>z.n=='餐廳'));closeDlg();mainMenu('餐廳');dbox.innerText.slice(0,500)"))
        await pg.screenshot(path='/tmp/p1b.png')
        # gym
        print(await ev("closeDlg();exitB();scene='健身房';fxApply({p:2,s:-15});fxApply({p:2,s:-15});scene=null;JSON.stringify(st.gym)"))
        # exhaustion
        print(await ev("st.sta=5;fxApply({s:-20});JSON.stringify([st.sta,st.exh,vSpeed(),(st.mail||[]).length])"))
        await pg.wait_for_timeout(800)
        print(await ev("JSON.stringify([(st.mail||[]).length,st.mail&&st.mail[0]&&st.mail[0].k])"))
        # faint: set time 1.9 then advance
        print(await ev("closeDlg();for(let d=1;d<=7;d++){T.day=d;if(dow()==5)break};T.hour=1.95;st.money=12000;advance(.1);0"));await pg.wait_for_timeout(300)
        print(await ev("dbox.innerText.slice(0,260)+' | '+JSON.stringify([st.money,T.hour,scene,st.sta])"))
        await pg.screenshot(path='/tmp/p1c.png')
        # sleep summary
        print(await ev("closeDlg();openHome();dlgFns[0]();dbox.innerText.slice(0,300)"))
        print(await ev("dlgFns[0]();JSON.stringify([T.hour,st.sta,staMax()])"))
        # capsule & mush
        print(await ev("closeDlg();st.inv.capsule=1;useItem('capsule');closeDlg();st.inv.mush=2;useItem('mush');closeDlg();useItem('mush');closeDlg();JSON.stringify([staMax(),st.mush,st.mushPend])"))
        print(errs[:6]);await b.close()
asyncio.run(main())
