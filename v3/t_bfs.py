import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':640})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const S0=6,cw=Math.ceil(WW/S0),ch=Math.ceil(WH/S0),seen=new Uint8Array(cw*ch);
          const blk=(x,y)=>{const q={x,y,w:12,h:8};return x<0||y<0||x+12>WW||y+8>WH||solids.some(o=>hit(q,o))};
          const st0=[Math.round(84/S0),Math.round(664/S0)],qu=[st0];seen[st0[1]*cw+st0[0]]=1;let n=0;
          while(qu.length){const [cx,cy]=qu.pop();n++;for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(blk(nx*S0,ny*S0))continue;seen[ny*cw+nx]=1;qu.push([nx,ny])}}
          const reach=(x,y)=>{for(let dy=-12;dy<=12;dy+=6)for(let dx=-12;dx<=12;dx+=6){const cx=Math.round((x+dx)/S0),cy=Math.round((y+dy)/S0);if(seen[cy*cw+cx])return true}return false};
          const out={doors:{},pts:{}};Z.forEach(z=>{out.doors[z.n]=reach(z.x+z.w/2,z.y+5)});
          [[2096,1018],[2240,950],[1990,950],[2300,1100],[1900,1130],[2250,1020],[2100,900],[1860,860]].forEach(q=>out.pts[q.join(',')]=reach(q[0],q[1]));
          out.cells=n;return JSON.stringify(out)})()""")
        print(r);await b.close()
asyncio.run(main())
