import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600});pg.on('console',lambda m:print(m.text))
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.evaluate("""()=>{const cv=document.createElement('canvas');cv.width=960;cv.height=600;cv.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#8c9;width:960px';document.body.appendChild(cv);const c=cv.getContext('2d');c.scale(5,5);
 const kinds=['student','student','office','kid','elder','jogger','worker','police','tourist','default','student','elder'];
 const ex=[{},{},{},{},{},{},{},{},{},{},{},{}];
 kinds.forEach((k,i)=>{const g=genLook(k,i*13+5);if(!g.lk.hr)console.log('nohr',k,JSON.stringify(g.lk));[0,3,1,5].forEach((d,j)=>{drawChar(c,{x:6+i*15.5-6,y:12+j*28,dir:d,mv:j==1,fr:i%2,lk:g.lk,pose:'',ph:1})})});
 const named=['廚師','護士','醫生','服務生','老闆娘','里長','小花','農夫','健身客','老師','警察','廟祝'];
 named.forEach((n,i)=>{const lk=lookFor({n,x:i*7});if(!lk.hr)console.log('nohr-named',n,JSON.stringify(lk));[0,3].forEach((d,j)=>drawChar(c,{x:i*15.5,y:124+j*28,dir:d,lk,pose:'',ph:1}))});
 c.setTransform(1,0,0,1,0,0);c.scale(5,5);drawChar(c,{x:6,y:70,dir:0,lk:ALLEN,ph:1})}""")
        await pg.screenshot(path='/tmp/chars.png',clip={'x':0,'y':0,'width':960,'height':600})
        print(errs[:5]);await b.close()
asyncio.run(main())
