import pickle,json,base64,io,numpy as np
from PIL import Image
from scipy import ndimage
R=pickle.load(open('/tmp/ct.pkl','rb'))
N={
'eden':'服務櫃台,辦公桌椅,會議桌椅,文件櫃,伊甸基金會外觀,書櫃,影印機,碎紙機,飲水機,白板,公告欄,等候椅,輪椅,助行器,文具組,公文文件,檔案夾,影印紙,訂書機組,釘書機膠台,辦公電話,電腦設備,宣傳海報1,宣傳海報2,宣傳海報3,捐款箱,諮詢桌椅,志工背心,盆栽,無障礙坡道,指示牌',
'back':'餐邊櫃,電視櫃,樓梯,窗戶,沙發,按摩椅,懶人沙發,茶几,餐椅,餐桌,冰箱,衣架,冷氣,電風扇,時鐘,裝飾畫1,裝飾畫2,裝飾畫3,字畫,春聯,落地窗,抱枕(粉),抱枕(白),咖啡機,烤箱,氣炸鍋,快煮壺,飲水機,微波爐,玻璃櫃,面紙盒,廚房紙巾,濕紙巾,營養品,罐頭,奶粉罐,零食,泡麵,餐具,馬克杯,保溫瓶,礦泉水,杯子,手機,筆電,滑鼠,遙控器,遙控器2,延長線,充電線,垃圾桶,化妝包,藥品,後背包,行李箱,手提袋,拖鞋,安全帽,帽子,眼鏡,鑰匙,錢包,文件盒,工具盒,收納箱,購物袋,收納箱2,小物袋,小汽車,-,玩具盒,公仔,籃球,盆栽,抽屜櫃,落地燈,邊桌,小板凳,鞋櫃,鞋架,掃把組,吸塵器,掃地機器人,除濕機,路由器,電鍋,平底鍋,鍋子,鍋子2,砧板',
'f1':'餐邊櫃,電視櫃,樓梯,窗戶,沙發,按摩椅,懶人沙發,茶几,餐椅,餐桌,冰箱,衣架,冷氣,電風扇,時鐘,裝飾畫1,裝飾畫2,裝飾畫3,字畫,春聯,落地窗,抱枕(粉),抱枕(白),咖啡機,烤箱,氣炸鍋,快煮壺,飲水機,微波爐,玻璃櫃,面紙盒,廚房紙巾,濕紙巾,營養品,罐頭,奶粉罐,零食,泡麵,餐具,馬克杯,保溫瓶,礦泉水,杯子,手機,筆電,滑鼠,遙控器,遙控器2,延長線,充電線,垃圾桶,化妝包,藥品,後背包,行李箱,手提袋,拖鞋(左),拖鞋(右),安全帽,帽子,眼鏡,鑰匙,錢包,文件盒,工具盒,收納箱,購物袋,收納袋,小汽車,玩具盒,公仔,籃球,盆栽,抽屜櫃,落地燈,邊桌,小板凳,鞋櫃,鞋架,掃把組,吸塵器,掃地機器人,除濕機,路由器,電鍋,平底鍋,鍋子,鍋子2,砧板',
'f2':'餐邊櫃,電視櫃,樓梯,窗戶,懶人沙發,茶几,餐椅,餐桌,沙發,按摩椅,冰箱,衣架,冷氣,電風扇,時鐘,裝飾畫1,裝飾畫2,裝飾畫3,字畫,春聯,落地窗,抱枕(粉),抱枕(白),咖啡機,烤箱,氣炸鍋,快煮壺,飲水機,微波爐,玻璃櫃,面紙盒,廚房紙巾,濕紙巾,營養品,罐頭,奶粉罐,零食,泡麵,餐具,馬克杯,保溫瓶,礦泉水,杯子,手機,筆電,滑鼠,遙控器,遙控器2,延長線,充電線,垃圾桶,化妝包,藥品,後背包,行李箱,手提袋,拖鞋,安全帽,帽子,眼鏡,鑰匙,錢包,文件盒,工具盒,收納箱,購物袋,小汽車,玩具盒,公仔,籃球,盆栽,抽屜櫃,落地燈,邊桌,小板凳,鞋櫃,鞋架,掃把組,吸塵器,掃地機器人,除濕機,路由器,電鍋,平底鍋,鍋子,砧板',
'f3':'餐邊櫃,樓梯窗戶,沙發,按摩椅,懶人沙發,茶几,餐椅,餐桌,電視櫃,電視,冰箱,衣架,冷氣,電風扇,時鐘,裝飾畫1,裝飾畫2,裝飾畫3,字畫,春聯,落地窗,玻璃櫃,烤箱,咖啡機,氣炸鍋,快煮壺,飲水機,微波爐,收納箱,收納籃,後背包,行李箱,手提袋,拖鞋,餐桌椅,衛生紙,廚房紙巾,濕紙巾,酒精,營養品,罐頭,罐頭2,零食,泡麵,餐具,馬克杯,保溫瓶,水壺(粉),礦泉水,手機,平板,滑鼠,剪刀,遙控器,延長線,充電線,垃圾桶,化妝包,藥品,口罩,小汽車,公仔,籃球,遊戲手把,路由器,相機,文件,鑰匙,蛋白粉,油漆桶,電鍋,鍋子,平底鍋,砧板,碗,濕紙巾(大),垃圾袋,安全帽,雨傘,寵物碗,抽屜櫃,小圓桌,落地燈,除濕機,掃地機器人,衣服堆,帽子,眼鏡,面紙盒,收納盒,工具盒,球,抱枕,頸枕,毛巾,小板凳,充電頭,行動電源,按摩槍,盆栽,盆栽2,球帽,衣架(單)'}
CUT={'f3':{23:26,29:26,30:26,32:26,56:26,68:26,97:26,100:26,101:26}}
SID={'eden':'64','back':'65','f1':'66','f2':'67','f3':'68'}
META={'eden':('伊甸基金會（社福中心）','🏛️ 主題・公共',.26),'back':('我家・背面','🏠 居家',.26),'f1':('我家・正面 A','🏠 居家',.26),'f2':('我家・正面 B','🏠 居家',.26),'f3':('我家・正面 C','🏠 居家',.26)}
def clean(im,cut=0):
    a=np.array(im)
    if cut:a=a[:max(4,a.shape[0]-cut)]
    m=a[...,3]>0;lab,n=ndimage.label(m)
    if n>1:
        sz=ndimage.sum(m,lab,range(1,n+1));big=sz.max()
        for i,s in enumerate(sz):
            if s<max(50,big*.02):a[lab==i+1]=0
    im=Image.fromarray(a);bb=im.getbbox();return im.crop(bb)
