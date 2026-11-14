import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':900,'height':300})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        await pg.evaluate("""(()=>{const c=document.createElement('canvas');c.width=900;c.height=300;c.style.cssText='position:fixed;left:0;top:0;z-index:999999;background:#fff';document.body.appendChild(c);const x=c.getContext('2d');x.imageSmoothingEnabled=false;
        ['g10','g11','g12','g15','g16','g18','g19','g24','g29','yh_sheet'].forEach((k,i)=>{const key=k.includes('_')?k:k+'_sheet';const im=UAI[key];if(im)x.drawImage(im,0,0,64,128,i*88,20,64,128);x.fillText(k,i*88+10,170)})})()""")
        await pg.screenshot(path='/tmp/spr.png');await b.close()
asyncio.run(main())
