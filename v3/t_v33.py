import asyncio,sys
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(1500)
        async def room(name,h,d,x=None,y=None,shot=None):
            await pg.evaluate(f"closeDlg();if(scene)exitB();T.hour={h};T.day={d};enterB(Z.find(z=>z.n=='{name}'));closeDlg()")
            if x is not None: await pg.evaluate(f"p.x={x};p.y={y}")
            await pg.wait_for_timeout(500)
            if shot: await pg.screenshot(path=f'/tmp/{shot}.png')
        # 週日(dow 6 => day 7)
        await pg.evaluate("T.day=7");print('dow',await pg.evaluate("dow()"))
        await room('城光復興堂',10,7,160,150,'ch_sun')
        print(await pg.evaluate("rm.ppl.map(n=>n.n).slice(0,8).join(',')"))
        await room('城光復興堂',12.5,6,420,110,'ch_guitar')  # day6 -> dow5 saturday
        print('dow',await pg.evaluate("dow()+','+CHM()"))
        await room('城光復興堂',10,3,450,200,'ch_office')
        print(await pg.evaluate("rm.ppl.map(n=>n.n).join(',')"))
        await room('城光復興堂',15,6,460,330,'ch_dine')
        await room('城光復興堂',10,3,300,400,'ch_lobby')
        # 友誼
        await pg.evaluate("frTalk(rm.ppl.find(n=>n.fr))");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/fr_intro.png')
        print(await pg.evaluate("curDlg[0]"))
        await pg.evaluate("dlgFns[0]()");await pg.evaluate("frTalk(rm.ppl.find(n=>n.fr))");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/fr_menu.png')
        await pg.evaluate("friendsMenu()");await pg.wait_for_timeout(200);await pg.screenshot(path='/tmp/fr_list.png')
        # 咖啡廳家宜
        await room('咖啡店',11,2,200,170,'cafe_yj')
        print(await pg.evaluate("rm.ppl.map(n=>n.n).join(',')"))
        # 健身房
        await room('健身房',10,2,200,200);await pg.evaluate("st.money=500;st.sta=100;gymCoach({})");await pg.wait_for_timeout(300);await pg.screenshot(path='/tmp/gym_menu.png')
        await pg.evaluate("dlgFns[0]()");await pg.wait_for_timeout(200);await pg.screenshot(path='/tmp/gym_res.png')
        print(await pg.evaluate("[st.pow,st.endu,st.runSk,st.money]"))
        # 電影院
        await room('電影院',15,2,200,290,'cin_lobby')
        await pg.evaluate("st.money=200;ticketMenu()");await pg.wait_for_timeout(200);await pg.screenshot(path='/tmp/cin_ticket.png')
        await pg.evaluate("closeDlg();st.tk=1;addItem('popcorn',1);playGame('film',{back:()=>{},hall:1,film:filmOf(1)})")
        for t in [3,14,26,38]:
            await pg.evaluate(f"MG.t={t}");await pg.wait_for_timeout(250);await pg.screenshot(path=f'/tmp/film_{t}.png')
        await pg.evaluate("MG.t=45");await pg.wait_for_timeout(2500)
        print(await pg.evaluate("[!!MG,st.cnt.movie,curDlg&&curDlg[0]]"))
        print(errs[:8]);await b.close()
asyncio.run(main())
