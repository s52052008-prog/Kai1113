/* v5.5 使用者自製素材：室內家具（像素化後才貼上，保留原圖細節） */
// 規則：kind → [素材(陣列則依序輪替) 或 '-'(隱藏), {s:寬度倍率, hm:最高高度倍率(相對格子高), tile:並排數, dy, z}]
const UAR={
 '城光復興堂':{pew:['ch_019',{tile:2,hm:4.2,fy:1}],pulpit:['ch_011',{s:1.1,hm:2.2}],piano:['ch_014',{s:1.15,hm:1.8}],drums:['ch_013',{s:1.05,hm:1.7}],amp:[['ch_005','ch_003'],{s:1.1,hm:1.9}],stand:['ch_001',{s:.6,hm:1.5}],
  bookcase:['ch_028',{s:.95,hm:1.3}],chair:['ch_034',{s:1.3,hm:2.6}],fridge:['ch_026',{s:2,hm:1.3}],counter:['ch_025',{s:.7,hm:3}],wboard:[['ch_007','ch_008'],{s:.6,hm:1.5}],
  plant:[['ch_029','ch_035'],{s:1.2,hm:1.9}],mat:['ch_000',{s:.64,hm:3.2,z:-1}],cross:['-'],board:['-']},
 '廟':{altar:['ch_036',{s:.86,hm:1.5,z:-1}],urn:[['ch_037b','ch_042'],{s:1.25,hm:1.7}],fortune:['ch_046',{s:.7,hm:1.7}],cush:['ch_050',{s:.8,hm:2}],lantern:['ch_039',{s:2.1,hm:1.3,dy:2}],plant:['ch_043',{s:1.7,hm:1.4}]},
 '健身房':{treadmill:['sh_004',{s:1.3,hm:1.1}],dbrack:['sh_009',{s:1,hm:1.6}],squat:['sh_000',{s:1.15,hm:1.7}],cable:['sh_001',{s:1.15,hm:1.8}],legpress:['sh_002',{s:1.25,hm:1.9}],spin:['sh_007',{s:1.6,hm:1.4}],
  ball:['sh_016',{s:2.2,hm:2.2}],plates:['sh_013',{s:2.2,hm:1.2}],water:['sh_018',{s:1.1,hm:1.3}],locker:['sh_017',{s:1,hm:1.6}],counter:['sh_021',{s:1.1,hm:2}],mirror:['sh_012',{s:.85,hm:1.7}]},
 '新興高中':{chalk:['sc_002',{s:1,hm:1.25}],clock:['sc_005',{s:1.3,hm:1.3}],counter:['sc_000',{s:.72,hm:2.8}],sdesk:['sc_008',{s:1.15,hm:2.3}],locker:['sc_013',{s:.85,hm:1.5}],poster:[['sc_004','sc_006'],{s:1.05,hm:1.3}],
  drums:['ch_013',{s:1.1,hm:1.8}],amp:['ch_003',{s:1,hm:1.6}],bench:['sc_019',{s:.8,hm:2.6}],plant:['sc_022',{s:1.4,hm:1.6}],ball:['sc_043',{s:2,hm:1.8}]},
 '派出所':{counter:['pf_005',{s:1,hm:2.4}],pdesk:['pf_028',{s:.85,hm:2.6}],board:['pf_004',{s:.95,hm:1.7}],cell:['pf_010',{s:1,hm:1.1}],sofa:['pf_026',{s:1.25,hm:1.9}],plant:['sh_039',{s:1.3,hm:1.4}]},
 '銀行':{teller:['pf_025',{s:1,hm:2.7}],vault:['pf_031',{s:1,hm:1.15}],atm:['sh_045',{s:.85,hm:1.35}],sofa:['pf_026',{s:1,hm:1.6}],plant:['sh_039',{s:1.3,hm:1.4}]},
 '火車站':{tkwin:['pf_019',{s:.85,hm:1.6}],ttable:['pf_021b',{s:.95,hm:1.3}],wait:['pf_023',{s:1,hm:2.6}],plant:['sh_039',{s:1.3,hm:1.4}]},
 '溫泉鄉站':{tkwin:['pf_019',{s:.85,hm:1.6}],wait:['pf_023',{s:1,hm:2.6}]},
 '全家':{fcooler:['sh_042b',{s:1,hm:1.55}],snackg:['sh_042a',{s:1,hm:1.9}],bento:['sh_043',{s:1,hm:1.4}],ibon:['sh_046',{s:1.05,hm:1.4}],atm:['sh_045',{s:1.05,hm:1.45}],fcounter:['sh_044b',{s:1,hm:2.5}]},
 '家樂福':{freezer:['sh_026',{s:1,hm:1.6}],produce:['sh_025b',{s:1,hm:2.1}],stack:[['sh_029','sh_027','sh_029'],{s:1,hm:1.6}],snackg:['sh_025a',{s:1,hm:1.9}],checkout:['sh_022',{s:1,hm:2.5}],cart:['sh_023',{s:1.15,hm:2.1}]},
 '咖啡店':{cmachine:['sh_031a',{s:1.15,hm:1.9}],pcase:['sh_031b',{s:1,hm:1.6}],menu:['sh_031c',{s:1,hm:1.3}],ptable:['sh_036',{s:.72,hm:2.6}],chair:['sh_037',{s:1.25,hm:2.4}],sofa:['sh_038',{s:1,hm:2.3}],bookcase:['sh_032',{s:.6,hm:1.3}],plant:['sh_039',{s:1.3,hm:1.4}],easel:['sh_031d',{s:.8,hm:1.2}]},
 '寵物店':{cage:[['sh_053c','sh_053c','sh_053c','sh_053a'],{s:.85,hm:1.4}],tank:['sh_051',{s:1,hm:1.6}],perch:['sh_049b',{s:1.3,hm:1.2}],gshelf:[['sh_049a','sh_050','sh_055'],{s:.85,hm:1.35}],petbed:['sh_059',{s:.8,hm:1.5}],counter:['sh_054c',{s:1,hm:2.4}],plant:['sh_039',{s:1.3,hm:1.4}]},
 '服飾店':{clothesrack:[['sh_057','sh_058','sh_068','sh_057'],{s:.95,hm:1.4}],mannequin:[['sh_062','sh_064','sh_062'],{s:1.25,hm:1.2}],shoeshelf:['sh_069',{s:.85,hm:1.6}],fit:['sh_065a',{s:1.2,hm:1.4}],counter:['sh_072',{s:1,hm:2.5}],plant:['sh_039',{s:1.3,hm:1.4}]},
 '遊藝場':{neon:['en_024a',{s:1,hm:1.3}],crane:['en_024b',{s:1.1,hm:1.5}],acab:[['en_024c','en_024d'],{s:1,hm:1.35}],ksim:['en_024e',{s:.95,hm:1.1}],prizes:['en_028',{s:.85,hm:1.2}],counter:['en_024g',{s:1.4,hm:2.5}],plant:['en_032',{s:1.4,hm:1.4}]},
 '電影院':{counter:['en_020a',{s:1,hm:3}],popcorn:['-'],seat:['en_020b',{s:1,hm:2.5}],vend:['en_021',{s:1,hm:1.3}],poster:[['en_022','en_023','en_022'],{s:1,hm:1.2}],sofa:['en_030',{s:1,hm:2}],plant:['en_032',{s:1.4,hm:1.4}]},
 '旅館':{frontdesk:['en_033a',{s:1,hm:2.7}],luggage:['en_033b',{s:1.25,hm:1.8}],elev:['pf_049',{s:1,hm:1.1}],sofa:['en_034a',{s:1.2,hm:2.7}],plant:['en_032',{s:1.4,hm:1.4}]},
 '湯之里旅館':{frontdesk:['en_036a',{s:1,hm:2.5}],byobu:['en_036b',{s:.6,hm:1.4}],zshelf:['en_036c',{s:1,hm:1.3}],lowt:['en_036f',{s:1,hm:2}],plant:['en_032',{s:1.4,hm:1.4}]},
 '岩之湯':{fridge:['en_036h',{s:1.3,hm:1.2}]},
 '餐廳':{cgrill:['en_007a',{s:1.05,hm:1.9}],seafood:['en_007b',{s:1,hm:2.1}],fridge:['en_008',{s:1.6,hm:1.15}],menu:['en_010',{s:.65,hm:1.4}],rtable:['en_013',{s:1.15,hm:2.7}]},
 '路邊攤':{pot:['en_016',{s:1,hm:1.6}],shelf:['en_011b',{s:1,hm:1.6}],stool:['en_019',{s:1,hm:2}],crate:['en_011a',{s:1,hm:1.4}]},
 '山莊食堂':{rtable:['en_014',{s:1.1,hm:2.5}]},
 '碳佐麻里':{chand:['en_031',{s:.8,hm:5,dy:6}],piano:['sc_018',{s:.95,hm:1.6}],plant:['en_032',{s:1.4,hm:1.4}]},
 '書局':{bookcase:['sc_012',{s:1,hm:1.35}]},
 '機車行':{toolbox:[['mo_005','mo_010'],{s:1.2,hm:1.7}],gshelf:['mo_002',{s:.8,hm:1.4}],tire:[['mo_004','mo_013'],{s:1.4,hm:1.3}],barrel:['mo_011',{s:2,hm:1.2}],lift:['mo_003',{s:1,hm:1.4}],counter:['mo_008',{s:1,hm:2.5}],bikeI:['-']},
 '消防局':{hose:['pf_013',{s:1,hm:1.4}],dispatch:['pf_012a',{s:.8,hm:1.5}]}
};
// 額外擺設：[素材, 中心x, 底部y, 寬, 是否阻擋(1/0)]
const UAX={
 '城光復興堂':[['ch_027',95,86,15,1],['ch_027',239,86,15,1],['ch_012',282,60,13,1],['ch_033',176,294,11,0],['ch_032',270,294,11,0],['ch_016',575,104,12,0],['ch_017',590,104,12,0]],
 '廟':[['ch_048',122,214,22,1],['ch_049',228,214,22,1],['ch_040',36,104,28,1],['ch_041',104,96,10,1],['ch_041',246,96,10,1],['ch_045',292,176,22,1],['ch_044',330,64,16,0]],
 '健身房':[['sh_020',186,226,16,1],['sh_014',136,86,16,1]],
 '新興高中':[['sc_010',340,110,24,1],['sc_012',380,110,30,1],['sc_018',420,152,30,1],['sc_009',320,150,16,1]],
 '派出所':[['pf_007',100,62,18,1],['pf_008',254,58,10,1]],
 '銀行':[['pf_027',254,52,14,1],['pf_032',296,142,30,1],['pf_030',170,174,12,1]],
 '火車站':[['pf_018a',110,130,70,0],['pf_018c',362,150,22,1],['pf_020a',290,30,40,0],['pf_022',122,198,30,1]],
 '家樂福':[['sh_024',336,220,12,1]],
 '服飾店':[['sh_070',120,212,10,1],['sh_071',112,98,12,1],['sh_065b',190,100,40,1]],
 '遊藝場':[['en_025',456,120,34,1],['en_029',210,132,50,1],['en_024f',462,192,20,1]],
 '電影院':[['en_027',300,236,20,0]],
 '旅館':[['en_031',215,84,26,0]],
 '湯之里旅館':[['en_036e',426,92,22,1]],
 '岩之湯':[['en_036e',300,212,22,1]],
 '餐廳':[['en_000',241,28,70,0],['en_001',312,28,8,0],['en_002',330,28,8,0],['en_003',348,28,8,0]],
 '機車行':[['mo_000',244,126,92,1],['mo_009',300,150,36,1]],
 '消防局':[['pf_012b',330,142,34,1]]
};
function uaFit(k,w0,h0,o){const m=UAI[k],ar=m.naturalHeight/m.naturalWidth;let w=w0*(o.s||1),h=w*ar;const mh=(o.hm||2.8)*Math.max(h0,12);if(h>mh){h=mh;w=h/ar}return[w*(o.sx||1),h*(o.sy||1)]}
// 額外擺設與阻擋格（在房間第一次建立前加入）
for(const n in UAX){const d=IN[n];if(!d||!d.fur)continue;UAX[n].forEach(q=>{d.fur.push(['uax',q[1]-q[3]/2,q[2]-8,q[3],8,q[0],q[4]])})}
FD.uax=()=>{};FD.uaf=()=>{};
{const _fs=furnSolid;furnSolid=f=>f[0]=='uax'?!!f[6]:_fs(f)}
// 包裝 renderRm：把有素材的家具延後到像素化之後再貼
{const _rr=renderRm;renderRm=function(d,n){const M=UAR[n]||{},hasX=d.fur.some(f=>f[0]=='uax'||f[0]=='uaf');if(!Object.keys(M).length&&!hasX)return _rr(d,n);
 const def=[],cnt={},fur0=d.fur;
 d.fur=fur0.filter(f=>{let r=M[f[0]],k,o={};
  if(f[0]=='uax'||f[0]=='uaf'){k=f[5];if(Array.isArray(k))k=k[Math.floor(Math.random()*k.length)];o=f[7]||{};if(f[0]=='uax'){o={s:1,hm:99};const w=f[3];if(!uaOK(k))return false;def.push({k,cx:f[1]+w/2,b:f[2]+8,w,h0:999,o,z:0});return false}}
  else{if(!r)return true;const i=cnt[f[0]]=(cnt[f[0]]||0);cnt[f[0]]++;o=r[1]||{};k=Array.isArray(r[0])?(o.rnd?r[0][Math.floor(Math.random()*r[0].length)]:r[0][i%r[0].length]):r[0];if(k=='-')return false}
  if(!uaOK(k))return true;
  const n2=o.tile||1;for(let t=0;t<n2;t++){const tw=f[3]/n2;def.push({k,cx:f[1]+tw*t+tw/2,b:f[2]+f[4]+(o.dy||0),w:tw,h0:f[4],o,z:o.z||0})}
  return false});
 let c;try{c=_rr(d,n)}finally{d.fur=fur0}
 const x=c.getContext('2d');x.save();x.setTransform(KS,0,0,KS,0,0);x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';
 def.sort((a,b)=>a.z-b.z||a.b-b.b).forEach(q=>{const m=UAI[q.k];if(q.o&&q.o.cover){const sw=m.naturalWidth,sh=m.naturalHeight,ar=q.w/q.h0;let cw=sw,ch=sw/ar;if(ch>sh){ch=sh;cw=sh*ar}x.drawImage(m,(sw-cw)/2,(sh-ch)*(q.o.cy??.5),cw,ch,q.cx-q.w/2,q.b-q.h0,q.w,q.h0);return}const [w,h]=uaFit(q.k,q.w,q.h0,q.o);
  x.fillStyle='rgba(20,10,0,.18)';x.beginPath();x.ellipse(q.cx+1,q.b-1,w*.42,Math.max(1.5,h*.05),0,0,7);x.fill();if(q.o&&q.o.fy){x.save();x.translate(q.cx,q.b-h/2);x.scale(1,-1);x.drawImage(m,-w/2,-h/2,w,h);x.restore()}else x.drawImage(m,q.cx-w/2,q.b-h,w,h)});
 x.restore();return c}}
