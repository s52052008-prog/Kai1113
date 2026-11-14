import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':900,'height':900})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        await pg.evaluate("st.inv.cola=2;st.inv.apple=3;openDlg('💬 小花','你好，今天天氣真好！要不要一起去公園散步呢？',[['好啊，一起去','邀請她同行',()=>{}],['送禮物','',()=>{}],['再見','',()=>{}]])")
        await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/u_dlg.png')
        await pg.evaluate("closeDlg();openBag()");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/u_bag.png')
        print(errs);await b.close()
asyncio.run(main())
