import asyncio,base64
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        d=await pg.evaluate("""()=>{const o=document.createElement('canvas');o.width=1600;o.height=Math.round(1600*WH/WW);const c=o.getContext('2d');c.drawImage(S,0,0,o.width,o.height);
        c.fillStyle='rgba(0,0,0,.6)';const k=1600/WW;DEC.forEach(d=>{c.fillRect(d.x*k,d.y*k,d.w*k,d.h*k)});c.strokeStyle='#00f';solids.forEach(q=>c.strokeRect(q.x*k,q.y*k,q.w*k,q.h*k));return o.toDataURL('image/png')}""")
        open('/tmp/world.png','wb').write(base64.b64decode(d.split(',')[1]));await b.close()
asyncio.run(main())