idx_s=open('../pk/pk_index.js').read();pre=idx_s[:idx_s.index('{')];IDX=json.loads(idx_s[idx_s.index('{'):idx_s.rindex('}')+1])
DS=.6
for k,sid in SID.items():
    names=N[k].split(',');imgs=R[k];assert len(names)==len(imgs),(k,len(names),len(imgs))
    items=[];nm=[]
    for i,(n,im) in enumerate(zip(names,imgs)):
        if n=='-':continue
        im=clean(im,CUT.get(k,{}).get(i,0));ow,oh=im.size
        sm=im.resize((max(1,round(ow*DS)),max(1,round(oh*DS))),Image.LANCZOS);a=np.array(sm);a[...,3]=np.where(a[...,3]>=128,255,0);a[a[...,3]==0]=0;sm=Image.fromarray(a)
        items.append((sm,ow,oh));nm.append(n)
    W=1600;x=y=rh=0;pos=[]
    for sm,ow,oh in items:
        if x+sm.width>W:x=0;y+=rh+2;rh=0
        pos.append((x,y));x+=sm.width+2;rh=max(rh,sm.height)
    H=y+rh;S=Image.new('RGBA',(W,H))
    r=[]
    for (sm,ow,oh),(px,py) in zip(items,pos):S.alpha_composite(sm,(px,py));r.append([px,py,sm.width,sm.height,ow,oh])
    b=io.BytesIO();S.save(b,'WEBP',quality=90,alpha_quality=100,method=6);data=b.getvalue()
    open('../pk/p%s.webp'%sid,'wb').write(data)
    open('../pk/d%s.js'%sid,'w').write("(window.PKD=window.PKD||{})['%s']='data:image/webp;base64,%s';"%(sid,base64.b64encode(data).decode()))
    n,g,f=META[k];IDX[sid]={'n':n,'g':g,'r':r,'nm':nm,'f':f}
    print(sid,k,len(nm),S.size,len(data))
open('../pk/pk_index.js','w').write(pre+json.dumps(IDX,ensure_ascii=False,separators=(',',':'))+idx_s[idx_s.rindex('}')+1:])
