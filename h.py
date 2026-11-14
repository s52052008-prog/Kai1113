import subprocess,sys,time,json
from playwright.sync_api import sync_playwright
def build():
    r=subprocess.run(['python3','build.py'],cwd='/home/claude/v3',capture_output=True,text=True);print('build',r.stdout.strip()[-40:],r.stderr[-400:])
    subprocess.run('cp /home/claude/v3/out.html /tmp/prev.html',shell=True)
def run(steps,vw=(1000,700),start=True,dpr=1,xo=False,init=None):
    if xo:
        t=open('/tmp/prev.html').read().replace("'pk/d'","'http://127.0.0.1:8778/pk/d'");open('/tmp/prevx.html','w').write(t)
    srv2=subprocess.Popen(['python3','-m','http.server','8778'],cwd='/tmp',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
    srv=subprocess.Popen(['python3','-m','http.server','8777'],cwd='/tmp',stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL);time.sleep(.6)
    out=[]
    try:
      with sync_playwright() as pw:
        b=pw.chromium.launch();pg=b.new_page(viewport={'width':vw[0],'height':vw[1]},device_scale_factor=dpr)
        css=open('/tmp/tw/tw.css').read();import json as J
        if init:pg.add_init_script(init)
        pg.route('**/cdn.tailwindcss.com/**',lambda r:r.fulfill(status=200,content_type='application/javascript',body='(function(){var s=document.createElement("style");s.textContent='+J.dumps(css)+';document.head.appendChild(s)})();'))
        errs=[];pg.on('pageerror',lambda e:errs.append('PE '+str(e)+' @@'+str(getattr(e,'stack',''))[:500]));pg.on('console',lambda m:errs.append(m.text) if m.type=='error' else None)
        pg.goto('http://localhost:8777/'+('prevx.html' if xo else 'prev.html'));pg.wait_for_timeout(6000)
        if start:
          pg.keyboard.press('Enter');pg.wait_for_timeout(2500)
          pg.evaluate("(()=>{const b=[...dbox.querySelectorAll('button')].find(b=>b.textContent.includes('新遊戲'));if(b)b.click()})()");pg.wait_for_timeout(2500)
          for i in range(6):
            pg.keyboard.press('Escape');pg.wait_for_timeout(700)
            pg.evaluate("(()=>{try{if(!dlg.hidden)closeDlg()}catch(e){}})()")
          pg.wait_for_timeout(800)
        for s in steps:
          k=s[0]
          if k=='js':
            try:r=pg.evaluate(s[1]);out.append(r);print('>',str(r)[:600])
            except Exception as e:print('JSERR',str(e)[:400])
          elif k=='wait':pg.wait_for_timeout(s[1])
          elif k=='shot':pg.screenshot(path='/tmp/'+s[1]+'.png')
          elif k=='key':pg.keyboard.press(s[1])
          elif k=='key_down':pg.keyboard.down(s[1])
          elif k=='key_up':pg.keyboard.up(s[1])
          elif k=='click':pg.mouse.click(s[1],s[2])
        print('ERRS',errs[:8]);b.close()
    finally:srv.kill();srv2.kill()
    return out
SKIP=[('js',"(()=>{const bs=[...dbox.querySelectorAll('button')];if(bs.length>5){bs[0].click();setTimeout(()=>{const d=[...dbox.querySelectorAll('button')].find(b=>b.textContent.includes('決定'));d&&d.click()},200)}})()"),('wait',800),('js',"(()=>{for(let i=0;i<4;i++)if(!dlg.hidden)closeDlg()})()"),('wait',500)]
