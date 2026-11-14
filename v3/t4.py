import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type in('error',) else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{p.x=84;p.y=664;const out={};
         const sim=(hour,secs)=>{T.hour=hour;let stopped=0,samples=0,maxStuck=0,racers=0,police=0,vis=0;const stuck=new Map();
          for(let i=0;i<secs*20;i++){T.hour=hour+i/20/3600*0; trafficStep(.05);
            if(i%20==0){TR.forEach(v=>{if(v.hold>0)return;samples++;if(v.spd<1.5)stopped++;vis++;const k=v.idx;const s=stuck.get(k)||{x:v.x,y:v.y,t:0};if(Math.abs(s.x-v.x)+Math.abs(s.y-v.y)<.5)s.t++;else{s.x=v.x;s.y=v.y;s.t=0}stuck.set(k,s);maxStuck=Math.max(maxStuck,s.t);if(v.k=='rmoto'||v.k=='racer')racers++;if(v.k=='police')police++})}}
          return {active:Math.round(vis/(secs)),stoppedPct:Math.round(stopped/samples*100),maxStuckSec:maxStuck,racerSamples:racers,policeSamples:police,total:TR.length}};
         out.day=sim(12,300);out.rush=sim(8,300);out.night=sim(23.5,400);out.late=sim(2,600);return out})()""")
        print(json.dumps(r,ensure_ascii=False,indent=1))
        print('\n'.join(errs[:10]))
        await b.close()
asyncio.run(main())
