import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':300})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.evaluate("""()=>{const cv=document.createElement('canvas');cv.width=960;cv.height=300;cv.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#8c9;width:960px';document.body.appendChild(cv);const c=cv.getContext('2d');c.scale(6,6);
 const ks=[['dog','#b9803c'],['frenchie','#d9b48a'],['frenchie','#8a8a96'],['shiba'],['cat','#e8a45a'],['cat','#8a96a8'],['cat','#f4efe0'],['rabbit','#f4f2ea'],['rabbit','#b8a898'],['turtle'],['parrot','#e0443a'],['parrot','#3ac0d0'],['callduck'],['hamster'],['chicken','#f4efe0'],['duck'],['sheep']];
 ks.forEach((q,i)=>{[0,1].forEach(j=>drawA(c,{t:q[0],c:q[1],x:(i%8)*19+2,y:14+Math.floor(i/8)*22+j*0,dir:3,mv:j==1,fr:1}))})}""")
        await pg.screenshot(path='/tmp/an.png',clip={'x':0,'y':0,'width':960,'height':300})
        print(errs[:5]);await b.close()
asyncio.run(main())
