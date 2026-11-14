import numpy as np,sys,json,re
from PIL import Image,ImageOps
import pytesseract
from seg import seg
OCR=0
def ocr(a,c):
    pad=3;y0,y1,x0,x1=max(0,c['y0']-pad),c['y1']+pad,max(0,c['x0']-pad),c['x1']+pad
    sub=a[y0:y1,x0:x1];rgb=sub[...,:3].astype(int);al=sub[...,3]
    wt=(rgb.min(-1)>190)&(al>150)
    if wt.sum()<20:wt=(rgb.max(-1)<110)&(al>150)
    im=Image.fromarray(np.where(wt,0,255).astype(np.uint8)).resize(((x1-x0)*4,(y1-y0)*4),Image.LANCZOS)
    im=ImageOps.expand(im,20,255)
    t=pytesseract.image_to_string(im,lang='chi_tra',config='--psm 7')
    return re.sub(r'\s+','',t)
def items(path,merge=0):
    a,lab,comps=seg(path,None)
    txt=[c for c in comps if c['txt']];obj=[c for c in comps if not c['txt']]
    L=[]
    for c in sorted(txt,key=lambda c:(c['y0'],c['x0'])):
        g=next((q for q in L if merge and abs((q['y0']+q['y1'])/2-(c['y0']+c['y1'])/2)<8 and -2<c['x0']-q['x1']<merge),None)
        if g:g['x1']=max(g['x1'],c['x1']);g['y0']=min(g['y0'],c['y0']);g['y1']=max(g['y1'],c['y1'])
        else:L.append(dict(c))
    for l in L:l['items']=[]
    for o in obj:
        cx=(o['x0']+o['x1'])/2;best=None;bd=1e9
        for l in L:
            dy=l['y0']-o['y1']
            if dy<-12 or dy>60:continue
            lc=(l['x0']+l['x1'])/2;d=abs(lc-cx)+dy*.5
            if d<bd:bd=d;best=l
        if best is not None and bd<160:best['items'].append(o)
        else:L.append(dict(x0=o['x0'],x1=o['x1'],y0=o['y1'],y1=o['y1'],items=[o],noname=1))
    out=[]
    for l in L:
        if not l['items']:continue
        x0=min(o['x0'] for o in l['items']);y0=min(o['y0'] for o in l['items']);x1=max(o['x1'] for o in l['items']);y1=max(o['y1'] for o in l['items'])
        sub=a[y0:y1,x0:x1].copy();keep=np.zeros(sub.shape[:2],bool)
        for o in l['items']:keep|=(lab[y0:y1,x0:x1]==o['id'])
        sub[~keep]=0;al=sub[...,3];sub[...,3]=np.where(al>=150,255,0);sub[al<150]=0
        name='' if l.get('noname') else (ocr(a,l) if OCR else '')
        out.append(dict(name=name,img=Image.fromarray(sub),y=y0,x=x0))
    for q,l in zip(out,[l for l in L if l['items']]):q['ly']=(l['y0']+l['y1'])/2;q['lx']=(l['x0']+l['x1'])/2;q['nn']=l.get('noname',0)
    out.sort(key=lambda q:q['ly']);rows=[];
    for q in out:
        if rows and abs(rows[-1][-1]['ly']-q['ly'])<35:rows[-1].append(q)
        else:rows.append([q])
    for r in rows:r.sort(key=lambda q:q['lx'])
    return rows
if __name__=='__main__':
    rows=items(sys.argv[1])
    for r in rows:print(len(r),' / '.join(('?' if q['nn'] else '')+q['name'] for q in r))

def contact(rows,out,cols=12,cw=120):
    from PIL import ImageDraw
    flat=[q for r in rows for q in r];H=((len(flat)+cols-1)//cols)*(cw+30)
    S=Image.new('RGB',(cols*cw,H),(60,60,70));d=ImageDraw.Draw(S)
    for i,q in enumerate(flat):
        im=q['img'].copy();im.thumbnail((cw-8,cw-8));x,y=i%cols*cw,i//cols*(cw+30);S.paste(im,(x+4,y+24),im);d.text((x+3,y+2),str(i),fill=(255,255,0))
    S.save(out);return flat
