import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(3500);ev=pg.evaluate
        await ev("closeDlg();enterB(Z.find(z=>z.n=='家'));closeDlg();0")
        # walk down the corridor then into living room
        for k,t in [('ArrowDown',900),('ArrowLeft',700)]:
            await pg.keyboard.down(k);await pg.wait_for_timeout(t);await pg.keyboard.up(k)
        print(await ev("JSON.stringify([Math.round(p.x),Math.round(p.y)])"));await pg.screenshot(path='/tmp/hw1.png')
        print(await ev("p.x=30;p.y=118;closeDlg();act();dbox.innerText.slice(0,40)+'|'+scene"))
        print(await ev("homeFloor(6);scene+'|'+iBlocked()"))
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/hw2.png')
        print(await ev("p.x=100;p.y=96;act();dbox.innerText.slice(0,30)"))
        print(await ev("closeDlg();homeFloor(5);p.x=470;p.y=46;act();scene"))
        for n in ['家樂福','新興高中','書局','旅館','診所']:
            r=await ev(f"(()=>{{closeDlg();if(scene)exitB();enterB(Z.find(z=>z.n=='{n}'));closeDlg();const s=rm.sp.find(s=>s[0]=='up2');p.x=s[1]+s[3]/2-6;p.y=s[2]+1;const blk=iBlocked();rm.spf.up2();const b2=iBlocked();const r=scene;const d=rm.sp.find(s=>s[0]=='down');p.x=d[1]+d[3]/2-6;p.y=d[2]+1;const b3=iBlocked();rm.spf.down();return [r,blk,b2,b3,scene,iBlocked()].join(',')}})()")
            print(n,r)
        print(errs[:5]);await b.close()
asyncio.run(main())
