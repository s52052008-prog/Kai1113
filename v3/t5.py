import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type in('error',) else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        await pg.evaluate("for(let d=1;d<30;d++){T.day=d;if(wx()==0)break;}T.hour=12;const z=Z.find(z=>z.n=='健身房');p.x=z.x+z.w/2-6;p.y=z.y+60;p.vx=p.vy=0;")
        await pg.keyboard.down('ArrowUp'); await pg.wait_for_timeout(900); await pg.keyboard.up('ArrowUp')
        print('dialog open after walking up:',await pg.evaluate("!dlg.hidden"),'scene',await pg.evaluate("scene"))
        await pg.keyboard.press('1'); await pg.wait_for_timeout(300)
        print('scene now:',await pg.evaluate("scene"))
        # walk to exit
        await pg.keyboard.down('ArrowDown'); await pg.wait_for_timeout(1500); await pg.keyboard.up('ArrowDown')
        print('after exit scene:',await pg.evaluate("scene"),'p.y>bot',await pg.evaluate("p.y>Z.find(z=>z.n=='健身房').b.bot"),'dlg',await pg.evaluate("!dlg.hidden"))
        # crossing the avenue next to the building doesn't open dialogs
        await pg.evaluate("p.x=600;p.y=300;p.vx=p.vy=0;zone=null")
        await pg.keyboard.down('ArrowDown'); await pg.wait_for_timeout(2500); await pg.keyboard.up('ArrowDown')
        print('crossed road; y=',await pg.evaluate("Math.round(p.y)"),'dlg',await pg.evaluate("!dlg.hidden"),'scene',await pg.evaluate("scene"))
        # interior interactions
        await pg.evaluate("closeDlg();enterB(Z.find(z=>z.n=='銀行'))")
        await pg.evaluate("p.x=60;p.y=100")
        await pg.keyboard.press(' '); await pg.wait_for_timeout(200)
        print('bank menu:',(await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:200])
        await pg.evaluate("closeDlg();depo(50);wdr(20)")
        print('bank',await pg.evaluate("st.bank"),await pg.evaluate("st.money"))
        await pg.evaluate("exitB();closeDlg()")
        # police talk
        await pg.evaluate("const c=NP.find(n=>n.n.includes('林警員'));p.x=c.x-16;p.y=c.y;p.vx=0")
        await pg.keyboard.press(' '); await pg.wait_for_timeout(200)
        print('cop dlg:',(await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:260])
        await pg.keyboard.press('1'); await pg.wait_for_timeout(200)
        print('askway:',(await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:200])
        await pg.keyboard.press('3'); await pg.wait_for_timeout(200)
        print((await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:200])
        await pg.evaluate("closeDlg()")
        # fish
        await pg.evaluate("p.x=SPOTS[0].x+10;p.y=SPOTS[0].y+60;p.vx=0")
        await pg.keyboard.press(' '); await pg.wait_for_timeout(200)
        print('fish:',(await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:200])
        await pg.keyboard.press('1'); await pg.wait_for_timeout(200)
        print('inv',await pg.evaluate("JSON.stringify(st.inv)"))
        await pg.evaluate("closeDlg();coopMenu()")
        print((await pg.evaluate("dbox.innerText")).replace('\n',' | ')[:150])
        await pg.evaluate("closeDlg();cityMap()")
        await pg.wait_for_timeout(200)
        await pg.screenshot(path='/tmp/map.png')
        print('\n'.join(errs[:10]))
        await b.close()
asyncio.run(main())
