import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':800})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(5000);ev=pg.evaluate
        # weekly news text
        print(await ev("closeDlg();let s='';for(let i=0;i<4;i++)s+=lnewsWeek().replace(/<br>/g,' ')+'\\n';s"))
        # accidents: force wallet
        print(await ev("st.money=10000;Math._r=Math.random;Math.random=()=>.07;evArrive();Math.random=Math._r;dbox.innerText.slice(0,120)+'|'+st.money"))
        print(await ev("closeDlg();enterB(Z.find(z=>z.n=='派出所'));closeDlg();mainMenu('派出所');dbox.innerText.slice(0,160)"))
        print(await ev("dlgFns[0]();dbox.innerText.slice(0,80)"))
        # fracture & clinic with insurance
        print(await ev("closeDlg();exitB();st.ins={acc:wkN()+10};st.bank=50000;caseAdd('fracture');st.injury=1;enterB(Z.find(z=>z.n=='診所'));closeDlg();mainMenu('診所');dlgFns[0]();JSON.stringify([st.injury,st.bank])"))
        await pg.wait_for_timeout(900);print(await ev("dbox.innerText.slice(0,120)+'|'+st.bank"))
        # camera at garden
        print(await ev("closeDlg();exitB();p.x=GARDEN.x+GARDEN.w/2;p.y=GARDEN.y+GARDEN.h/2;0"));await pg.wait_for_timeout(1200)
        print(await ev("JSON.stringify(camSee().lm.map(q=>q[1]))"))
        await ev("camera();0");await pg.wait_for_timeout(300);await pg.keyboard.press(' ');await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/c1.png')
        print(await ev("JSON.stringify(st.dex)"))
        await pg.mouse.click(600,400);await pg.wait_for_timeout(500)
        # building move
        await ev("closeDlg();gzEnter();ED.tool='bld';gzRefresh();const b=B.find(q=>q.n=='咖啡店');ED.cx=b.x-200;ED.cy=b.bot-250;gzClampCam();0");await pg.wait_for_timeout(300)
        r=await ev("(()=>{const b=B.find(q=>q.n=='咖啡店'),R=bRect(b),C=cv.getBoundingClientRect();return [C.left+(R.x+R.w/2-ED.cx)/(W/ED.z)*C.width,C.top+(R.y+R.h/2-ED.cy)/(H/ED.z)*C.height,b.x,b.bot]})()")
        print(r);await pg.mouse.move(r[0],r[1]);await pg.mouse.down();await pg.mouse.move(r[0]+120,r[1]+40,steps=6);await pg.mouse.up();await pg.wait_for_timeout(600)
        await pg.screenshot(path='/tmp/c2.png')
        print(await ev("JSON.stringify([B.find(q=>q.n=='咖啡店').x,Z.find(z=>z.n=='咖啡店').x,gzSerialize().bld])"))
        await ev("gzSave();0");await pg.wait_for_timeout(500);await ev("closeDlg();gzExit(1);0")
        await pg.reload();await pg.wait_for_timeout(5500)
        print(await ev("JSON.stringify([B.find(q=>q.n=='咖啡店').x])"))
        # room resize
        print(await ev("closeDlg();enterB(Z.find(z=>z.n=='黃禹豪的家'));closeDlg();const w0=rm.W;gzEnter();rmResize('黃禹豪的家',64,32);JSON.stringify([w0,rm.W,rm.H,gzSerialize().rooms['黃禹豪的家'].W])"))
        await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/c3.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
