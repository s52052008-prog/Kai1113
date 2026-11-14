import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        # pachinko
        await pg.evaluate("st.coin=20;playGame('pachi')")
        for i in range(3):
            await pg.keyboard.press('Space');await pg.wait_for_timeout(200)
        await pg.wait_for_timeout(2200);await pg.screenshot(path='/tmp/pa_mult.png')
        await pg.keyboard.press('Space');await pg.wait_for_timeout(1800)
        print('ph',await pg.evaluate("[MG.ph,MG.bet,MG.mult,st.coin]"))
        for i in range(40):
            await pg.keyboard.press('Space');await pg.wait_for_timeout(450)
            if i==8:await pg.screenshot(path='/tmp/pa_play.png')
        await pg.wait_for_timeout(4000)
        print('after',await pg.evaluate("[!!MG,st.tix,st.pdt,st.pmiss,document.querySelector('#dlg')?.innerText.slice(0,200)]"))
        # bey hub
        await pg.evaluate("MG=null;closeDlg();st.coin=20;st.money=1000;beyHub()")
        await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/bey_hub.png')
        await pg.evaluate("['b2','b3','b4'].forEach(i=>st.parts[i]=1);st.parts.r2=1;st.parts.r3=1;st.parts.bN=1;st.parts.bB=1;st.deck=[['b1','r1','bF'],['b2','r2','bN'],['b3','r3','bB']];beyHub()")
        await pg.screenshot(path='/tmp/bey_hub2.png')
        await pg.evaluate("closeDlg();beyStart('off')");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/bey_pick.png')
        await pg.evaluate("beyRound(1)");await pg.wait_for_timeout(500)
        await pg.screenshot(path='/tmp/bey_r1.png')
        res=[]
        for rd in range(4):
            await pg.keyboard.down('ArrowRight')
            for i in range(60):
                if not await pg.evaluate("!!MG"):break
                await pg.keyboard.press('Space');await pg.wait_for_timeout(500)
            await pg.keyboard.up('ArrowRight')
            await pg.wait_for_timeout(1500)
            t=await pg.evaluate("[BM.pts.join(':'),BM.rd,(document.querySelector('#dlg')||{}).innerText?.slice(0,90)]")
            res.append(t);print(t)
            if await pg.evaluate("curDlg&&/下一局|選擇出戰/.test(JSON.stringify(curDlg))"):
                nxt=await pg.evaluate("(()=>{const i=BM.pu.findIndex(x=>!x);return i})()")
                if nxt<0:break
                await pg.evaluate("beyPick()") ;await pg.evaluate(f"beyRound({nxt})");await pg.wait_for_timeout(400)
            else:break
        await pg.screenshot(path='/tmp/bey_end.png')
        print(errs[:8]);await b.close()
asyncio.run(main())
