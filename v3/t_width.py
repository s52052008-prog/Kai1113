import asyncio,sys
from playwright.async_api import async_playwright
JS="""(args)=>{const [room,hour,day]=args;T.day=day;T.hour=hour;enterB(Z.find(z=>z.n==room));
 const S0=4,cw=Math.ceil(rm.W/S0),ch=Math.ceil(rm.H/S0);const q0={x:p.x,y:p.y,w:p.w,h:p.h};
 const run=(pd)=>{const seen=new Uint8Array(cw*ch);const blk=(x,y)=>{p.x=x-pd;p.y=y-pd;p.w=q0.w+2*pd;p.h=q0.h+2*pd;return iBlocked()};
  const sx=Math.round((rm.W/2-6)/S0),sy=Math.round((rm.H-22)/S0);if(blk(sx*S0,sy*S0)&&pd>0)return seen;const qu=[[sx,sy]];seen[sy*cw+sx]=1;
  while(qu.length){const [cx,cy]=qu.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(blk(nx*S0,ny*S0))continue;seen[ny*cw+nx]=1;qu.push([nx,ny])}}return seen};
 const maps=[];for(let pd=0;pd<=10;pd+=2)maps.push(run(pd));
 const out=[];
 const reach=(pred)=>{let best=-1;for(let k=0;k<maps.length;k++){let ok=false;const B=maps[k];for(let y=0;y<ch&&!ok;y++)for(let x=0;x<cw;x++){if(B[y*cw+x]&&pred(x*S0,y*S0)){ok=true;break}}if(ok)best=k*2;else break}return best};
 (rm.sp||[]).forEach(s=>{out.push(['spot:'+s[0],reach((x,y)=>x>=s[1]-6&&x<=s[1]+s[3]+6&&y>=s[2]-10&&y<=s[2]+s[4]+10)])});
 rm.ppl.forEach(n=>{if(n.t&&!n.fr)return;out.push(['npc:'+n.n,reach((x,y)=>Math.hypot(x-n.x,y-n.y)<34)])});
 Object.assign(p,q0);return out.filter(o=>o[1]<8)}"""
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        names=sys.argv[1:] or await pg.evaluate("Z.filter(z=>IN[z.n]).map(z=>z.n)")
        for n in names:
            hrs=[10,14,16] if n in('城光復興堂','咖啡店') else ([7.5] if n=='全家' else [17.5] if n=='餐廳' else [19] if n=='劉家宜的家' else [12])
            days=[6,7,1] if n in('城光復興堂','咖啡店') else [1]
            acc={}
            for d in days:
                for h in hrs:
                    for k,v in await pg.evaluate(JS,[n,h,d]): acc[k]=min(acc.get(k,99),v)
            if acc:print(n,acc)
        await b.close()
asyncio.run(main())
