import asyncio
from playwright.async_api import async_playwright
JS="""(name)=>{enterB(Z.find(z=>z.n==name));closeDlg();const st0=[Math.round(p.x/4),Math.round(p.y/4)],seen=new Set([st0.join()]),q=[st0];
 const ok=(a,b)=>{p.x=a*4;p.y=b*4;return !iBlocked()};
 while(q.length){const [a,b]=q.shift();for(const [da,db] of [[1,0],[-1,0],[0,1],[0,-1]]){const k=[a+da,b+db].join();if(seen.has(k))continue;if(ok(a+da,b+db)){seen.add(k);q.push([a+da,b+db])}}}
 const res={};rm.sp.forEach(s=>{let hit_=false;for(let x=s[1];x<=s[1]+s[3]&&!hit_;x+=4)for(let y=s[2]-10;y<=s[2]+s[4]+10;y+=4){if(seen.has([Math.round(x/4),Math.round(y/4)].join())){hit_=true;break}}res[s[0]]=hit_});return res}"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page()
        pg.on('pageerror',lambda e:print('ERR',e))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        for n in ['城光復興堂','電影院','健身房']:
            await pg.evaluate("T.hour=10;T.day=3;if(scene)exitB()")
            print(n,await pg.evaluate("("+JS+")('"+n+"')"))
        await b.close()
asyncio.run(main())
