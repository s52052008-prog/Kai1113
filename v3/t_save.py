import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);ctx=await b.new_context(viewport={'width':960,'height':600});pg=await ctx.new_page()
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        E=pg.evaluate
        print('boot dlg (none expected):',await E("dlg.hidden"),await E("SVARM"))
        await E("st.money=3000;adopt('rabbit');st.comp=st.pets[0].id;syncPet();st.cp=7;st.ct=3;Q[0].s=1;PL[0].st=2;PL[0].t=5;T.day=12;T.hour=14;enterB(Z.find(z=>z.n=='家'))")
        await E("DMstart();DMbuy('hearth');DM.cx=300;DM.cy=250;DMstep(0.1);act();DMoff()")
        await E("st.fr.yijia=st.fr.yijia||{pt:20,met:1,td:3,gd:3,ad:{}};st.aff=st.aff||{};st.aff['保羅']=22")
        print('size',await E("JSON.stringify(svSnap()).length"))
        ok=await E("svSave('s1')");print('save ok',ok,await E("scene"))
        before=await E("JSON.stringify(svSnap().st)")
        # mutate
        await E("st.money=1;Q[0].s=0;PL[0].st=0;T.day=3;delete st.lay['家'];exitB&&0;st.fi=[];st.aff['保羅']=0;st.junk=1")
        await E("svLoad(svRead('s1'))")
        after=await E("JSON.stringify(svSnap().st)")
        import json
        a=json.loads(before);c=json.loads(after);print(a.get('inv'),c.get('inv'));print('diff',[k for k in set(a)|set(c) if a.get(k)!=c.get(k)]);print('state equal',before==after, 'junk gone',await E("st.junk===undefined"),'day',await E("T.day"),'Q0',await E("Q[0].s"),'PL',await E("PL[0].st"),'scene',await E("scene"))
        print('hearth in rm.fur',await E("IN['家'].fur.filter(f=>f[0]=='hearth').length"),await E("IN['家'].built"))
        # reload page: boot dialog
        await pg.reload();await pg.wait_for_timeout(2500)
        print('boot dlg shown',not await E("dlg.hidden"),await E("curDlg[0]"))
        await E("dlgFns[0]()");await pg.wait_for_timeout(300)
        print('after continue day',await E("T.day"),'money',await E("st.money"),'hearth rooms',await E("st.lay&&st.lay['家']&&st.lay['家'].items.filter(i=>i.k=='hearth').length"))
        await E("enterB(Z.find(z=>z.n=='家'))");await pg.wait_for_timeout(300)
        print('enter home fur hearth',await E("rm.fur.filter(f=>f[0]=='hearth').length"),'sol ok',await E("rm.sol.length"))
        await pg.screenshot(path='/tmp/sv_home.png')
        # menu entry
        await E("exitB();openMenu()");print('menu opts',await E("curDlg[2].map(o=>o[0]).join('|')"))
        await E("svMenu()");print(await E("curDlg[2].map(o=>o[0]).join('|')"))
        # export import
        await E("svExport()");code=await E("document.getElementById('svTa').value");print('code len',len(code))
        await E("st.money=5;svImport()");await E(f"document.getElementById('svTa').value='{code}'");await E("dlgFns[0]()");print('import money',await E("st.money"))
        await E("document.getElementById('svTa')&&0");
        await E("svImport()");await E("document.getElementById('svTa').value='garbage'");await E("dlgFns[0]()");print('bad toast',await E("toastEl.textContent"))
        # autosave arm
        await E("SVARM=true;SVDIRTY=1;svAuto()");print('auto saved',await E("!!svRead('auto')"))
        print(errs[:6]);await b.close()
asyncio.run(main())
