import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        await pg.evaluate("st.money=5000;enterB(Z.find(z=>z.n=='家'))");await pg.wait_for_timeout(400)
        print(await pg.evaluate("[OPN.style.display,OPN.textContent]"))
        await pg.evaluate("DMstart()");await pg.wait_for_timeout(300)
        print('on',await pg.evaluate("[DM.on,DM.base,DM.lay.items.length,st.lay['家'].items.filter(i=>i.pin).map(i=>i.pin+':'+i.id)]"))
        # time pick/apply
        t=await pg.evaluate("(()=>{const t=performance.now();edApply();return performance.now()-t})()");print('apply ms',round(t))
        # art sheet: put every catalog item on a rendering of a fake room
        await pg.evaluate("""(()=>{const ids=Object.keys(CAT);let x=12,y=36,rowH=0;const L=DM.lay;L.items=[];
          ids.forEach(id=>{const C=CAT[id];if(C.g=='w')return;if(x+C.w>548){x=12;y+=rowH+8;rowH=0}const it=edNew(id);it.x=x;it.y=y;L.items.push(it);x+=C.w+8;rowH=Math.max(rowH,C.h)});
          let wx=12;ids.forEach(id=>{const C=CAT[id];if(C.g!='w')return;const it=edNew(id);it.x=wx;it.y=C.wy;wx+=C.w+4;if(wx>200&&wx<260)wx=260;L.items.push(it)});
          // frame variants
          [1,2,3].forEach((v,i)=>{const it=edNew('frame');it.a[1]=v;it.x=400+i*30;it.y=5;L.items.push(it)});
          edApply()})()""")
        await pg.evaluate("DM.cx=280;DM.cy=100")
        await pg.wait_for_timeout(400)
        await pg.screenshot(path='/tmp/deco_sheet1.png')
        await pg.evaluate("DM.cx=280;DM.cy=300");await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/deco_sheet2.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
