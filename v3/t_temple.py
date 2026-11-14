import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        d=await pg.evaluate("""()=>{const o=document.createElement('canvas');o.width=900;o.height=600;const c=o.getContext('2d');const b=BN['廟'];c.drawImage(S,(b.x-60)*KS,(b.y-70)*KS,(b.w+120)*KS,(b.h+110)*KS,0,0,900,Math.round(900*(b.h+110)/(b.w+120)));return o.toDataURL('image/png')}""")
        open('/tmp/temple.png','wb').write(base64.b64decode(d.split(',')[1]));print(errs);await b.close()
asyncio.run(main())
