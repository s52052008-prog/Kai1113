import numpy as np
from PIL import Image,ImageDraw
from scipy import ndimage
def items(path,dark=False):
    a=np.array(Image.open(path).convert('RGBA'));A=a[...,3];m=A>=200
    rgb=a[...,:3].astype(int);white=(rgb.min(-1)>200)&m
    lab,n=ndimage.label(ndimage.binary_dilation(m,iterations=(3 if dark else 1)))
    out=[]
    for i,sl in enumerate(ndimage.find_objects(lab)):
        if sl is None:continue
        y0,y1,x0,x1=sl[0].start,sl[0].stop,sl[1].start,sl[1].stop;h,w=y1-y0,x1-x0
        mm=(lab[sl]==i+1)&m[sl];px=mm.sum()
        if px<60:continue
        wf=(white[sl]&mm).sum()/px
        if h<=32 and w>=h*1.05 and (wf>0.2 or dark) and px<4000:continue
        if h<=42 and wf>0.3:continue
        # 底部黏著的文字標籤：找最下面 40 列裡的空白列，下面那段偏白就切掉
        sub_m=mm.copy();rows_any=sub_m.any(1);H=len(rows_any)
        for r in range(H-1,max(0,H-44),-1):
            if not rows_any[r]:
                band=sub_m[r:];bw=(white[sl][r:]&band).sum()/max(band.sum(),1)
                if bw>0.12 and band.sum()>30:mm[r:]=False;y1=y0+r
                break
        # 黏在一起的白字（純白＋黑邊）：從下往上掃
        sa=a[sl[0].start:sl[0].start+mm.shape[0],sl[1].start:sl[1].start+mm.shape[1]] if False else None
        if mm.sum()<60:continue
        reg=a[y0:y0+mm.shape[0],x0:x0+mm.shape[1]].astype(int)
        pw=(reg[...,:3].min(-1)>232)&((reg[...,:3].max(-1)-reg[...,:3].min(-1))<14)&mm
        fr=pw.sum(1)/np.maximum(mm.sum(1),1);Hh=len(fr);r=Hh
        while r>0 and Hh-r<30 and fr[max(0,r-4):r].max()>0.12:r-=1
        if 10<=Hh-r<30 and fr[r:].max()>0.25 and r>Hh*0.4:mm[r:]=False
        if mm.sum()<60:continue
        ys,xs=np.where(mm);sl=(slice(y0+ys.min(),y0+ys.max()+1),slice(x0+xs.min(),x0+xs.max()+1));mm=mm[ys.min():ys.max()+1,xs.min():xs.max()+1];x0=sl[1].start;y0=sl[0].start;y1=sl[0].stop;w=mm.shape[1];h=mm.shape[0]
        sub=a[sl].copy();sub[~mm]=0;sub[...,3]=np.where(mm,255,0)
        out.append(dict(img=Image.fromarray(sub),x=x0,y=y0,y1=y1,w=w,h=h))
    out.sort(key=lambda q:q['y1']);rows=[]
    for q in out:
        if rows and q['y1']-rows[-1][0]['y1']<70:rows[-1].append(q)
        else:rows.append([q])
    flat=[]
    for r in rows:flat+=sorted(r,key=lambda q:q['x'])
    return flat
def contact(flat,out,cols=12,cw=120):
    H=((len(flat)+cols-1)//cols)*(cw+20);S=Image.new('RGB',(cols*cw,H),(60,60,70));d=ImageDraw.Draw(S)
    for i,q in enumerate(flat):
        im=q['img'].copy();im.thumbnail((cw-8,cw-8));x,y=i%cols*cw,i//cols*(cw+20);S.paste(im,(x+4,y+16),im);d.text((x+3,y+2),str(i),fill=(255,255,0))
    S.save(out)
if __name__=='__main__':
    import pickle
    SH={'eden':('583c3088',1),'back':('a3eaea54',0),'f1':('eb43af43',0),'f2':('7ab83cae',0),'f3':('dbee9d83',0)};R={}
    for k,(f,dk) in SH.items():
        fl=items('/mnt/user-data/attachments/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/%s-image.png'%f,dk);contact(fl,'/tmp/ct_%s.png'%k);R[k]=[q['img'] for q in fl];print(k,len(fl))
    pickle.dump(R,open('/tmp/ct.pkl','wb'))
