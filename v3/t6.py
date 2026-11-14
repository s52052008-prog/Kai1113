import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const res={};
         const col=(x0,y0,x1,y1,vertical)=>{const ok=[];for(let x=x0;x<x1;x+=4){let bad=false,at=0;for(let y=y0;y<y1;y+=2){p.x=vertical?x:y;p.y=vertical?y:x;if(staticBlk()){bad=true;at=y;break}}if(!bad)ok.push(x)}
           const rg=[];let s=null,pv=null;ok.forEach(x=>{if(s==null){s=x}else if(x-pv>4){rg.push([s,pv]);s=x}pv=x});if(s!=null)rg.push([s,pv]);return rg};
         res.H1=col(0,300,1790,430,true).filter(r=>r[1]-r[0]>=8);
         res.H2=col(0,690,1790,800,true).filter(r=>r[1]-r[0]>=8);
         res.V1=col(0,660,1100,800,false).filter(r=>r[1]-r[0]>=8);
         res.V2=col(0,1200,1100,1300,false).filter(r=>r[1]-r[0]>=8);
         return res})()""")
        for k,v in r.items(): print(k,v)
        await b.close()
asyncio.run(main())
