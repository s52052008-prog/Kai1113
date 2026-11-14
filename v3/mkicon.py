from PIL import Image,ImageDraw,ImageFont
import random
S=512;im=Image.new('RGB',(S,S));d=ImageDraw.Draw(im)
for y in range(S):
    t=y/S;d.line([(0,y),(S,y)],fill=(int(20+50*t),int(12+14*t),int(40+50*t)))
random.seed(7)
for i in range(70):
    x,y=random.randrange(S),random.randrange(int(S*.75));c=random.choice([(255,255,255),(255,220,150),(200,220,255)]);sz=random.choice([4,4,8]);d.rectangle([x,y,x+sz,y+sz],fill=c)
H=['0110110','1111111','1111111','0111110','0011100','0001000']
px=36;ox=(S-7*px)//2;oy=70
for j,row in enumerate(H):
    for i,ch in enumerate(row):
        if ch=='1':
            x,y=ox+i*px,oy+j*px;d.rectangle([x,y,x+px-1,y+px-1],fill=(255,120,160))
d.rectangle([ox+px+6,oy+px+6,ox+px+22,oy+px+22],fill=(255,235,240))
f=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Black.ttc',96,index=0)
t='宜樂無窮';w=d.textlength(t,font=f);d.text(((S-w)/2,330),t,font=f,fill=(255,214,110))
f2=ImageFont.truetype('/usr/share/fonts/opentype/noto/NotoSansCJK-Bold.ttc',40,index=0);t2='11 · 13';w=d.textlength(t2,font=f2);d.text(((S-w)/2,450),t2,font=f2,fill=(255,170,200))
for n in (512,192,180):im.resize((n,n),Image.LANCZOS).save('/home/claude/pwa/icon-%d.png'%n)
