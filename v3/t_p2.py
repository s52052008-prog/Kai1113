import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(5000);ev=pg.evaluate
        await ev("closeDlg();phoneMenu();0");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/q1.png')
        # bank open + trade
        print(await ev("closeDlg();st.bank=200000;enterB(Z.find(z=>z.n=='銀行'));closeDlg();mainMenu('銀行');dlgFns[curDlg[2].findIndex(o=>/證券戶/.test(o[0]))]();dlgFns[0]();dbox.innerText.slice(0,300)"))
        print(await ev("dlgFns[0]();dlgFns[1]();JSON.stringify([st.sk.h,st.bank])"))
        await pg.screenshot(path='/tmp/q2.png')
        # insurance via yuhao chat simulation
        print(await ev("closeDlg();exitB();insMenu();dlgFns[0]();dlgFns[3]();JSON.stringify(st.ins)"))
        # appointment: yilun bible Sun 14-17 church
        print(await ev("closeDlg();FRS('yilun').met=1;FRS('yilun').pt=30;for(let d=1;d<=7;d++){T.day=d;if(dow()==6)break};T.hour=13;apMake('yilun',AP.yilun[0],wkN());T.hour=14.5;enterB(Z.find(z=>z.n=='城光復興堂'));closeDlg();0"))
        await pg.wait_for_timeout(1200)
        print(await ev("JSON.stringify(rm.ppl.filter(n=>n.ap).map(n=>[n.n,n.x,n.y]))"))
        print(await ev("const n=rm.ppl.find(n=>n.ap);frTalk(n);dbox.innerText.slice(0,200)+'|'+FRS('yilun').pt"))
        # outdoor: bokai steak sun 18 night market
        print(await ev("closeDlg();exitB();FRS('bokai').met=1;apMake('bokai',AP.bokai[1],wkN());T.hour=18.5;0"));await pg.wait_for_timeout(1200)
        print(await ev("JSON.stringify(Object.values(APOUT).map(n=>[n.n,n.hid,Math.round(n.x),Math.round(n.y)]))"))
        # missed: rita
        print(await ev("FRS('rita').met=1;FRS('rita').pt=30;apMake('rita',AP.rita[0],wkN());0"));await pg.wait_for_timeout(1200)
        print(await ev("JSON.stringify([apS().map(x=>[x.id,x.st]),FRS('rita').pt])"))
        # weekly: bills + stocks
        print(await ev("st.wk.n=4;loanWeek().replace(/<br>/g,'\\n')"))
        await ev("st.album=[{w:1,t:'測試',img:'bb'}];feedPost('和以倫讀經','學長翻開聖經');feedView();0");await pg.wait_for_timeout(800);await pg.screenshot(path='/tmp/q3.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
