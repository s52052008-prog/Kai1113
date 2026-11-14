import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        d=await pg.evaluate("""()=>{const o=document.createElement('canvas');o.width=1240;o.height=2320/2*1;const c=o.getContext('2d');o.height=1160;c.drawImage(S,1160*KS,0,1240*KS,1160*KS,0,0,1240,1160);
          DEC.forEach(d=>{if(d.x>1160)c.drawImage(d.spr,d.x-1160,d.y,d.w,d.h)});trees.forEach(t=>{if(t.x>1160)c.drawImage(treeSprite(t.k,t.v),t.x-1160-10,t.y-23,48,66)});return o.toDataURL('image/png')}""")
        open('/tmp/east.png','wb').write(base64.b64decode(d.split(',')[1]));await b.close()
asyncio.run(main())
