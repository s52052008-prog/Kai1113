import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(4000);ev=pg.evaluate
        await ev("closeDlg();p.x=1100;p.y=950;gzEnter();ED.cat=7;ED.tool='obj';ED.pal='ns_ssteak';ED.pw=70;gzRefresh()")
        await pg.mouse.click(300,350)
        await ev("ED.pmx=1;ED.pal='vh_k_3_s';ED.pw=42;gzRefresh()");await pg.mouse.click(600,500)
        await ev("ED.pmx=0;ED.pal='iv_a_claw3';ED.pw=30;gzRefresh()");await pg.mouse.click(500,300)
        # select bench tree flip
        await ev("ED.tool='sel';ED.sel=EO.find(e=>e.kind=='tree'&&!e.rm);gzSelAct('mx');ED.sel=EO.find(e=>e.k=='st_lamp'&&!e.rm);gzSelAct('mx');gzRefresh()")
        await pg.mouse.move(700,400);await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/f1.png')
        m=await ev("(()=>{const m=gzSerialize();return JSON.stringify([m.add.slice(-3),Object.entries(m.mv).filter(q=>q[1][3]&4)])})()");print(m)
        await ev("gzSave()");await pg.wait_for_timeout(500);await ev("closeDlg();gzExit(1)")
        await pg.reload();await pg.wait_for_timeout(4000)
        print(await ev("JSON.stringify([EO.filter(e=>e.mx).length,EO.filter(e=>e.add&&!e.rm&&e.k=='vh_k_3_s').map(e=>e.mx)])"))
        await ev("closeDlg();gzEnter()");await pg.wait_for_timeout(300)
        print(await ev("EDCAT.map(c=>c[0]+':'+c[1].filter(k=>uaOK(k)).length).join(' ')"))
        await ev("ED.cat=9;ED.tool='obj';gzRefresh()");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/f2.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
