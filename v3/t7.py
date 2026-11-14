import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const G=6,cw=Math.ceil(WW/G),ch=Math.ceil(WH/G),seen=new Uint8Array(cw*ch);
          const free=(cx,cy)=>{p.x=cx*G;p.y=cy*G;return !staticBlk()};
          const q=[[Math.round(84/G),Math.round(664/G)]];seen[q[0][1]*cw+q[0][0]]=1;let n=0;
          while(q.length){const [x,y]=q.pop();n++;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=x+dx,ny=y+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(!free(nx,ny))continue;seen[ny*cw+nx]=1;q.push([nx,ny])}}
          const out={reached:n};
          out.doors=Z.map(z=>[z.n,seen[Math.round((z.y+2)/G)*cw+Math.round((z.x+z.w/2-6)/G)]]).filter(a=>!a[1]).map(a=>a[0]);
          const pts={farmGate:[1401,826],field:[215,262],park:[927,296],market:[1005,830],fishDock:[FP.x+FP.w/2-6,FP.y-24],coop:[COOP.x-12,COOP.y+30],plot:[PL[0].x,PL[0].y+30],giftDoor:[1570+0,940],sheep:[SHEEP.x-14,SHEEP.y+40]};
          out.pts={};for(const k in pts)out.pts[k]=seen[Math.round(pts[k][1]/G)*cw+Math.round(pts[k][0]/G)]?1:0;
          out.spots=SPOTS.map(sp=>{let c=0;for(let y=Math.floor((sp.y-30)/G);y<(sp.y+sp.h+30)/G;y++)for(let x=Math.floor((sp.x-30)/G);x<(sp.x+sp.w+30)/G;x++){if(seen[y*cw+x]){p.x=x*G;p.y=y*G;if(nearSpot()===sp)c++}}return [sp.n,c]});return out})()""")
        print(json.dumps(r,ensure_ascii=False))
        await b.close()
asyncio.run(main())
