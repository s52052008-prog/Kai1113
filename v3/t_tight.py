import asyncio,sys
from playwright.async_api import async_playwright
JS="""(args)=>{const [room,hour,day,pad]=args;T.day=day;T.hour=hour;enterB(Z.find(z=>z.n==room));
 const S0=4,cw=Math.ceil(rm.W/S0),ch=Math.ceil(rm.H/S0);const q0={x:p.x,y:p.y,w:p.w,h:p.h};
 const run=(pd)=>{const seen=new Uint8Array(cw*ch);const blk=(x,y)=>{p.x=x-pd;p.y=y-pd;p.w=q0.w+2*pd;p.h=q0.h+2*pd;const r=iBlocked();return r};
  const sx=Math.round((rm.W/2-6)/S0),sy=Math.round((rm.H-22)/S0);const qu=[[sx,sy]];seen[sy*cw+sx]=1;
  while(qu.length){const [cx,cy]=qu.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(blk(nx*S0,ny*S0))continue;seen[ny*cw+nx]=1;qu.push([nx,ny])}}return seen};
 const A=run(0),B=run(pad);let a=0,b=0;for(let i=0;i<cw*ch;i++){a+=A[i];b+=B[i]}
 // 受阻的區域：A 可達而 B 不可達，統計落點
 const lost=[];const rows=[];for(let y=0;y<ch;y+=2)for(let x=0;x<cw;x+=2){if(A[y*cw+x]&&!B[y*cw+x])lost.push([x*S0,y*S0])}
 const sp=[];(rm.sp||[]).forEach(s=>{let okB=false;for(let y=s[2]-10;y<=s[2]+s[4]+10&&!okB;y+=4)for(let x=s[1]-6;x<=s[1]+s[3]+6;x+=4){const cx=Math.round(x/S0),cy=Math.round(y/S0);if(cx>=0&&cy>=0&&cx<cw&&cy<ch&&B[cy*cw+cx]){okB=true;break}}if(!okB)sp.push(s[0])});
 Object.assign(p,q0);
 // 聚類：以 24px 網格統計 lost
 const g={};lost.forEach(([x,y])=>{const k=Math.floor(x/24)+','+Math.floor(y/24);g[k]=(g[k]||0)+1});
 return {room,a,b,lostN:lost.length,spots:sp,hot:Object.entries(g).sort((u,v)=>v[1]-u[1]).slice(0,6)}}"""
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        names=sys.argv[1:] or await pg.evaluate("Z.filter(z=>IN[z.n]).map(z=>z.n)")
        for n in names:
            for pad in (6,):
                r=await pg.evaluate(JS,[n,12,1,pad])
                print(r['room'],'lost',r['lostN'],'spots',r['spots'],'hot',[(k.replace(',','|'),v) for k,v in r['hot'][:3]])
        await b.close()
asyncio.run(main())
