/* v8.2 使用者自製造景：雕像、樹、花台、樹籬、圍籬、步道石、郵筒…… */
(function(){
 for(const k in UAI){if(k.startsWith('lo_')&&uaOK(k)&&!UAM[k])UAM[k]=[UAI[k].naturalWidth,UAI[k].naturalHeight]}
 // 樹：加入新的綠樹、櫻花、楓樹
 Object.assign(UATREE,{0:'lo_tree_g',1:'lo_tree_s',4:'lo_tree_g',6:'lo_tree_m'});
 ['lo_tree_g','lo_tree_s','lo_tree_m'].forEach(k=>{if(UAM[k]){const m=UAM[k];UAM[k]=[58,58*m[1]/m[0]]}});
 // 換掉郵筒、噴水池
 const swap=(from,to,wf)=>{if(!uaOK(to))return;const f=UAI[from];DEC.forEach(d=>{if(d.spr!==f)return;const cx=d.x+d.w/2,bot=d.by??d.y+d.h,w=wf(d.w),h=w*UAI[to].naturalHeight/UAI[to].naturalWidth;d.spr=UAI[to];d.x=cx-w/2;d.y=bot-h;d.w=w;d.h=h;d.by=bot})};
 swap('st_mail','lo_mailbox',w=>10);swap('a_fountain','lo_fountain',w=>w*1.02);
 const D=(k,cx,bot,w,solid=1)=>uaDec(k,cx,bot,w,solid);
 // ── 花園廣場（告白的地方）──
 const PX=2090,PY=1018,gx=GARDEN.x,gy=GARDEN.y;
 D('lo_heart',PX,966,28);
 D('lo_bear',2322,1078,30);D('lo_rabbits',1882,1152,30);D('lo_cats',1992,1152,24);D('lo_moon',2382,962,28);D('lo_giraffe',2376,1152,28);
 D('lo_pergola',1888,996,60);D('lo_signpost',2058,836,18);
 D('lo_planter_round',2050,1000,20);D('lo_planter_round',2130,1000,20);D('lo_planter_red',2050,1048,26);D('lo_planter_red',2130,1048,26);
 D('lo_planter_stone',1944,1128,30);D('lo_planter_stone2',2190,1128,30);
 D('lo_rock_mound',2338,936,30);D('lo_flower_mound',2150,940,22,0);D('lo_flower_small',2330,1110,16,0);
 D('lo_bollard',PX-36,1158,30,0);D('lo_bollard',PX+36,1158,30,0);
 // 樹籬：用手繪樹籬一段段鋪
 [[gx+12,gy+2,86,10],[gx+160,gy+2,100,10],[gx+12,gy+270,128,12],[gx+330,gy+280,200,12]].forEach(([x,y,w,h])=>{const n=Math.max(1,Math.round(w/28)),pw=w/n;for(let i=0;i<n;i++)D(i%3==1?'lo_hedge_flower2':'lo_hedge_box',x+pw*i+pw/2,y+h+2,pw+3,0)});
 // ── 公園 ──
 D('lo_globe',1000,206,24);D('lo_ring',856,206,22);D('lo_cubes',1024,276,22);D('lo_stele',900,282,18);
 D('lo_planter_wood',830,134,26);D('lo_planter_wood2',1026,40,26);D('lo_hedge_flower',960,276,30,0);
 D('lo_fence_iron',840,282,30);D('lo_rock1',1030,250,16);
 // ── 休閒農場 ──
 D('lo_goat',1488,826,26);D('lo_fence_wood',1610,996,30);D('lo_fence_wood',1640,996,30);D('lo_rock2',1790,1150,18);D('lo_planter_wood',1460,1150,26);
 // ── 街角：廟、教會、學校、車站前 ──
 D('lo_lamp',1192,286,9);D('lo_planter_stone2',1214,300,24);
 D('lo_rock_small',2392,820,10);
})();
// 區域大圖：噴水池換新，另加平鋪的步道石（像素化後貼上，保持清晰）
{const _pa=uaPaintAreas;uaPaintAreas=function(x){const P=(k,cx,bot,w)=>{if(!uaOK(k))return false;const m=UAI[k],h=w*m.naturalHeight/m.naturalWidth;x.drawImage(m,cx-w/2,bot-h,w,h);return true};
 if(uaOK('lo_fountain')){P('a_pond',FP.x+FP.w/2,FP.y+FP.h+8,FP.w+30);P('lo_fountain',SX(927),150+26,70)}else _pa(x);
 // 公園草地上的踏腳石（往遊戲區）
 [[952,190],[962,204],[974,214],[986,222]].forEach((q,i)=>P(i%2?'lo_stone_round2':'lo_step_sq',SX(q[0]),q[1],9));
 // 花園：涼亭前的木踏板、池邊石板
 const g=SX(1888);[[g-8,1004],[g+6,1004]].forEach(q=>P('lo_wood_step',q[0],q[1],12));
 [[2172,946],[2200,950],[2228,952]].forEach((q,i)=>P(i%2?'lo_stone_flat':'lo_slab_oval',SX(q[0]),q[1],16));
 // 路口導盲磚：每個路口四個角落、沿著斑馬線兩端
 if(uaOK('lt_24'))HRD.forEach(h=>VRD.forEach(r=>{const T=(x0,y0,w,h2)=>LTX(x,'lt_24',x0,y0,w,h2,6);
  [[r.x-SWK,h.y-SWK],[r.x+r.w,h.y-SWK],[r.x-SWK,h.y+h.h],[r.x+r.w,h.y+h.h]].forEach(([cx,cy],i)=>{const L=i%2==0,U=i<2;
   T(L?cx+SWK-6:cx+1,cy+3,5,SWK-6);T(cx+3,U?cy+SWK-6:cy+1,SWK-6,5)})}));
 // 農場：羊圈旁草皮、小石
 P('lo_grass_pad2',SX(1600),1150,30);P('lo_stone_pad',SX(1780),990,22)}}
