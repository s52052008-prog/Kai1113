from PIL import Image
import numpy as np
from scipy import ndimage
A='/mnt/user-data/attachments/b29ee7d0-5160-55a2-85eb-c3b9d9b89065/'
import sys
SRC=[('w1','db5d247a',1),('w2','9c992868',1),('w3','0d08387f',1),('w4','7a261077',.94),('w5','20eee65d',1),('w6','fe9c9a6b',1)]
FW,FH,FOOT=64,128,120
def clean(a):
    a=a.copy();A_=a[...,3];a[A_<90]=0;a[...,3]=np.where(A_>=90,255,0)
    for _ in range(3):
        r,g,b=a[...,0].astype(int),a[...,1].astype(int),a[...,2].astype(int);red=(r>150)&(g<90)&(b<90)&(a[...,3]>0)
        yel=(r>200)&(g>200)&(b<90)&(a[...,3]>0)
        tr=a[...,3]==0;nb=ndimage.binary_dilation(tr,iterations=2)
        kill=(red|yel)&nb;a[kill]=0
    # 去掉紅色鬼影：低飽和背景裡偏紅、且很薄的邊
    return a
def comp(sub):
    m=sub[...,3]>0;lab,n=ndimage.label(m)
    if n>1:
        sizes=ndimage.sum(m,lab,range(1,n+1));big=max(sizes);keep=np.isin(lab,[i+1 for i,s in enumerate(sizes) if s>max(60,big*0.02)]);sub=sub.copy();sub[~keep]=0
    return sub
def down(im,S):
    arr=np.array(im).astype(float);al=arr[...,3:4]/255;pm=np.concatenate([arr[...,:3]*al,arr[...,3:4]],-1)
    nw,nh=max(1,round(im.width*S)),max(1,round(im.height*S))
    sm=np.array(Image.fromarray(pm.astype(np.uint8)).resize((nw,nh),Image.BOX)).astype(float)
    Aa=sm[...,3];rgb=np.where(Aa[...,None]>0,sm[...,:3]*255/np.maximum(Aa[...,None],1),0)
    return Image.fromarray(np.concatenate([np.clip(rgb,0,255),np.where(Aa>=110,255,0)[...,None]],-1).astype(np.uint8))
ORD=[1,0,3,2]
out={}
for code,fid,sc in SRC:
    a=clean(np.array(Image.open(A+fid+'-image.png').convert('RGBA')));H,W=a.shape[:2];ch,cw=H/4,W/4
    # 角色高度（正面站姿）→ 縮放
    f0=comp(a[0:int(ch),0:int(cw)]);ys=np.where(f0[...,3]>0)[0];hgt=ys.max()-ys.min()
    S=105/hgt*sc
    w4=Image.new('RGBA',(FW*4,FH*4))
    cells={}
    for r in range(4):
        subs=[comp(a[int(r*ch):int((r+1)*ch),int(c*cw):int((c+1)*cw)]) for c in range(4)]
        bot=max(np.where(s[...,3]>0)[0].max() for s in subs)
        for c,s in enumerate(subs):
            im=Image.fromarray(s);xs=np.where(s[...,3].any(0))[0];cx=(xs.min()+xs.max())/2
            sm=down(im,S);dc=ORD.index(c)
            ox=dc*FW+FW//2-round(cx*S);oy=r*FH+FOOT-round(bot*S)
            w4.alpha_composite(sm,(ox,oy));cells[(r,dc)]=w4.crop((dc*FW,r*FH,dc*FW+FW,r*FH+FH))
    # _sheet：6 欄 × 10 列（0-3 走路、4-7 站、8 坐、9 動作）
    sh=Image.new('RGBA',(FW*6,FH*10))
    for r in range(4):
        for c in range(6):sh.alpha_composite(cells[(r,[0,1,2,3,0,1][c])],(c*FW,r*FH))
        for c in range(6):sh.alpha_composite(cells[(r,1)],(c*FW,(r+4)*FH))
    def sit(cell):
        arr=np.array(cell);ys=np.where(arr[...,3].any(1))[0];top,bt=ys.min(),ys.max();hip=int(top+(bt-top)*.62);d=int((bt-hip)*.45)
        o=Image.new('RGBA',(FW,FH));o.alpha_composite(cell.crop((0,0,FW,hip)),(0,d))
        legs=cell.crop((0,hip,FW,bt+1)).resize((FW,max(1,bt+1-hip-d)),Image.NEAREST);o.alpha_composite(legs,(0,hip+d));return o
    sh.alpha_composite(sit(cells[(0,1)]),(0,8*FH));sh.alpha_composite(sit(cells[(3,1)]),(FW,8*FH))
    for c in range(6):sh.alpha_composite(cells[(0,1)],(c*FW,9*FH))
    # 頭像：從原圖正面取頭肩
    ys=np.where(f0[...,3]>0)[0];xs=np.where(f0[...,3].any(0))[0];t=ys.min();hh=int(hgt*.5);cx=(xs.min()+xs.max())//2
    hd=Image.fromarray(f0).crop((cx-hh//2-6,t-4,cx+hh//2+6,t-4+hh+12));side=max(hd.size);sq=Image.new('RGBA',(side,side));sq.alpha_composite(hd,((side-hd.width)//2,side-hd.height));
    sq=sq.resize((160,160),Image.LANCZOS)
    w4.save('npc2/%s_walk4.png'%code);sh.save('npc2/%s_sheet.png'%code);sq.save('npc2/%s_neutral.png'%code)
    print(code,round(S,3))
# 預覽
pv=Image.new('RGBA',(FW*4*len(SRC),FH*4),(190,215,190,255))
for i,(code,_,_) in enumerate(SRC):pv.alpha_composite(Image.open('npc2/%s_walk4.png'%code),(i*FW*4,0))
pv.resize((pv.width,pv.height),Image.NEAREST).save('/tmp/npc2_prev.png')
pv2=Image.new('RGBA',(170*len(SRC),170),(240,220,180,255))
for i,(code,_,_) in enumerate(SRC):pv2.alpha_composite(Image.open('npc2/%s_neutral.png'%code),(i*170+5,5))
pv2.save('/tmp/npc2_face.png')
