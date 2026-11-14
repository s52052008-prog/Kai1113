import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox'])
        ctx=await b.new_context(viewport={'width':844,'height':390},has_touch=True,is_mobile=True,device_scale_factor=2)
        pg=await ctx.new_page();errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.screenshot(path='/tmp/mob1.png')
        await pg.evaluate("""(()=>{const z=document.getElementById('zr'),r=z.getBoundingClientRect();const mk=(t,x,y)=>z.dispatchEvent(new PointerEvent(t,{pointerId:5,clientX:x,clientY:y,bubbles:true,isPrimary:true}));
          window.__x0=p.x;mk('pointerdown',r.left+r.width/2,r.bottom-60);mk('pointermove',r.left+r.width/2+40,r.bottom-60);})()""")
        await pg.wait_for_timeout(800)
        print(await pg.evaluate("[window.__x0,p.x,JSON.stringify(keys)]"))
        await pg.screenshot(path='/tmp/mob2.png')
        await pg.evaluate("document.getElementById('zr').dispatchEvent(new PointerEvent('pointerup',{pointerId:5,bubbles:true}))")
        print(errs);await b.close()
asyncio.run(main())
