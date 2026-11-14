import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(2500)
        js="""(()=>{const out=[];const W=wkState();const s=FRS('yijia');s.met=1;['yilun','rita','huijing','fangci','yuhao','zhuyang'].forEach(k=>{FRS(k).met=1;FRS(k).pt=85});
        const opt=(re)=>{const i=curDlg[2].findIndex(o=>re.test(o[0]));if(i<0)throw new Error('no opt '+re+' in '+curDlg[0]+': '+curDlg[2].map(o=>o[0]).join('|'));if(curDlg[2][i][3])throw new Error('disabled '+curDlg[2][i][0]+' '+curDlg[2][i][1]);curDlg[2][i][2]()};
        const sd=(d,h)=>{T.year=1;T.day=d+1;T.hour=h};const talk=()=>{closeDlg();frTalk({fr:'yijia',n:'劉家宜'})};
        for(let i=0;i<10;i++)frAdd('yijia',5);out.push('budget '+s.pt);
        for(let w=0;w<8;w++){W.n++;frAdd('yijia',11)}out.push('cap1 '+s.pt);
        sd(5,10);st.sta=100;talk();opt(/社福中心/);opt(/捲起/);out.push('t1 '+s.pt+' '+st.yj.t1+' lunch'+st.inv.lunch);
        W.n++;frAdd('yijia',11);W.n++;frAdd('yijia',11);out.push('cap2 '+s.pt);
        sd(6,10);talk();opt(/教會活動/);opt(/一起去/);out.push('t2 '+s.pt);
        for(let w=0;w<3;w++){W.n++;frAdd('yijia',11)}out.push('cap3 '+s.pt);
        st.inv.bouquet=1;sd(5,16);talk();opt(/花園/);opt(/告白/);opt(/💞/);out.push('conf '+st.partner+' '+s.pt+' '+frLab('yijia',s.pt));
        for(let w=0;w<4;w++){W.n++;sd(6,10);talk();opt(/一起去教會/);closeDlg();frTalk({fr:'yilun',n:'黃以倫'});opt(/真道/);closeDlg();phoneCall('yijia');closeDlg();sd(5,12);phoneCall('yijia');closeDlg();for(let k=0;k<3;k++)frAdd('yijia',4)}
        out.push('pre-bapt '+s.pt+' '+JSON.stringify(st.yj));
        closeDlg();frTalk({fr:'yilun',n:'黃以倫'});opt(/受洗/);for(let k=0;k<6;k++)dlgFns[0]();out.push('bapt '+s.pt);
        for(let w=0;w<3;w++){W.n++;frAdd('yijia',11);closeDlg();frTalk({fr:'yilun',n:'黃以倫'});opt(/婚姻輔導/)}
        st.money=60000;sd(5,9);talk();opt(/西子灣/);
        
        W.n++;frAdd('yijia',11);sd(5,10);talk();opt(/求婚/);opt(/開始唱/);for(let k=0;k<6;k++)dlgFns[0]();opt(/💞/);out.push('prop '+s.pt+' '+frLab('yijia',s.pt));
        W.n++;closeDlg();frTalk({fr:'yilun',n:'黃以倫'});opt(/證婚/);for(let k=0;k<6;k++)dlgFns[0]();out.push('wed '+s.pt+' money'+st.money);
        for(let w=0;w<3;w++){W.n++;frAdd('yijia',11)}out.push('final '+s.pt+' home '+st.yj.home);
        closeDlg();return out.join('\\n')})()"""
        print(await pg.evaluate(js))
        await pg.wait_for_timeout(1500);print(await pg.evaluate("[st.yj.home, dlg.hidden, curDlg[0]]"))
        # boxing
        r=await pg.evaluate("""(()=>{closeDlg();st.money=5000;st.sta=100;fightMenu();const t=dbox.innerText.slice(0,200);dlgFns[0]();dlgFns[0]();const b=st.box;
          const W=wkState();for(let i=0;i<3;i++){st.sta=100;fightMenu();dlgFns[0]()}st.inv.mealprep=1;useItem('mealprep');st.inv.popcorn=1;useItem('popcorn');
          W.n++;for(let i=0;i<3;i++){st.sta=100;fightMenu();dlgFns[0]()}st.inv.mealprep=1;useItem('mealprep');
          frTalk({fr:'rita',n:'RITA'});const lock=dbox.innerText.includes('備賽中');closeDlg();
          W.n++;T.year=1;T.day=6;T.hour=19;fightMenu();const t2=dbox.innerText.slice(0,160);return [t,b.match,boxCond(),Math.round(boxP()*100),lock,t2]})()""")
        print(r)
        r=await pg.evaluate("""(()=>{closeDlg();T.year=1;T.day=6;T.hour=19;fightMenu();const i=curDlg[2].findIndex(o=>/上場/.test(o[0]));curDlg[2][i][2]();for(let k=0;k<3;k++)dlgFns[0]();return [curDlg[0],st.money,st.box.done]})()""")
        print(r)
        r=await pg.evaluate("""(()=>{closeDlg();policeMenu({n:'員警'},'你好');return dbox.innerText.slice(0,200)})()""")
        print(r)
        r=await pg.evaluate("""(()=>{closeDlg();const W=wkState();W.n+=5;FRS('rita').lastW=0;lifeEvents();return dbox.innerText.slice(0,150)})()""")
        print(r)
        await pg.evaluate("closeDlg();friendInfo('yijia')");await pg.screenshot(path='/tmp/v62.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
