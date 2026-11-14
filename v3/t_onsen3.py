import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        E=pg.evaluate
        await E("st.money=9000;T.hour=11;st.tkt='r';enterB(Z.find(z=>z.n=='火車站'));trainGo(true)");await pg.wait_for_timeout(2600)
        for nm in ['湯之里旅館','茶行','岩之湯','山莊食堂']:
            await E(f"mtnGo('{nm}')");await pg.wait_for_timeout(300)
            await pg.screenshot(path=f'/tmp/o_{nm}.png')
        # run every spot function and click through every non-disabled option once
        await E("mtnShow('溫泉鄉',600,380,0)")
        for nm in ['inn','tea','bath','eat','sta','shrine','foot','egg','vent','scope','trail','koi']:
            await E("T.hour=11;st.sta=100;st.money=9000;st.inv.egg=2")
            await E(f"scene='溫泉鄉';rm=IN['溫泉鄉'];rm.spf['{nm}']()")
            await pg.wait_for_timeout(120)
            n=await E("dbox.querySelectorAll('button').length")
            # click each button in turn (re-open between)
            for i in range(n):
                await E("T.hour=11;st.sta=100;st.money=9000;st.inv.egg=2")
                await E(f"scene='溫泉鄉';rm=IN['溫泉鄉'];rm.spf['{nm}']()")
                await E(f"{{const bs=dbox.querySelectorAll('button');if(bs[{i}]&&!bs[{i}].disabled)bs[{i}].click()}}")
                await E("closeDlg()")
        print('errs',errs)
        await E("scene='溫泉鄉站';rm=IN['溫泉鄉站'];T.hour=23;trainMenu('onsen')")
        print(await E("[...dbox.querySelectorAll('button')].map(b=>b.textContent.slice(0,30)+(b.disabled?'(x)':'')).join(' | ')"))
        await pg.screenshot(path='/tmp/o_menu2.png')
        await E("closeDlg();T.hour=10;st.tkt=0")
        await E("st.money=500;st.tkt='b';mtnShow('溫泉鄉站',172,150,1);trainGo(false)");await pg.wait_for_timeout(2600)
        print('returned scene',await E("scene"),'zone',await E("zone&&zone.n"),await E("[Math.round(p.x),Math.round(p.y)]"),'hour',await E("T.hour"),'tkt',await E("st.tkt"))
        await pg.screenshot(path='/tmp/o_back.png')
        # save/load inside mountain
        await E("T.hour=11;enterB(Z.find(z=>z.n=='火車站'));st.tkt='s';trainGo(true)");await pg.wait_for_timeout(2600)
        await E("mtnShow('溫泉鄉',700,380,0)")
        snap=await E("JSON.stringify(svSnap())")
        await E("mtnGo('茶行')")
        snap2=await E("JSON.stringify(svSnap())")
        await E("scene=null;mtnReset();p.x=100;p.y=100")
        await E(f"svLoad({snap})");print('load1',await E("scene"),await E("[Math.round(p.x),Math.round(p.y)]"))
        await E(f"svLoad({snap2})");print('load2',await E("scene"),await E("[Math.round(p.x),Math.round(p.y)]"))
        # load town save while in mountain
        await E("exitB()");print('exit from tea ->',await E("scene"))
        town=await E("(()=>{mtnReset();return 1})()")
        await E("p.x=900;p.y=500;scene=null")
        tsnap=await E("JSON.stringify(svSnap())")
        await E("mtnShow('溫泉鄉',700,380,0)")
        await E(f"svLoad({tsnap})");print('load town',await E("scene"),await E("[Math.round(p.x),Math.round(p.y)]"))
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/o_loadtown.png')
        print('errs',errs)
        await b.close()
asyncio.run(main())
