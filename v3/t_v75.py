import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        # walk into sports center
        r=await pg.evaluate("""(()=>{const z=Z.find(z=>z.n=='高雄運動中心');enterB(z);const a=scene+' '+rm.ppl.length;
          T.year=1;T.day=6;T.hour=15;wkState().n=2;FRS('yuhao').met=1;st.bk={met:1};exitB();enterB(z);const bb=(IN['高雄運動中心']._bb||[]).map(n=>n.n).join(',');
          scElev();const t=dbox.innerText.slice(0,60);dlgFns[2]();const s2=scene;inAct&&0;
          mtnBack();const s3=scene+' '+p.x+','+p.y;
          return [a,bb,t,s2,s3]})()""")
        print(r)
        await pg.wait_for_timeout(500);await pg.screenshot(path='/tmp/sc1.png')
        r=await pg.evaluate("""(()=>{mtnShow('運動中心3F瑜伽教室',340,204,0);return scene+' '+rm.ppl.map(n=>n.n).join(',')})()""")
        print(r);await pg.wait_for_timeout(400);await pg.screenshot(path='/tmp/sc3.png')
        r=await pg.evaluate("""(()=>{exitB();exitB();const z=Z.find(z=>z.n=='廟');st.yj={bapt:1};enterB(z);return scene})()""")
        await pg.wait_for_timeout(400);print(r,await pg.evaluate("dbox.innerText.slice(0,40)"))
        r=await pg.evaluate("""(()=>{closeDlg();templeMenu();const t=dbox.innerText.slice(0,200);let n=0;for(let i=0;i<30&&n<1;i++){jiaoStep(2);if(curDlg[0].includes('籤・'))n=1;else closeDlg()}return [t,curDlg[0],st.curse]})()""")
        print(r);await pg.screenshot(path='/tmp/tp.png')
        r=await pg.evaluate("""(()=>{closeDlg();exitB();const s=SPOTS.find(s=>s.n.includes('50燃'));s.fn();const a=dbox.innerText.slice(0,80);closeDlg();const bn=SPOTS.filter(s=>s.n.includes('垃圾桶')).length;SPOTS.find(s=>s.n.includes('垃圾桶')).fn();return [a,bn,dbox.innerText.slice(0,80),WW,S.width]})()""")
        print(r)
        print(errs[:8]);await b.close()
asyncio.run(main())
