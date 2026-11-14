import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        r=await pg.evaluate("""(()=>{const c=[0,0,0,0];for(let d=1;d<=30;d++)for(let h=0;h<24;h+=8){T.day=d;T.hour=h;c[wx()]++}
          for(let d=1;d<=30;d++){T.day=d;T.hour=12;if(wx()==2)break}return c.join(',')+' rainday '+T.day})()""")
        print('分佈(晴,雲,雨,風)',r)
        await pg.evaluate("T.hour=12;p.x=500;p.y=400");await pg.wait_for_timeout(700);await pg.screenshot(path='/tmp/rain.png')
        await pg.evaluate("T.hour=21;");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/night21.png')
        await pg.evaluate("T.hour=2;");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/night2.png')
        print(errs);await b.close()
asyncio.run(main())
