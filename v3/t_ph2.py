import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
        await pg.goto('http://localhost:8777/prev.html');await pg.wait_for_timeout(4500);ev=pg.evaluate
        async def clickall(n=12):
            for i in range(n):
                await pg.wait_for_timeout(1300)
                r=await ev("(()=>{const ov=[...document.body.children].find(e=>e.style&&e.style.zIndex=='99998');if(ov){const im=ov.querySelector('img');const s=im?im.src.split('/').pop()+':'+im.naturalWidth:'';ov.dispatchEvent(new PointerEvent('pointerdown'));return 'photo '+s}if(!dlg.hidden&&dlgFns[0]){const t=dbox.innerText.slice(0,14);dlgFns[0]();return 'dlg '+t}return ''})()")
                if r:print(' ',r)
        await ev("closeDlg();st.money=99999;FRS('yijia').met=1;FRS('yijia').pt=120;st.partner='劉家宜';0")
        print("--wed");await ev("yjWedding();0");await clickall(12)
        print('--laptop');await ev("laptopGift();0");await clickall(5)
        print(await ev("JSON.stringify(st.album.map(q=>q.img))"))
        await ev("closeDlg();albumMenu();dlgFns[0]();0");await pg.wait_for_timeout(1500);await pg.screenshot(path='/tmp/ph1.png')
        print(errs[:5]);await b.close()
asyncio.run(main())
