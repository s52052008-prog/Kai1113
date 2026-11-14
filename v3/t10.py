import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as pw:
        b=await pw.chromium.launch(args=['--no-sandbox'])
        pg=await b.new_page(viewport={'width':960,'height':640})
        errs=[]
        pg.on('console',lambda m:errs.append(m.type+': '+m.text) if m.type in('error',) else None)
        pg.on('pageerror',lambda e:errs.append('PAGEERR '+str(e)))
        await pg.goto('file:///tmp/prev.html')
        await pg.wait_for_timeout(800)
        r=await pg.evaluate("""(()=>{const bad=[];st.money=5000;st.sta=100;st.hp=100;st.cap=90;
          const names=Object.keys(IN);
          const clickAll=(label,depth)=>{ // press every button of the current dialog once (fresh open each)
          };
          for(const n of names){
            try{
              scene=n;rm=IN[n];rm.sol=rm.sol||[];
              const opens=[()=>n=='家'?openHome():n=='便利商店'?openShop():mainMenu(n)];
              opens[0]();
              const cnt=dbox.querySelectorAll('button').length;
              for(let i=0;i<cnt;i++){
                opens[0]();const fn=dlgFns[i];
                try{fn&&fn()}catch(e){bad.push([n,i,String(e)])}
                // chase sub dialog buttons one level
                const c2=dbox.querySelectorAll('button').length;
                for(let j=0;j<c2&&!dlg.hidden;j++){try{opens[0]();dlgFns[i]&&dlgFns[i]();const f2=dlgFns[j];f2&&f2()}catch(e){bad.push([n,i,j,String(e)])}}
              }
              closeDlg();
            }catch(e){bad.push([n,'open',String(e)])}
          }
          scene=null;
          for(const k in E){E[k].forEach((ev,ei)=>ev.o.forEach((o,oi)=>{try{openEv({n:k});ev=E[k][ei];window.ev=ev;choose(oi)}catch(e){bad.push(['E',k,ei,oi,String(e)])}}))}
          for(let i=0;i<PA.length;i++){try{career(i);dlgFns.forEach(f=>{try{f&&f()}catch(e){bad.push(['career',i,String(e)])}})}catch(e){bad.push(['career',i,String(e)])}}
          try{farmMenu(PL[0]);openBag();openMenu();itemMenu('fish');merchant(NP.find(n=>n.shop),'x');farmerMenu(NP.find(n=>n.n=='農夫伯'),'x');talk(NP[0]);fightMenu();askWay();policeMenu(NP.find(n=>n.cop),'x');shopDlg('t',SHOP.禮品屋,[]);cityMap()}catch(e){bad.push(['misc',String(e)])}
          for(let i=0;i<8;i++){try{startFight(i%6,1);fMove(i%4)}catch(e){bad.push(['fight',String(e)])}}
          return bad})()""")
        print(json.dumps(r,ensure_ascii=False,indent=0)[:3000])
        print('\n'.join(errs[:10]))
        await b.close()
asyncio.run(main())
