import re,sys
s=open('/home/claude/v3/out.html',encoding='utf8').read()
s=re.sub(r'<script src="https://cdn.tailwindcss.com[^>]*></script>','',s)
s=s.replace('</style>','canvas{width:100%;height:auto}#wrap{max-width:960px;position:relative}#hud,#tm,#qp,#toast{position:absolute;color:#fff;font-size:11px}#hud{left:4px;top:4px;width:150px}#tm{right:4px;top:4px}#qp{right:4px;top:44px;width:150px}#toast{left:50%;bottom:4px;transform:translateX(-50%)}</style>')
open('/tmp/prev.html','w',encoding='utf8').write(s)
open('/tmp/prev_title.html','w',encoding='utf8').write(s)
t=s.replace('<head>','<head><script>window.NOTITLE=1</script>',1)
open('/tmp/prev.html','w',encoding='utf8').write(t)
