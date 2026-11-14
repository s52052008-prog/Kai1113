import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        print(await pg.evaluate("""(()=>{const miss={};['寵物店','服飾店','遊藝場','城光復興堂'].forEach(n=>{['sun','wed','sat','idle'].forEach(m=>{if(n=='城光復興堂')CH[m]=CH[m]||buildChurch(m);const rr=n=='城光復興堂'?CH[m]:IN[n];rr.fur.forEach(f=>{if(!FD[f[0]])miss[f[0]]=n})})});return JSON.stringify(miss)})()"""))
        print(errs);await b.close()
asyncio.run(main())
