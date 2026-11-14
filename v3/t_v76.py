import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        r=await pg.evaluate("""(()=>{closeDlg();T.hour=10;askEnter(Z.find(z=>z.n=='家'));const t=dbox.innerText;const i=curDlg[2].findIndex(o=>/外觀/.test(o[0]));curDlg[2][i][2]();return t.slice(0,120)})()""")
        print(r);await pg.wait_for_timeout(900);await pg.screenshot(path='/tmp/home.png');await pg.keyboard.press('Space');await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{closeDlg();enterB(Z.find(z=>z.n=='碳佐麻里'));return scene+' '+rm.title+' | '+rm.ppl.map(n=>n.n).join(',')})()""")
        print(r);await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/tan.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
