import asyncio,sys
from playwright.async_api import async_playwright
rooms=sys.argv[1:] or ['家','咖啡店','全家','城光復興堂','電影院','健身房']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        for n in rooms:
            await pg.evaluate(f"closeDlg&&closeDlg();enterB(Z.find(z=>z.n=='{n}')||Z[0]);T.hour=12")
            await pg.wait_for_timeout(500)
            await pg.screenshot(path=f'/tmp/r_{n}.png')
        await pg.evaluate("openDlg('💬 小花','你好，今天天氣真好！',[['嗨，小花','',()=>{}],['再見','',()=>{}]])")
        await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/r_dlg.png')
        await pg.evaluate("closeDlg();openBag()");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/r_bag.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
