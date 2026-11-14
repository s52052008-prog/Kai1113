import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        ev=pg.evaluate
        print(await ev("closeDlg();st.money=50000;st.bank=400000;enterB(Z.find(z=>z.n=='賓士展示中心'));closeDlg();mainMenu('賓士展示中心');dbox.innerText.slice(0,400)"))
        print(await ev("vBuyColor('car','hatch',1850000);dbox.innerText"))
        print(await ev("dlgFns[1]();dbox.innerText"))
        print(await ev("dlgFns[2]();dbox.innerText"))
        await pg.screenshot(path='/tmp/l1.png')
        print(await ev("const i=dlgFns.findIndex((f,i)=>!curDlg[2][i][3]);dlgFns[3]();dbox.innerText"))
        print(await ev("dlgFns[0]();JSON.stringify({m:st.money,b:st.bank,veh:st.veh.car,cr:st.cr})"))
        print(await ev("exitB();wkReturn();'ok'"));await pg.wait_for_timeout(4000)
        print(await ev("dbox.innerText"));await pg.screenshot(path='/tmp/l2.png')
        print(await ev("closeDlg();st.money=0;st.bank=0;let s='';for(let i=0;i<3;i++)s+=loanWeek().replace(/<br>/g,'\\n')+'\\n---';s+JSON.stringify(st.veh)"))
        print(await ev("enterB(Z.find(z=>z.n=='銀行'));closeDlg();creditMenu();dbox.innerText"))
        print(await ev("st.money=100000;enterB(Z.find(z=>z.n=='捷安特'));closeDlg();mainMenu('捷安特');dlgFns[0]();dlgFns[4]();dbox.innerText"))
        print(await ev("dlgFns[0]();JSON.stringify([st.money,st.veh.bike])"))
        print(errs[:6]);await b.close()
asyncio.run(main())
