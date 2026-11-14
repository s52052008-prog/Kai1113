from PIL import Image
import numpy as np
from scipy import ndimage
S=105/334
def clean(path):
    a=np.array(Image.open(path).convert('RGBA'))
    A=a[...,3];a[A<60]=0;a[...,3]=np.where(A>=60,255,0)
    return a
def comp(sub):
    m=sub[...,3]>0;lab,n=ndimage.label(m)
    if n>1:
        sizes=ndimage.sum(m,lab,range(1,n+1));keep=np.isin(lab,[i+1 for i,s in enumerate(sizes) if s>60]);sub=sub.copy();sub[~keep]=0
    return sub
def pack(src,rows,cols,fw,fh,foot,out):
    a=clean(src);H,W=a.shape[:2];ch,cw=H/rows,W/cols
    sheet=Image.new('RGBA',(fw*cols,fh*rows))
    for r in range(rows):
        subs=[comp(a[int(r*ch):int((r+1)*ch),int(c*cw):int((c+1)*cw)]) for c in range(cols)]
        bot=max(np.where(s[...,3]>0)[0].max() for s in subs)
        for c,s in enumerate(subs):
            im=Image.fromarray(s)
            # premultiply-safe downscale
            arr=np.array(im).astype(float);al=arr[...,3:4]/255;pm=np.concatenate([arr[...,:3]*al,arr[...,3:4]],-1)
            nw,nh=round(im.width*S),round(im.height*S)
            sm=np.array(Image.fromarray(pm.astype(np.uint8)).resize((nw,nh),Image.BOX)).astype(float)
            A=sm[...,3];rgb=np.where(A[...,None]>0,sm[...,:3]*255/np.maximum(A[...,None],1),0)
            o=np.concatenate([np.clip(rgb,0,255),np.where(A>=110,255,0)[...,None]],-1).astype(np.uint8)
            small=Image.fromarray(o)
            ox=c*fw+fw//2-round(im.width/2*S);oy=r*fh+foot-round(bot*S)
            sheet.alpha_composite(small,(ox,oy))
    sheet.save(out);return sheet
pack('/mnt/user-data/attachments/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/ab3e4bf7-image.png',4,4,64,128,120,'art_new/al_walk4.png')
pack('/mnt/user-data/attachments/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/d692cf54-image.png',3,4,128,128,124,'art_new/al_bike.png')
for f in ['al_walk4','al_bike']:
    im=Image.open('art_new/'+f+'.png');bg=Image.new('RGBA',im.size,(190,215,190,255));bg.alpha_composite(im);bg.resize((im.width*3,im.height*3),Image.NEAREST).save('/tmp/prev_'+f+'.png')
