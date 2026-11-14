import numpy as np,sys,json
from PIL import Image,ImageDraw
from scipy import ndimage
def seg(path,out):
    a=np.array(Image.open(path).convert('RGBA'));A=a[...,3]
    m=A>=200
    rgb=a[...,:3].astype(int);white=(rgb.min(-1)>200)&m
    lab,n=ndimage.label(ndimage.binary_dilation(m,iterations=2))
    objs=ndimage.find_objects(lab);comps=[]
    for i,sl in enumerate(objs):
        if sl is None:continue
        y0,y1,x0,x1=sl[0].start,sl[0].stop,sl[1].start,sl[1].stop;h,w=y1-y0,x1-x0
        mm=(lab[sl]==i+1)&m[sl];px=mm.sum()
        if px<25:continue
        wf=(white[sl]&mm).sum()/max(px,1)
        comps.append(dict(x0=x0,y0=y0,x1=x1,y1=y1,h=h,w=w,px=int(px),wf=float(wf),id=i+1))
    # text: small height, whitish
    for c in comps:c['txt']=False
    big=[c for c in comps if c['h']>30 or c['px']>=2500]
    for c in comps:
        if c['h']>32 or c['px']>=3000 or c['w']<c['h']*1.1:continue
        if c['wf']>0.2 or any(b is not c and c['y0']-50<=b['y1']<=c['y0']+6 and b['x0']-30<c['x1'] and c['x0']<b['x1']+30 for b in big):c['txt']=True
    return a,lab,comps
if __name__=='__main__':
    p=sys.argv[1];a,lab,comps=seg(p,None)
    im=Image.fromarray(a);bg=Image.new('RGBA',im.size,(255,0,255,255));bg.alpha_composite(im);d=ImageDraw.Draw(bg)
    for c in comps:d.rectangle((c['x0'],c['y0'],c['x1'],c['y1']),outline=(0,255,255,255) if c['txt'] else (255,255,0,255))
    bg.convert('RGB').save(sys.argv[2]);print(len(comps),sum(c['txt'] for c in comps))
