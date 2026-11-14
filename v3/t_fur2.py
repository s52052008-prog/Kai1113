import asyncio,json
from playwright.async_api import async_playwright
R=['家樂福','新興高中','書局','旅館','診所','城光復興堂']
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(args=['--no-sandbox']);pg=await b.new_page(viewport={'width':960,'height':600})
        await pg.goto('file:///tmp/prev.html');await pg.wait_for_timeout(3000)
        for i,n in enumerate(R):
            d=await pg.evaluate(f"(()=>{{closeDlg();if(scene)exitB();enterB(Z.find(z=>z.n=='{n}'));closeDlg();const r=IN['{n}'];return JSON.stringify({{W:r.W,H:r.H,sp:r.sp,fur:r.fur.map(f=>f.slice(0,5))}})}})()")
            print(n,d[:1500]);await pg.wait_for_timeout(800);await pg.screenshot(path=f'/tmp/m{i}.png')
        await b.close()
asyncio.run(main())
