import asyncio,json,sys
from playwright.async_api import async_playwright
JS="""(args)=>{const [room,hour,day]=args;const MAXD=18;T.day=day;T.hour=hour;const z=Z.find(z=>z.n==room);if(!z)return null;
 try{enterB(z)}catch(e){return {err:String(e)}}
 const S0=4,cw=Math.ceil(rm.W/S0),ch=Math.ceil(rm.H/S0),seen=new Uint8Array(cw*ch);const q0={x:p.x,y:p.y};
 const blk=(x,y)=>{p.x=x;p.y=y;return iBlocked()};
 const sx=Math.round((rm.W/2-6)/S0),sy=Math.round((rm.H-22)/S0);const qu=[[sx,sy]];seen[sy*cw+sx]=1;let free=0,tot=0;
 while(qu.length){const [cx,cy]=qu.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(blk(nx*S0,ny*S0))continue;seen[ny*cw+nx]=1;qu.push([nx,ny])}}
 // 全部可站立格（含不可達）
 const all=new Uint8Array(cw*ch);for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){if(!blk(x*S0,y*S0))all[y*cw+x]=1}
 let reach=0,stand=0;for(let i=0;i<cw*ch;i++){if(all[i])stand++;if(seen[i])reach++}
 const bad=[];rm.ppl.forEach(n=>{if(n.t&&!n.fr)return;let md=999;for(let y=0;y<ch;y++)for(let x=0;x<cw;x++){if(!seen[y*cw+x])continue;const px=x*S0,py=y*S0,dd=Math.hypot(px-n.x,py-n.y);if(dd>=md||dd>=27)continue;
  const near=rm.ppl.filter(o=>Math.hypot(o.x-px,o.y-py)<30).sort((a,b)=>Math.hypot(a.x-px,a.y-py)-Math.hypot(b.x-px,b.y-py))[0];if(near===n)md=dd}
  if(md>MAXD)bad.push([n.n,Math.round(n.x),Math.round(n.y),Math.round(md)])});
 const spots=[];(rm.sp||[]).forEach(s=>{let ok=false;for(let y=s[2]-10;y<=s[2]+s[4]+10&&!ok;y+=4)for(let x=s[1]-6;x<=s[1]+s[3]+6;x+=4){const cx=Math.round(x/S0),cy=Math.round(y/S0);if(cx>=0&&cy>=0&&cx<cw&&cy<ch&&seen[cy*cw+cx]){ok=true;break}}if(!ok)spots.push(s[0])});
 p.x=q0.x;p.y=q0.y;return {room,hour,day,W:rm.W,H:rm.H,stand,reach,pocket:stand-reach,bad,spots}}"""
async def main():
    rooms=sys.argv[1:]
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        names=rooms or await pg.evaluate("Z.filter(z=>IN[z.n]).map(z=>z.n)")
        for n in names:
            hrs=[8,10,12,14,16,18,20] if n in('城光復興堂','咖啡店','健身房') else [12]
            days=[1,4,6,7] if n in('城光復興堂','咖啡店') else [1]
            seen=set()
            for d in days:
                for h in hrs:
                    r=await pg.evaluate(JS,[n,h,d])
                    if not r:continue
                    if r.get('err'):print(n,'ERR',r['err']);continue
                    key=(tuple(map(tuple,r['bad'])),tuple(r['spots']))
                    if (r['bad'] or r['spots']) and key not in seen:
                        seen.add(key);print('!!',n,'h',h,'day',d,'bad',r['bad'],'spots',r['spots'])
            r=await pg.evaluate(JS,[n,12,1])
            if r and not r.get('err'):print(n,r['W'],r['H'],'stand',r['stand'],'unreach',r['pocket'])
        print(errs[:5]);await b.close()
asyncio.run(main())
