import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        print(await pg.evaluate("""(()=>{const out=[];['里長老李','貓奶奶','小花','行商阿福','阿寶','農夫伯','牧場阿姨','廟祝 王伯'].forEach(nm=>{const n=NP.find(q=>q.n==nm);out.push(nm+':'+(n?nsKey(n.n,n):'none')+':'+(n?dKeyOf(n):''))});return out.join(' ')})()"""))
        await pg.evaluate("T.hour=10;closeDlg();const n=NP.find(q=>q.n=='里長老李');p.x=n.x+20;p.y=n.y")
        await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/n8a.png')
        await pg.evaluate("const n=NP.find(q=>q.n=='里長老李');talk(n)");await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/n8b.png')
        await pg.evaluate("closeDlg();const n=NP.find(q=>q.n=='小花');p.x=n.x+20;p.y=n.y;n.vis=null")
        await pg.wait_for_timeout(1200);await pg.screenshot(path='/tmp/n8c.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
async def m2():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        for nm in ['小花','阿寶','廟祝 王伯','行商阿福']:
            print(await pg.evaluate(f"(()=>{{closeDlg();const n=NP.find(q=>q.n=='{nm}');dlgEngine(n);return dbox.innerText.slice(0,90)}})()"))
        await b.close()
asyncio.run(m2())
