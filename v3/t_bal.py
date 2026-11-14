import asyncio
from playwright.async_api import async_playwright
JS="""(pol)=>{const out={};let n=0;const savedBeyEnd=beyEnd;window.beyEnd=r=>{};
for(let k=0;k<60;k++){MG=null;const G=GAMES.bey({free:0,bm:1,pt:mkTop(['b1','r1','bF']),et:enemyTop()});MG=G;G.t=0;G.done=0;BM.pts=[0,0];BM.tgt=4;
 let res=null;window.beyEnd=r=>{res=r;G.done=1};
 for(let i=0;i<4000&&!res;i++){G.t+=1/60;const P=window.__bd.P,E=window.__bd.E;
  keys.left=keys.right=keys.up=keys.down=0;
  if(pol=='chase'){const dx=E.x-P.x,dy=E.y-P.y;if(dx>6)keys.right=1;if(dx<-6)keys.left=1;if(dy>6)keys.down=1;if(dy<-6)keys.up=1;if(i%70==0)G.press()}
  G.up(1/60)}
 const key=res?(res.w?res.w+':'+res.how:'draw'):'none';out[key]=(out[key]||0)+1}
window.beyEnd=savedBeyEnd;return out}"""
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page()
        pg.on('pageerror',lambda e:print('ERR',e))
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1200)
        for pol in ['idle','chase']:
            print(pol,await pg.evaluate("("+JS+")('"+pol+"')"))
        await b.close()
asyncio.run(main())
