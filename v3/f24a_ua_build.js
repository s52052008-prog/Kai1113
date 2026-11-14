/* v5.4 使用者自製素材：建築外觀（載入後直接貼圖；在像素化之後繪製，保留原圖細節） */
const uaOK=k=>{const im=window.UAI&&UAI[k];return !!(im&&im.complete&&im.naturalWidth)};
// 建築名 → [素材, 寬度(世界座標), 底部微調]
const UAB={'新興高中':['b_school',214,4],'廟':['b_temple',156,4],'派出所':['b_police',176,4],'銀行':['b_bank',152,4],'全家':['b_conv',116,4],
 '診所':['b_clinic',132,4],'咖啡店':['b_cafe',106,4],'健身房':['b_gym',198,4],'電影院':['b_cinema',170,4],'旅館':['b_hotel',150,4],
 '餐廳':['b_crab',134,4],'消防局':['b_fire',216,4],'城光復興堂':['b_church',268,4],'遊藝場':['b_arcade',176,4],'寵物店':['b_pet',134,4],
 '服飾店':['b_gu',192,4],'家樂福':['b_carrefour',230,4],'機車行':['b_kymco',126,4],'路邊攤':['b_stall',108,4],'火車站':['b_station',256,4],'賓士展示中心':['b_benz',86,4],'捷安特':['b_giant',84,4],'家':['b_home2',84,4],'書局':['b_book2',112,4],'美髮':['b_salon2',104,4],'碳佐麻里':['b_tan',176,4]};
const UABD={'公寓':['b_apt',0,4],'鹽酥雞':['ns_sfry',96,3],'臭豆腐':['ns_stofu',96,3],'珍珠奶茶':['ns_sbbt',96,3],'牛排':['ns_ssteak',96,3],'蒙古烤肉':['ns_smong',96,3],'小火鍋':['ns_shot',96,3],'蚵仔煎':['ns_soys',96,3]};
function uaSize(k,w){const im=UAI[k];return[w,w*im.naturalHeight/im.naturalWidth]}
[...B,...BD].forEach(b=>{const m=(B.includes(b)?UAB:UABD)[b.n];if(!m||!uaOK(m[0]))return;
 let w=m[1];if(!w){const im=UAI[m[0]];w=Math.min(b.w*1.02,b.h*im.naturalWidth/im.naturalHeight)}
 const [ww,hh]=uaSize(m[0],w);b.ua={k:m[0],w:ww,h:hh,oy:m[2]};b.st0=b.st;b.st='ua';
 // 碰撞高度改成跟圖一致（保留底部與門口位置）；只縮不擴，避免擋路
 const nh=Math.round(Math.min(b.h,hh*.86));b.y=b.bot-nh;b.h=nh});
STY.ua=b=>{};
// 在 pixelS() 之後貼上（由收尾程式呼叫）
function uaPaint(){const x=S.getContext('2d');x.save();x.setTransform(KS,0,0,KS,0,NY*KS);x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
 [...B,...BD].forEach(b=>{if(!b.ua)return;const u=b.ua,cx=b.x+b.w/2,bot=b.bot+u.oy;
  x.fillStyle='rgba(30,18,5,.28)';x.beginPath();x.ellipse(cx+3,bot-2,u.w*.5,4,0,0,7);x.fill();
  x.drawImage(UAI[u.k],cx-u.w/2,bot-u.h,u.w,u.h);
  if(b.n=='新興高中'){signBoard(cx-24,bot-u.h*.36,48,11,'新興高中','#f4efe6','#3a2a1a',7.6)}});
 if(typeof uaPaintAreas=='function')uaPaintAreas(x);
 x.restore()}
