import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':760})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500);ev=pg.evaluate
        await ev("closeDlg();enterB(Z.find(z=>z.n=='家'));closeDlg();p.x=300;p.y=150;gzEnter()");await pg.wait_for_timeout(500)
        print(await ev("EDCAT.map(c=>c[0]+':'+c[1].filter(k=>uaOK(k)||GZWALL[k]).length).join(' ')"))
        await pg.screenshot(path='/tmp/i1.png')
        # select sofa via click
        r=await ev("(()=>{const f=rm.fur.find(f=>f[5]=='lf_120');const b=gzRBox(f);const R=cv.getBoundingClientRect();return [R.left+(b.x+b.w/2-ED.cx)/(W/ED.z)*R.width,R.top+(b.y+b.h/2-ED.cy)/(H/ED.z)*R.height]})()")
        await pg.mouse.move(r[0],r[1]);await pg.mouse.down();await pg.mouse.move(r[0]-80,r[1]-30,steps=6);await pg.mouse.up()
        print('A',await ev('JSON.stringify([ROOMED.size,ED.sel&&ED.sel.f&&ED.sel.f[5]])'));await ev("gzSelAct('mx')");print('B',await ev('ROOMED.size'));await pg.wait_for_timeout(300)
        await ev("ED.tool='obj';ED.pal='#wv';ED.pw=0;gzRefresh()");await pg.mouse.click(700,300)
        await ev("ED.tool='obj';ED.pal='lf_238';ED.pw=0;gzRefresh()");await pg.mouse.click(500,350)
        await ev("ED.tool='floor';ED.tile='lt_17';ED.bs=4;gzRefresh()")
        await pg.mouse.move(150,450);await pg.mouse.down();await pg.mouse.move(300,470,steps=6);await pg.mouse.up()
        await ev("ED.tool='sel';gzRefresh()");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/i2.png')
        m=await ev("JSON.stringify(Object.keys(gzSerialize().rooms||{}))");print(m)
        await ev("gzSave()");await pg.wait_for_timeout(500);await ev("closeDlg();gzExit(1)")
        await pg.reload();await pg.wait_for_timeout(4000)
        print(await ev("JSON.stringify([IN['家'].fur.filter(f=>f[5]=='lf_238').length,Object.keys(IN['家']._efl||{}).length,IN['家'].fur.find(f=>f[5]=='lf_120')[7]])"))
        await ev("ED.q='沙發';gzEnter()");await pg.wait_for_timeout(200)
        await ev("closeDlg();gzExit(1);enterB(Z.find(z=>z.n=='家'));closeDlg();p.x=300;p.y=150;gzEnter();ED.q='沙發';ED.tool='obj';gzRefresh()");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/i3.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
