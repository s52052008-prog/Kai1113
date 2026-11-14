import asyncio,sys,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type in('error',) else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(1200)
        await pg.evaluate("for(let d=1;d<30;d++){T.day=d;if(wx()==0)break;}T.hour=12")
        names=await pg.evaluate("Z.map(z=>z.n)")
        print(names)
        # door dialog test
        z=await pg.evaluate("(()=>{const z=Z.find(z=>z.n=='健身房');p.x=z.x+z.w/2-6;p.y=z.y+2;p.vx=p.vy=0;return [z.x,z.y]})()")
        await pg.wait_for_timeout(300)
        await pg.evaluate("checkZone()")
        print('dlg hidden?',await pg.evaluate("dlg.hidden"), await pg.evaluate("dbox.innerText.slice(0,80)"))
        await pg.screenshot(path='/tmp/dz.png')
        for n in names:
            await pg.evaluate("closeDlg()")
            await pg.evaluate(f"(()=>{{const z=Z.find(z=>z.n=='{n}');T.hour=12;enterB(z)}})()")
            await pg.wait_for_timeout(500)
            await pg.screenshot(path=f'/tmp/in_{names.index(n)}.png')
            await pg.evaluate("exitB()")
        print('\n'.join(errs[:20]))
        await b.close()
asyncio.run(main())
