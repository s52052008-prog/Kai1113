import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        # showcase: build a vehicle sheet on an offscreen canvas
        await pg.evaluate("""()=>{const cv=document.createElement('canvas');cv.width=900;cv.height=300;cv.id='sheet';cv.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#555;width:900px';document.body.appendChild(cv);const c=cv.getContext('2d');
 const ks=['car','suv','sport','hatch','pickup','van','truck','taxi'];let x=6;
 ks.forEach((k,i)=>{const col=['#d33a3a','#1f2a38','#f2c230','#3a7bd5','#4a5a3a','#f4f4f4','#2f80ed','#f2c230'][i];const s=sideSpr(k,col,{});c.drawImage(s.img,x,10,s.w*3,s.h*3);x+=s.w*3+6});
 x=6;ks.forEach((k,i)=>{const col=['#d33a3a','#1f2a38','#f2c230','#3a7bd5','#4a5a3a','#f4f4f4','#2f80ed','#f2c230'][i];[false,true].forEach(bk=>{const s=frontSpr(k,col,bk,{});c.drawImage(s.img,x,150,s.w*2.4,s.h*2.4);x+=s.w*2.4+2})});}""")
        await pg.screenshot(path='/tmp/veh.png',clip={'x':0,'y':0,'width':900,'height':300})
        print(errs[:5]);await b.close()
asyncio.run(main())
