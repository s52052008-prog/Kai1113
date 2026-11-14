import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        d=await pg.evaluate("""()=>{const o=document.createElement('canvas');o.width=600;o.height=150;const c=o.getContext('2d');c.fillStyle='#ccc';c.fillRect(0,0,600,200);
         const S=7;[ALLEN,genLook("student",5).lk,genLook("elder",6).lk,genLook("police",7).lk].forEach((lk,i)=>{c.save();c.beginPath();c.rect(i*150,0,150,150);c.clip();c.translate(i*150+75,8+31*(lk.sc||1)*S);c.scale(S,S);drawChar(c,{x:-6,y:-8,dir:0,mv:false,fr:0,lk,ph:0});c.restore()});
         return o.toDataURL('image/png')}""")
        open('/tmp/port.png','wb').write(base64.b64decode(d.split(',')[1]));print(errs);await b.close()
asyncio.run(main())
