import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('page'+'error',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{T.hour=12;p.x=84;p.y=664;const W0=NP.filter(n=>n.walk);const st0=W0.map(n=>[n.x,n.y]);
         const moved=new Array(W0.length).fill(0),last=W0.map(n=>[n.x,n.y]);let crossings=0;
         for(let i=0;i<20*240;i++){updateWorld(.05);W0.forEach((n,k)=>{if(i%100==0){const d=Math.hypot(n.x-last[k][0],n.y-last[k][1]);if(d>3)moved[k]++;last[k]=[n.x,n.y]}})}
         const stuck=W0.map((n,k)=>[n.n,moved[k],Math.round(n.x),Math.round(n.y),n.hid?1:0]).filter(a=>a[1]<2);
         return {walkers:W0.length,stuck,hidden:W0.filter(n=>n.hid).length}})()""")
        print(json.dumps(r,ensure_ascii=False))
        print(errs)
        await b.close()
asyncio.run(main())
