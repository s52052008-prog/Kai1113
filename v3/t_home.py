import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3500)
        for n,f in [('家','h5'),('家6F','h6'),('家樂福2F','c2'),('新興高中2F','s2'),('書局2F','b2'),('旅館2F','o2'),('診所2F','k2'),('家樂福','c1')]:
            d=await pg.evaluate(f"(()=>{{closeDlg();if('{n}'=='家')enterB(Z.find(z=>z.n=='家'));else mtnShow('{n}',100,100,0);closeDlg();return rm.cv.toDataURL()}})()")
            open(f'/tmp/{f}.png','wb').write(base64.b64decode(d.split(',')[1]))
        await pg.evaluate("closeDlg();exitB();enterB(Z.find(z=>z.n=='家'));closeDlg()");await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/h5s.png')
        print(await pg.evaluate("JSON.stringify([p.x,p.y,iBlocked(),scene])"))
        print(errs[:6]);await b.close()
asyncio.run(main())
