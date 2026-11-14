import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(2500)
        ev=pg.evaluate
        await ev("closeDlg();st.money=20000;crS().loans.push({id:9,nm:'分期・125CC',vn:'125CC',veh:'moto',P:75000,left:7000,pay:3000,n:0,N:26,r:.045,miss:0});wkReturn()")
        await pg.wait_for_timeout(9500);print(await ev("dbox.innerText+' | money='+st.money+' sc='+st.cr.sc"));await pg.screenshot(path='/tmp/l2.png')
        print(errs[:6]);await b.close()
asyncio.run(main())
