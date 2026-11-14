/* v8.1 室內家具美術（第九批：健身房・碳佐麻里・遊藝場・電影院・教會・咖啡店・車站・溫泉鄉） */
{const _fs=furnSolid;furnSolid=f=>f[0]=='uaf'?!!f[6]:_fs(f)}
(function(){
 const S=(n,o)=>{UAR[n]=Object.assign(UAR[n]||{},o)};
 S('健身房',{bpress:[['iv_g_bench','iv_g_bench_o'],{s:1.15,hm:2.3}],yoga:[['iv_g_yoga_p','iv_g_yoga_b'],{s:1,hm:2,z:-1}],bag:[['iv_g_bag_r','iv_g_bag_b'],{s:1.5,hm:2.5}],
  ring:['iv_g_ring',{s:1.1,hm:1.2}],dbrack:['iv_g_rack',{s:1,hm:1.8}]});
 S('碳佐麻里',{wine:['iv_t_wine_jp',{s:1,hm:1.6}],ftable:[['iv_t_load_f','iv_t_empty_f','iv_t_load_o','iv_t_done_f','iv_t_empty_o','iv_t_load_f'],{s:1.2,hm:2}]});
 S('遊藝場',{pachi:[['iv_a_pachi1','iv_a_pachi2','iv_a_pachi3','iv_a_pachi2'],{s:1,hm:1.1}],arena:[['iv_a_bey','iv_a_bey2'],{s:1.1,hm:1.6}],coinm:['iv_a_coin_r',{s:1.15,hm:1.5}],
  crane:[['iv_a_claw1','iv_a_claw4'],{s:1.2,hm:1.25}],counter:['iv_a_counter',{s:1.3,hm:2.4}]});
 S('電影院',{seat:[['iv_c_sofa1','iv_c_sofa1','iv_c_sofa5','iv_c_sofa5','iv_c_sofa3','iv_c_sofa3','iv_c_sofa1','iv_c_sofa1','iv_c_sofa5','iv_c_sofa5','iv_c_sofa3','iv_c_sofa3'],{tile:3,s:1.05,hm:2.3}],
  counter:[['iv_c_conc','en_020a'],{s:1.1,hm:3}]});
 S('城光復興堂',{cross:['iv_h_cross',{s:1,hm:1.3,dy:8}],glass:[['iv_h_glass1','iv_h_glass2','iv_h_glass3'],{s:.55,hm:1.6,dy:4}],sofa:[['iv_h_lsofa','iv_h_lsofa2'],{s:1,hm:2}],
  kitchen:['iv_h_kitchen_b',{s:.8,hm:1.75}],fridge:['iv_h_fridge',{s:1.1,hm:1.3}],rtable:['iv_h_table',{s:1.3,hm:1.5}],cross2:['iv_h_cross',{s:1,hm:1.3}]});
 S('咖啡店',{pcase:['iv_f_case',{s:1,hm:1.8}],rug:['iv_f_kids',{cover:1,z:-1}],toybox:['-'],blocks:['-'],easel:['-'],ptable:[['sh_036','sh_036','sh_036','-'],{s:.72,hm:2.6}]});
 S('火車站',{ttable:['iv_s_board1',{s:1,hm:1.35}],wait:['iv_s_seats',{s:1,hm:2.6}]});
 S('溫泉鄉站',{ttable:['iv_s_board2',{s:1,hm:1.35}],lantern:['iv_m_lantern',{s:1.3,hm:1.5}]});
 S('湯之里旅館',{vase:['iv_o_vase1',{s:1.3,hm:1.6}],zabu:[['iv_o_cush_r','iv_o_cush_g'],{s:1.1,hm:2,z:-1}],lantern:['iv_m_lantern',{s:1.3,hm:1.5}]});
 S('岩之湯',{opool:['iv_o_pool',{s:1,hm:1.25}],cedar:['iv_o_cedar',{s:1.05,hm:1.4}],sauna:['iv_o_sauna2',{s:1,hm:1.2}],washb:['iv_o_wash',{s:1,hm:2.6}],stoolb:['iv_o_stool',{s:1.1,hm:1.6}],bucket:['iv_o_btl',{s:1.2,hm:2}]});
 S('山莊食堂',{counter:['iv_m_counter',{s:1,hm:2}],pot:[['iv_m_pot','iv_m_pot2'],{s:.9,hm:1.3,z:1}],menu:['iv_m_menu',{s:.8,hm:2.1}],lantern:['iv_m_lantern',{s:1.3,hm:1.5}]});
 // 額外擺設 [素材, 中心x, 底部y, 寬, 阻擋]
 const X={
  '健身房':[['iv_g_rack_s',248,104,30,1],['iv_g_bag_o',324,168,17,1]],
  '碳佐麻里':[['iv_t_wine_fr',160,72,46,1],['iv_t_wine_ot',214,72,46,1]],
  '遊藝場':[['iv_a_coin_y',436,182,20,1],['iv_a_vend1',462,232,22,1],['iv_a_stool',242,196,11,0],['iv_a_stool',318,196,11,0],['iv_a_stool',392,196,11,0]],
  '城光復興堂':[['iv_h_pray',176,374,18,1],['iv_h_pray',204,374,18,1],['iv_h_pray',232,374,18,1],['iv_h_pray_o',258,380,18,1],['iv_h_stove',590,312,0,0]],
  '咖啡店':[['iv_f_shelf',340,88,30,1]],
  '火車站':[['iv_s_mach_b',300,170,12,1],['iv_s_mach_y',316,170,12,1]],
  '溫泉鄉站':[['iv_s_mach_g',300,172,12,1]],
  '岩之湯':[['iv_o_noren_b',192,52,22,0],['iv_o_noren_r',316,52,22,0],['iv_o_btl2',126,170,12,0],['iv_o_stool2',96,182,10,0]],
  '湯之里旅館':[['iv_o_vase2',156,70,18,1]],
  '山莊食堂':[['iv_o_noren_w',316,58,32,0],['iv_o_lowt',120,214,40,1]]
 };
 for(const n in X){const d=IN[n];if(!d||!d.fur)continue;X[n].forEach(q=>{if(!q[3])return;d.fur.push(['uax',q[1]-q[3]/2,q[2]-8,q[3],8,q[0],q[4]])})}
 // 電影院：大銀幕改放經典畫面（每次進場隨機換片）
 const C=IN['電影院'];if(C){const M=[];for(let i=0;i<15;i++)M.push('iv_c_mov'+i);
  C.fur.forEach(f=>{if(f[0]=='screen'){f[2]=24;f[4]=48}});
  C.fur.filter(f=>f[0]=='screen').forEach(f=>C.fur.push(['uaf',f[1]+2,f[2]+2,f[3]-4,f[4]-4,M,0,{cover:1,cy:.45}]));
  const o=C.onEnter;C.onEnter=rm=>{try{rm.cv=renderRm(rm,'電影院')}catch(e){}o&&o(rm)}}
})();
