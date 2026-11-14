import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        E=pg.evaluate
        await E("st.money=3000;T.hour=11;")
        # town station
        await E("const z=Z.find(z=>z.n=='火車站');p.x=z.x+z.w/2-6;p.y=z.b.bot+14;zone=z");await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/o_town.png')
        await E("enterB(Z.find(z=>z.n=='火車站'))");await pg.wait_for_timeout(300)
        await pg.screenshot(path='/tmp/o_st1.png')
        await E("trainMenu('town')");await pg.wait_for_timeout(200)
        await pg.screenshot(path='/tmp/o_menu.png')
        await E("st.money-=200;st.tkt='r';closeDlg();trainGo(true)");await pg.wait_for_timeout(3000)
        print('scene',await E("scene"),'hour',await E("T.hour"),'tkt',await E("st.tkt"),'errs',errs)
        await pg.screenshot(path='/tmp/o_st2.png')
        # whole map render
        await E("mtnShow('溫泉鄉',190,640,0)");await pg.wait_for_timeout(500)
        await pg.screenshot(path='/tmp/o_map1.png')
        await E("rm.cv.toBlob?0:0")
        data=await E("(()=>{const c=document.createElement('canvas');c.width=1100;c.height=720;const x=c.getContext('2d');x.drawImage(rm.cv,0,0,1100,720);return c.toDataURL('image/png')})()")
        import base64;open('/tmp/o_full.png','wb').write(base64.b64decode(data.split(',')[1]))
        print('errs',errs)
        await b.close()
asyncio.run(main())
