import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':1280,'height':800})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(5000);ev=pg.evaluate
        print(await ev("EDCAT.length+' '+EDCAT.filter(c=>c[0].startsWith('📦')).map(c=>c[0]+c[1].length).join(',')"))
        await ev("closeDlg();p.x=1100;p.y=200;gzEnter();ED.cat=EDCAT.findIndex(c=>c[0]=='📦 7-ELEVEN');ED.tool='obj';gzRefresh();0");await pg.wait_for_timeout(800)
        await ev("ED.pal='pk01_0';ED.pw=gzNomW('pk01_0');gzRefresh();0");await pg.mouse.click(400,400)
        await ev("ED.pal='pk03_1';ED.pw=gzNomW('pk03_1');gzRefresh();0");await pg.mouse.click(600,450)
        await ev("ED.pal='pk05_0';ED.pw=gzNomW('pk05_0');gzRefresh();0");await pg.mouse.click(700,600)
        await ev("ED.tool='floor';ED.tile='pk24_5';ED.bs=4;gzRefresh();0");await pg.mouse.move(200,300);await pg.mouse.down();await pg.mouse.move(350,320,steps=5);await pg.mouse.up()
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/pk1.png')
        await ev("ED.tool='obj';ED.cat=EDCAT.findIndex(c=>c[0]=='📦 狗狗');gzRefresh();0");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/pk2.png')
        await ev("gzSave();0");await pg.wait_for_timeout(500);await ev("closeDlg();gzExit(1);0");await pg.reload();await pg.wait_for_timeout(5000)
        print(await ev("JSON.stringify(EO.filter(e=>e.add&&e.k.startsWith('pk')).map(e=>e.k))"))
        print(errs[:5]);await b.close()
asyncio.run(main())
