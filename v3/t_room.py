import asyncio,sys,base64
from playwright.async_api import async_playwright
# usage: t_room.py hour day room...   -> /tmp/room_<name>.png (家具碰撞框＝紅、NPC＝藍點)
import os
PAD=int(os.environ.get('PAD','4'))
JS="""(a)=>{const PAD=%d;const [room,h,d]=a;""" % 0 if False else """(a)=>{const PAD=%PAD%;const [room,h,d]=a;T.day=d;T.hour=h;enterB(Z.find(z=>z.n==room));const S=2,c=document.createElement('canvas');c.width=rm.W*S;c.height=rm.H*S;const x=c.getContext('2d');x.imageSmoothingEnabled=false;x.drawImage(rm.cv,0,0,rm.cv.width,rm.cv.height,0,0,c.width,c.height);
 x.fillStyle='rgba(255,0,0,.28)';x.strokeStyle='rgba(255,60,60,.9)';rm.sol.forEach(o=>{x.fillRect(o.x*S,o.y*S,o.w*S,o.h*S);x.strokeRect(o.x*S,o.y*S,o.w*S,o.h*S)});
 x.fillStyle='#1e6bff';x.font='bold 11px sans-serif';rm.ppl.forEach(n=>{x.beginPath();x.arc((n.x+6)*S,(n.y+4)*S,5,0,7);x.fill();x.fillStyle='#fff';x.fillText(String(n.n).slice(0,5),(n.x+10)*S,(n.y+4)*S);x.fillStyle='#1e6bff'});
 (rm.sp||[]).forEach(s=>{x.strokeStyle='#ffd400';x.lineWidth=2;x.strokeRect(s[1]*S,s[2]*S,s[3]*S,s[4]*S);x.fillStyle='#ffd400';x.fillText(s[0],s[1]*S+2,s[2]*S+12)});
 const S0=4,cw=Math.ceil(rm.W/S0),ch=Math.ceil(rm.H/S0),q0={x:p.x,y:p.y,w:p.w,h:p.h};const run=(pd)=>{const seen=new Uint8Array(cw*ch);const blk=(xx,yy)=>{p.x=xx-pd;p.y=yy-pd;p.w=q0.w+2*pd;p.h=q0.h+2*pd;return iBlocked()};const sx=Math.round((rm.W/2-6)/S0),sy=Math.round((rm.H-22)/S0);const qu=[[sx,sy]];seen[sy*cw+sx]=1;while(qu.length){const [cx,cy]=qu.pop();for(const [dx,dy] of [[1,0],[-1,0],[0,1],[0,-1]]){const nx=cx+dx,ny=cy+dy;if(nx<0||ny<0||nx>=cw||ny>=ch||seen[ny*cw+nx])continue;if(blk(nx*S0,ny*S0))continue;seen[ny*cw+nx]=1;qu.push([nx,ny])}}return seen};
 const A=run(0),B=run(PAD);Object.assign(p,q0);x.fillStyle='rgba(255,0,255,.45)';for(let yy=0;yy<ch;yy++)for(let xx=0;xx<cw;xx++)if(A[yy*cw+xx]&&!B[yy*cw+xx])x.fillRect(xx*S0*S,yy*S0*S,S0*S,S0*S);
 return c.toDataURL()}"""
async def main():
    h=float(sys.argv[1]);d=int(sys.argv[2]);rooms=sys.argv[3:]
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':620})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(900)
        for n in rooms:
            u=await pg.evaluate(JS.replace('%PAD%',str(PAD)),[n,h,d]);open(f'/tmp/room_{n}.png','wb').write(base64.b64decode(u.split(',')[1]))
        await b.close()
asyncio.run(main())
