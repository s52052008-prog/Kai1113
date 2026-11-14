import asyncio,json
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        E=lambda s:pg.evaluate(s)
        await E("st.money=3000;enterB(Z.find(z=>z.n=='家'))");await pg.wait_for_timeout(300)
        await E("DMstart()");
        async def cur(x,y):
            await E(f"DM.cx={x};DM.cy={y}");await pg.wait_for_timeout(120)
        sp0=await E("JSON.stringify(rm.sp.find(s=>s[0]=='sofa'))");print('sofa spot before',sp0)
        await cur(92,215);print('sel',await E("DM.sel&&DM.sel.k"))
        await E("act()");print('hold',await E("DM.hold&&DM.hold.k"), 'spots',await E("rm.sp.length"))
        await cur(280,340);print('door block:',await E("JSON.stringify(DM.v)"))
        await cur(110,215);print('overlap:',await E("JSON.stringify(DM.v)"))
        await cur(290,262);print('free:',await E("JSON.stringify(DM.v)"));await E("act()")
        print('placed',await E("JSON.stringify(st.lay['家'].items.find(i=>i.k=='sofa'))"),'spot',await E("JSON.stringify(rm.sp.find(s=>s[0]=='sofa'))"))
        await pg.screenshot(path='/tmp/deco_a.png')
        # try blocking gap between bedroom and living room with armchair
        await E("DMbuy('armchair')");print('bought hold',await E("DM.hold&&DM.hold.cid"),await E("st.money"))
        for (x,y) in [(116,180),(116,160)]:
            await cur(x,y);print('gap',x,y,await E("JSON.stringify(DM.v)"));
            await E("act()");print(' after act hold?',await E("!!DM.hold"))
        # store
        await E("DMstore()");print('stored',await E("st.fi.length"))
        await E("DMcatalog()");print('dlg open',await E("!dlg.hidden"));await E("dlgFns[4]()");print('storage dlg title',await E("curDlg[0]"));await E("dlgFns[0]()");print('holding',await E("DM.hold&&DM.hold.cid"),'dlg hidden',await E("dlg.hidden"))
        await cur(60,150);print('arm v',await E('JSON.stringify(DM.v)'));await E("act()");print('placed armchair',await E("!!DM.hold"))
        # color + sell
        await cur(60,150);await E("DMcolor()");print('color',await E("DM.sel&&DM.sel.a"))
        # wall item
        await E("DMbuy('frame')");await cur(250,60);print('wall',await E("JSON.stringify(DM.gp)+JSON.stringify(DM.v)"));await cur(180,60);print('wall2',await E("JSON.stringify(DM.gp)+JSON.stringify(DM.v)"))
        await E("act()");print('frame placed',await E("!DM.hold"))
        await E("DMoff()");print('off',await E("DM.on"),'comfort',await E("edComfort('家')"),'bonus',await E("edBonus()"))
        # spots reachable and navigate: base
        print('unreach',await E("JSON.stringify(edReach(rm,rm.sol))"))
        await E("DMstart()");await cur(100,100);await E("DMoff()")
        # re-enter keeps layout
        await E("exitB()");await E("enterB(Z.find(z=>z.n=='家'))");await pg.wait_for_timeout(300)
        print('re-enter sofa',await E("JSON.stringify(st.lay['家'].items.find(i=>i.k=='sofa'))"),await E("rm.fur.filter(f=>f[0]=='armchair').length"))
        await pg.screenshot(path='/tmp/deco_b.png')
        # shop lock
        await E("exitB();enterB(Z.find(z=>z.n=='全家'))");await pg.wait_for_timeout(200);print('shop btn',await E("OPN.textContent+OPN.style.display"));await E("DMstart()");print('locked on?',await E("DM.on"),await E("toastEl.textContent"))
        await E("st.cp=7;st.ct=5;exitB();enterB(Z.find(z=>z.n=='全家'))");await pg.wait_for_timeout(1500);print('shop btn',await E("OPN.textContent"),await E("toastEl.textContent"))
        await E("DMstart()");print('on',await E("DM.on"),'mov',await E("st.lay['全家'].items.map(i=>i.k).join()"),'base',await E("JSON.stringify(DM.base)"))
        await E("DMbuy('plant')");await cur(100,170);print('shop place',await E("JSON.stringify(DM.v)"));await E("act()");
        await E("DMbuy('aqua')");await cur(300,100);print('aqua in aisle',await E("JSON.stringify(DM.v)"))
        await cur(330,80);print('aqua2',await E("JSON.stringify(DM.v)"))
        await E("cancel();cancel()");print('end',await E("DM.on"))
        await E("st.cp=7;st.ct=5")
        await pg.screenshot(path='/tmp/deco_c.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
