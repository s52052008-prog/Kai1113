import asyncio,json,sys
from playwright.async_api import async_playwright
R=['健身房','碳佐麻里','遊藝場','電影院','城光復興堂','咖啡店','火車站','溫泉鄉站','湯之里旅館','岩之湯','山莊食堂']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        if len(sys.argv)>1:
            d=await pg.evaluate("JSON.stringify(Object.fromEntries(%s.map(n=>[n,{W:IN[n].W,H:IN[n].H,fur:IN[n].fur.map(f=>f.slice(0,5))}])))"%json.dumps(R,ensure_ascii=False))
            open('/tmp/fur.json','w').write(d)
        for i,n in enumerate(R):
            await pg.evaluate("closeDlg();if(scene)exitB();T.hour=19");
            if n=='溫泉鄉站' or n in ['湯之里旅館','岩之湯','山莊食堂']: await pg.evaluate(f"mtnShow('{n}',IN['{n}'].W/2,IN['{n}'].H-40,1)")
            else: await pg.evaluate(f"enterB(Z.find(z=>z.n=='{n}'))")
            await pg.wait_for_timeout(900);await pg.evaluate("closeDlg()");await pg.wait_for_timeout(300)
            await pg.screenshot(path=f'/tmp/r{i}.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
