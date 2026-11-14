import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        await pg.evaluate("T.hour=12;for(let i=0;i<200&&(!INC||INC.k!='fire');i++){INC=null;newInc()};")
        print(await pg.evaluate("[INC.k,INC.b.n,INC.crowd.length,INC.tx,INC.ty]"))
        await pg.evaluate("p.x=INC.tx;p.y=INC.ty+90;p.dir=1;")
        await pg.wait_for_timeout(600);await pg.screenshot(path='/tmp/fire_a.png')
        # try to walk into the building
        await pg.keyboard.down('ArrowUp');await pg.wait_for_timeout(1800);await pg.keyboard.up('ArrowUp')
        print('player y',await pg.evaluate("[p.y,INC.b.bot,fireBlk()]"))
        # dispatch & track vehicles
        r=await pg.evaluate("""(()=>{reportInc(1);let maxJ=0,last=null,steps=0,states=[];
          for(let i=0;i<4000;i++){safetyTick(.05);const ps=RESP.map(v=>[v.cx,v.cy]);
            if(last&&ps.length==last.length)ps.forEach((q,k)=>{const d=Math.hypot(q[0]-last[k][0],q[1]-last[k][1]);if(d>maxJ)maxJ=d});last=ps;
            if(INC&&INC.st=='hand'&&!INC.x1){INC.x1=1;states.push('hand@'+i)}
            if(!INC&&!RESP.length){states.push('done@'+i);break}}
          return [maxJ,states,RESP.length,JSON.stringify(st.burn)]})()""")
        print(r)
        await pg.evaluate("p.x=INC?INC.tx:p.x");
        await pg.screenshot(path='/tmp/fire_b.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
