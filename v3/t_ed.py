import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500)
        ev=pg.evaluate
        print(await ev("closeDlg();p.x=2100;p.y=1040;openMenu();dbox.innerText.slice(-200)"))
        print(await ev("gzEnter();[ED.on,EO.length,EO.filter(e=>e.sol).length,EO.filter(e=>e.lamp).length,EO.filter(e=>e.kind=='tree').length]"))
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/e1.png')
        # select heart & drag via mouse
        r=await ev("(()=>{const e=EO.find(e=>e.k=='lo_heart');const b=gzBox(e);const R=cv.getBoundingClientRect();return [R.left+(b.x+b.w/2-ED.cx)/(W/ED.z)*R.width,R.top+(b.y+b.h/2-ED.cy)/(H/ED.z)*R.height]})()")
        await pg.mouse.move(r[0],r[1]);await pg.mouse.down();await pg.mouse.move(r[0]+60,r[1]+30,steps=5);await pg.mouse.up()
        print(await ev("JSON.stringify([ED.sel&&ED.sel.k,gzPose(ED.sel),ED.undo.length])"))
        await pg.screenshot(path='/tmp/e2.png')
        # place object
        await ev("ED.tool='obj';ED.pal='lo_bear';ED.pw=30;gzRefresh()")
        await pg.mouse.click(400,300)
        # floor
        await ev("ED.tool='floor';ED.tile='lt_35';ED.bs=4;gzRefresh()")
        await pg.mouse.move(300,450);await pg.mouse.down();await pg.mouse.move(500,470,steps=8);await pg.mouse.up()
        await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/e3.png')
        m=await ev("JSON.stringify(gzSerialize()).slice(0,400)");print(m)
        await ev("ED.tool='sel';gzZoom(.35);gzRefresh()");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/e4.png')
        await ev("gzSave()");await pg.wait_for_timeout(800);print(await ev("dbox.innerText.slice(0,120)"))
        await ev("closeDlg();gzExit(1)");await pg.wait_for_timeout(400)
        # reload and verify persisted locally
        await pg.reload();await pg.wait_for_timeout(4000)
        print(await ev("JSON.stringify([EO.filter(e=>e.add&&!e.rm).length,Object.keys(EFL).length,gzPose(EO.find(e=>e.k=='lo_heart'))])"))
        await ev("closeDlg();p.x=2100;p.y=1040");await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/e5.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
