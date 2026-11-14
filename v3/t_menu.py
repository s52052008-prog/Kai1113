import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        errs=[];pg.on('pageerror',lambda e:errs.append(str(e)));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else 0)
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(800)
        for js in ["st.money=5000;petShop()","adopt('frenchie');adopt('parrot');petMenu()","petDetail(st.pets[0].id)","openEquip()","clothesShop()[0][2]()","['jordan','gakuran','gak_pants','phones'].forEach(k=>addItem(k,1));toggleEquip('jordan');toggleEquip('gakuran');openBag()","itemMenu('jordan')","openMenu()","safetyMenu()","churchMenu('sun')","churchMenu('wed')","churchMenu('sat')","churchMenu('sat2')","churchMenu('idle')","st.tix=900;st.coin=10;prizeShop()","arcadeMenu()","coinShop()","mainMenu('消防局')","mainMenu('寵物店')","mainMenu('服飾店')","mainMenu('遊藝場')","mainMenu('城光復興堂')","mainMenu('派出所')"]:
            await pg.evaluate("closeDlg()")
            try:
                await pg.evaluate(js)
            except Exception as e: errs.append(js+' -> '+str(e)[:120])
        print(await pg.evaluate("JSON.stringify([spdMul(),ALLEN.ou,ALLEN.sh,st.look,st.comp,st.pet])"))
        print(errs[:10]);await b.close()
asyncio.run(main())
