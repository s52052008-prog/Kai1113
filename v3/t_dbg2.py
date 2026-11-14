import asyncio
from playwright.async_api import async_playwright
JS="""(a)=>{const [h,d]=a;T.day=d;T.hour=h;enterB(Z.find(z=>z.n=='城光復興堂'));const out={mode:CHM(),npcs:rm.ppl.filter(n=>n.dyn).map(n=>[n.n,Math.round(n.x),Math.round(n.y),!!n.sit])};
 const f=rm.ppl.find(n=>n.n=='許舫慈');if(f){// 找出與其最近距離可站立點
  const q0={x:p.x,y:p.y};let best=null;for(let y=f.y-30;y<=f.y+30;y+=2)for(let x=f.x-30;x<=f.x+30;x+=2){p.x=x;p.y=y;if(!iBlocked()){const dd=Math.hypot(x-f.x,y-f.y);if(dd<30){const near=rm.ppl.filter(o=>Math.hypot(o.x-x,o.y-y)<30).sort((a,b)=>Math.hypot(a.x-x,a.y-y)-Math.hypot(b.x-x,b.y-y))[0];if(near&&near.n=='許舫慈'){best=[x,y,dd];break}}}if(best)break}
  p.x=q0.x;p.y=q0.y;out.fangci=[Math.round(f.x),Math.round(f.y)];out.spotNearest=best}
 return out}"""
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        for d,h in [(7,10),(7,14),(4,19),(6,12),(6,14),(6,17),(1,12),(2,16)]:
            r=await pg.evaluate(JS,[h,d]);print(d,h,r['mode'],'F',r.get('fangci'),'spot',r.get('spotNearest'))
            if d==6 and h==12:print(r['npcs'])
        await b.close()
asyncio.run(main())
