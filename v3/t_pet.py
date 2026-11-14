import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        r=await pg.evaluate("""(()=>{const a=NP.find(n=>n.t);if(!a)return 'none';petTalk(a);const x=curDlg[0]+'|'+curDlg[1];closeDlg();petTalk(a);const y=curDlg[0]+'|'+curDlg[1];closeDlg();return [x,y]})()""")
        print(r)
        # rent
        r=await pg.evaluate("[typeof rentInfo,typeof rentTick,JSON.stringify(rentInfo&&rentInfo())]");print(r)
        print(errs);await b.close()
asyncio.run(main())
