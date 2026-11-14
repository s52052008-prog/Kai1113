import subprocess
subprocess.run(['/tmp/tw/tw','-i','/tmp/tw/in.css','-o','tw_off.css','--content','out.html','--minify'],capture_output=True)
t=open('out.html',encoding='utf-8').read()
tag='<script src="https://cdn.tailwindcss.com/3.4.17"></script>'
assert tag in t
css=open('tw_off.css',encoding='utf-8').read()
t=t.replace(tag,'<style>'+css+'</style>',1)
t=t.replace('<title>Allen 的像素小鎮 v3</title>','<title>Allen 的像素小鎮</title>',1)
open('offline.html','w',encoding='utf-8').write(t)
print(len(t))
