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
        await pg.evaluate("for(let d=1;d<30;d++){T.day=d;if(wx()==0)break;}T.hour=23.6;p.x=560;p.y=420;p.vx=p.vy=0;RACE.t=1")
        await pg.wait_for_timeout(500)
        st=await pg.evaluate("(()=>{let log=[];for(let i=0;i<20*200;i++){trafficStep(.05);if(RACE.st==2&&log.length<1){log.push(i/20);break}}return [RACE.st,RACE.list.length,log]})()")
        print('race state',st)
        # follow racers
        for i in range(8):
            await pg.evaluate("if(RACE.list[0]){p.x=RACE.list[0].x+RACE.list[0].w/2+(RACE.lane.dir>0?-60:60);p.y=RACE.lane.c<370?420:420;}")
            await pg.wait_for_timeout(250)
        await pg.screenshot(path='/tmp/race.png')
        print('seen',await pg.evaluate("RACE.seen"))
        # perf
        t=await pg.evaluate("(()=>{const t0=performance.now();for(let i=0;i<120;i++)frame0(performance.now()+i*16);return (performance.now()-t0)/120})()")
        print('ms/frame (headless sw render):',round(t,1))
        await pg.evaluate("T.hour=21;p.x=900;p.y=900;")
        await pg.wait_for_timeout(800)
        await pg.screenshot(path='/tmp/night.png')
        print('\n'.join(errs[:10]))
        await b.close()
asyncio.run(main())
