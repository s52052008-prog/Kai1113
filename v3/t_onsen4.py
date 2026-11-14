import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        E=pg.evaluate
        await E("st.tkt='s';enterB(Z.find(z=>z.n=='火車站'));trainGo(true)");await pg.wait_for_timeout(2600)
        for nm in ['溫泉鄉','湯之里旅館','岩之湯','山莊食堂','茶行','溫泉鄉站']:
            await E(f"mtnGo('{nm}')" if nm!='溫泉鄉' else "mtnShow('溫泉鄉',600,380,0)")
            n=await E("rm.ppl.length")
            for i in range(n):
                await E(f"talkIn(rm.ppl[{i}])");await E("closeDlg()")
        print('talk ok',errs)
        await E("mtnShow('溫泉鄉',860,364,0);T.hour=20.5")
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/o_night.png')
        await E("T.hour=12;talkIn(rm.ppl.find(n=>n.n.includes('蛋攤')))");await pg.wait_for_timeout(200)
        await pg.screenshot(path='/tmp/o_talk.png')
        print(errs)
        await b.close()
asyncio.run(main())
