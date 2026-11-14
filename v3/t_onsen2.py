import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        E=pg.evaluate
        await E("st.money=5000;T.hour=11;st.tkt='r';")
        await E("enterB(Z.find(z=>z.n=='火車站'))")
        await E("trainGo(true)");await pg.wait_for_timeout(2600)
        print('A scene',await E("scene"),'tkt',await E("st.tkt"))
        # leave station via bottom exit
        await E("p.x=rm.W/2-6;p.y=rm.H-9");await pg.wait_for_timeout(300)
        print('B after exit scene',await E("scene"),await E("[Math.round(p.x),Math.round(p.y)]"))
        # reachability BFS in outdoor map
        res=await E("""(()=>{const sv=rm.ppl;rm.ppl=[];const sx=p.x,sy=p.y;const S=4,seen=new Set();const q=[[Math.round(p.x/S),Math.round(p.y/S)]];seen.add(q[0].join());
        const ok=(gx,gy)=>{p.x=gx*S;p.y=gy*S;return !iBlocked()};
        while(q.length){const [gx,gy]=q.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=gx+dx,ny=gy+dy,k=nx+','+ny;if(seen.has(k))continue;if(ok(nx,ny)){seen.add(k);q.push([nx,ny])}}}
        const out={};rm.sp.forEach(s=>{let f=0;for(const k of seen){const [gx,gy]=k.split(',').map(Number);if(hit({x:gx*S-8,y:gy*S-8,w:28,h:24},{x:s[1],y:s[2],w:s[3],h:s[4]})){f=1;break}}out[s[0]]=f});
        p.x=sx;p.y=sy;rm.ppl=sv;return {n:seen.size,out}})()""")
        print('reach',json.dumps(res,ensure_ascii=False))
        # enter each sub-room and check exit
        for nm in ['湯之里旅館','茶行','岩之湯','山莊食堂','溫泉鄉站']:
            await E(f"mtnGo('{nm}')");await pg.wait_for_timeout(250)
            r=await E("""(()=>{const sv=rm.ppl;rm.ppl=[];const S=4,seen=new Set();const q=[[Math.round(p.x/S),Math.round(p.y/S)]];seen.add(q[0].join());const ok=(gx,gy)=>{p.x=gx*S;p.y=gy*S;return !iBlocked()};
        while(q.length){const [gx,gy]=q.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=gx+dx,ny=gy+dy,k=nx+','+ny;if(seen.has(k))continue;if(ok(nx,ny)){seen.add(k);q.push([nx,ny])}}}
        const out={};rm.sp.forEach(s=>{let f=0;for(const k of seen){const [gx,gy]=k.split(',').map(Number);if(hit({x:gx*S-8,y:gy*S-8,w:28,h:24},{x:s[1],y:s[2],w:s[3],h:s[4]})){f=1;break}}out[s[0]]=f});rm.ppl=sv;return out})()""")
            print(nm,json.dumps(r,ensure_ascii=False))
            await E("p.x=rm.W/2-6;p.y=rm.H-9");await pg.wait_for_timeout(250)
            print('  back in',await E("scene"))
        print('errs',errs)
        await b.close()
asyncio.run(main())
