import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        await pg.evaluate("closeDlg();T.hour=14;p.x=760;p.y=600");await pg.wait_for_timeout(5000);await pg.screenshot(path='/tmp/v1.png')
        await pg.evaluate("p.x=1100;p.y=1180");await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/v2.png')
        r=await pg.evaluate("""(()=>{st.money=99999;closeDlg();vBuyColor('moto',null,0);const t=dbox.innerText.slice(0,200);dlgFns[5]();dlgFns[0]();const o=st.veh.moto;p.x=o.cx-6;p.y=o.cy-4;vMount('moto');return t+' | '+JSON.stringify(st.veh.moto)+' ride='+p.ride+' sp='+vSpeed()})()""")
        print(r);await pg.keyboard.down('ArrowRight');await pg.wait_for_timeout(600);await pg.keyboard.up('ArrowRight');await pg.wait_for_timeout(200);await pg.screenshot(path='/tmp/v3.png')
        await pg.keyboard.down('ArrowDown');await pg.wait_for_timeout(500);await pg.keyboard.up('ArrowDown');await pg.wait_for_timeout(200);await pg.screenshot(path='/tmp/v4.png')
        r=await pg.evaluate("(()=>{enterB(Z.find(z=>z.n=='消防局'));return scene})()");await pg.wait_for_timeout(800);await pg.screenshot(path='/tmp/v5.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
