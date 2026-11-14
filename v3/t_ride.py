import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        E=pg.evaluate
        await E("st.money=40000;const z=Z.find(z=>z.n=='家');p.x=z.x+z.w/2;p.y=z.b.bot+14;")
        for t,k,pr in [('bike',None,380),('moto',None,2800),('car','suv',13500)]:
            await E(f"vBuyColor('{t}',{repr(k) if k else 'null'},{pr});dlgFns[0]()")
        print('veh',await E("JSON.stringify(st.veh)"),await E("st.money"))
        await E("p.x=st.veh.moto.cx;p.y=st.veh.moto.cy+14");await pg.wait_for_timeout(200)
        print('near',await E("vNear()"))
        await pg.screenshot(path='/tmp/r_park.png')
        await E("act()");print('ride',await E("p.ride"),await E("[p.w,p.h]"))
        # ride right for 1s
        await pg.keyboard.down('ArrowRight');x0=await E("p.x");await pg.wait_for_timeout(1000);await pg.keyboard.up('ArrowRight');x1=await E("p.x");print('moved',round(x1-x0))
        await pg.screenshot(path='/tmp/r_moto.png')
        # try dismount on road
        await E("p.x=740;p.y=360");await E("act()");print('road dismount ride?',await E("p.ride"),await E("toastEl.textContent"))
        # run red light
        await E("LT.i=0;LT.t=0")  # H green so V red
        await E("p.x=740;p.y=250;p.vx=0;p.vy=0;st.money=1000;VRP.in=null;VRP.cd=0")
        await pg.keyboard.down('ArrowDown');await pg.wait_for_timeout(1500);await pg.keyboard.up('ArrowDown')
        print('fine?',await E("st.money"),await E("toastEl.textContent"))
        # car test
        await E("act()") if False else 0
        await E("p.x=50;p.y=50")
        await E("vDismount()");print('dismount',await E("p.ride"),await E("JSON.stringify(st.veh.moto)"))
        # mount car & ride into building wall
        await E("const c=st.veh.car;p.x=c.cx;p.y=c.cy+16");await E("act()");print('car',await E("p.ride"),await E("[p.w,p.h]"))
        await pg.keyboard.down('ArrowUp');await pg.wait_for_timeout(1200);await pg.keyboard.up('ArrowUp')
        print('pos',await E("[Math.round(p.x),Math.round(p.y)]"),'blocked',await E("blocked()"))
        await pg.screenshot(path='/tmp/r_car.png')
        # enter building while riding
        await E("enterB(Z.find(z=>z.n=='全家'))");print('inside ride?',await E("p.ride"),await E("[p.w,p.h]"),await E("scene"))
        await E("exitB()")
        # save/load while riding
        await E("const c=st.veh.bike;p.x=c.cx;p.y=c.cy+12;act()");print('bike ride',await E("p.ride"))
        await E("svSave('s1',1)");await E("svLoad(svRead('s1'))");print('after load',await E("p.ride"),await E("[p.w,p.h]"),await E("JSON.stringify(Object.keys(st.veh).map(k=>[k,st.veh[k].rd]))"))
        print(errs[:6]);await b.close()
asyncio.run(main())
