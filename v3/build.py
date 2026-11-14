import re,sys
bk=open('/home/claude/backup-v9.html',encoding='utf8').read().split('\n')
def L(a,b): return '\n'.join(bk[a-1:b])
def rep(s,old,new,cnt=1):
    assert s.count(old)>=1,('missing',old[:60])
    return s.replace(old,new)
head=L(1,43)
head=rep(head,'<title>Allen 的像素小鎮 v2</title>','<title>Allen 的像素小鎮 v3</title>')
head=head.replace('<body>','<body><div id="bootLoad" style="position:fixed;inset:0;z-index:2147483000;background:#070614;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;color:#ffd36e;font:bold 18px sans-serif;letter-spacing:3px"><div style="font-size:40px;animation:blPulse 1.2s ease-in-out infinite">♥</div><div>LOADING <span id="bootPct">0</span>%</div><div id="bootTip" style="font:13px sans-serif;letter-spacing:1px;color:#cbb8e8;text-align:center;line-height:1.7;padding:0 24px">🎁 禮物準備中……<br>第一次打開要下載比較多圖片，大約 30 秒～1 分鐘<br>建議連 Wi-Fi，請不要關掉畫面喔</div><div style="width:min(70vw,360px);height:14px;border:2px solid #ffd36e;border-radius:8px;padding:2px;box-sizing:border-box;background:#1a1230"><div id="bootBar" style="height:100%;width:0%;border-radius:5px;background:linear-gradient(90deg,#ff8fb1,#ffd36e);transition:width .25s"></div></div><style>@keyframes blPulse{0%,100%{transform:scale(1);opacity:.7}50%{transform:scale(1.25);opacity:1}}</style><script>(function(){var v=0,done=false,fl=0;window.bootDone=function(){done=true};window.bootProg=function(f){fl=Math.max(fl,f)};var t=setInterval(function(){var b=document.getElementById("bootBar"),n=document.getElementById("bootPct");if(!b){clearInterval(t);return}if(done){v=Math.min(100,v+6)}else{var cap=fl>0?Math.min(99,30+fl*69):(window.__bf==null?30:Math.max(3,window.__bf*30));v=Math.max(v,Math.min(cap,v+Math.max(.15,(cap-v)*.06)))}var r=Math.min(100,Math.floor(v));b.style.width=r+"%";n.textContent=r;if(r>=100){clearInterval(t);var L=document.getElementById("bootLoad");setTimeout(function(){if(L){L.style.transition="opacity .6s";L.style.opacity="0";setTimeout(function(){L.remove()},650)}},250)}},80)})()</script></div>',1)
import re as _re
head=_re.sub(r'<div id="pad".*?</div>\n(?=\s*\n?<script>|\s*<script>)',open('/home/claude/v3/pad.html',encoding='utf8').read(),head,flags=_re.S)
head=head.replace('#pad button{touch-action:none}\n@media (hover:hover) and (pointer:fine){#pad{display:none!important}}',open('/home/claude/v3/pad.css',encoding='utf8').read()+open('/home/claude/v3/ui.css',encoding='utf8').read())
import glob as _gl,os as _os
_pl=''.join('<link rel="preload" as="script" href="pk/d%s.js">'%_os.path.basename(f)[1:-3] for f in sorted(_gl.glob('/home/claude/v3/pk/p*.webp')))
head=head.replace('</head>','<script>'+open('/home/claude/v3/early.js',encoding='utf8').read()+'</script></head>',1)
head=head.replace('</head>','<link rel="preload" as="script" href="pk/pk_index.js">'+_pl+'</head>',1)
assert 'id="zl"' in head and '.knob' in head
parts=[]
rd=lambda f:open('/home/claude/v3/'+f,encoding='utf8').read()
parts.append(rd('f00_core.js'))
parts.append(rd('assets.js'))
parts.append(rd('f01_pixel.js'))
parts.append(rd('f01b_tex.js'))
for f in ['f02_world.js','f025_ground.js','f03_facades.js','f04_decor.js','f04b_garden.js','f05_chars.js','f05c_sprites.js','f05b_animals.js','f06_vehicles.js','f06b_cars.js','f07_npc.js','f08_interior.js']:
    t=rd(f)
    if f=='f03_facades.js':
        i=t.index('function drawB(b)');t=t[:i]+rd('f03b_styles2.js')+'\n'+rd('f03c_stalls.js')+'\n'+rd('f23d_fine_art.js')+'\n'+rd('f24a_ua_build.js')+'\n'+t[i:]
    parts.append(t)
b1=L(103,125)
b1=rep(b1,"  if(z.n=='雜貨店')return openShop();\n  if(z.n=='家')return openHome();\n",'')
parts.append(b1)
b2=L(288,304)+'\n'+L(306,329)
b2=rep(b2,'const CAM={x:0,y:0},qp=','const qp=')
b2=rep(b2,'你與小花攜手、','你與${st.partner}攜手、');b2=rep(b2,'你與小花相守','你與${st.partner}相守');b2=rep(b2,'let d=fx[k];','let d=fx[k];if(k==\'s\'&&d<0)d=d*(1-Math.min(.4,(st.endu||0)/250));')
b2=rep(b2,'g:\'村長老李\'','g:\'里長阿榮\'')
b2=rep(b2,'「我想看到有人在鎮上闖出名堂','「我想看到有人在鎮上闖出名堂')
b2=rep(b2,'去雜貨店領養一隻貓或狗','去便利商店領養一隻貓或狗')
b2=rep(b2,"到雜貨店領養","到便利商店領養")
b2=rep(b2,"if(n.t){fxApply({j:2});hud();return toast(n.t=='dog'?'🐶 旺！旺財開心地搖著尾巴。':'🐱 喵～咪咪蹭了蹭你的腳。')}","if(n.t)return petTalk(n);")
b2=rep(b2,"if(n.n=='農夫伯')return farmerMenu(n,line);","if(n.fr)return frTalk(n);if(n.rent)return rentTalk(n);if(n.cop)return talkCop(n);if(n.n=='農夫伯')return farmerMenu(n,line);if(n.n=='牧場阿姨')return shopDlg('🎁 牧場阿姨・農場特產',SHOP.禮品屋,[['💬 聊聊天','',()=>openDlg('💬 牧場阿姨',line,[['返回','',cancel]],true)]]);")
parts.append(b2)
b3=L(386,388)+'\n'+L(396,417)+'\n'+L(423,423)
b3=rep(b3,"['🎒 背包（B）','',()=>{closeDlg();openBag()}],","['🎒 背包（B）','',()=>{closeDlg();openBag()}],['👥 人際關係','',()=>friendsMenu()],['👕 裝備','',()=>openEquip()],['🐾 我的寵物','',()=>petMenu()],['🚨 公共安全','',()=>safetyMenu()],")
b3=rep(b3,'const c=dlgStack.pop();openDlg(c[0],c[1],c[2])','const c=dlgStack.pop();openDlg(c[0],c[1],c[2],0,c[3])')
b3=rep(b3,'function cancel(){','function cancel(){if(MG)return quitGame();')
b3=rep(b3,"if(SHOP[b])o.push(","if(SP[b])SP[b](b).forEach(x=>o.push(x));if(SHOP[b])o.push(")
b3=rep(b3,"openDlg(I[b]+' '+b+'・櫃檯','請問需要什麼服務？',o)","openDlg(I[b]+' '+b+'・櫃檯',b=='銀行'?`存款餘額 🏦${st.bank}　身上現金 💰${st.money}`:'請問需要什麼服務？',o)")
b3=rep(b3,"進建築：走到門口；出口在室內下方","走到建築南側門口，會詢問是否進入<br>M：小鎮地圖　B：背包<br>室內出口在畫面下方")
b3=rep(b3,"['關閉','',closeDlg]])}","['🗺️ 小鎮地圖（M）','',()=>{if(scene)return toast('室內沒有地圖');cityMap()}],['關閉','',closeDlg]])}")
b3=b3.replace("openDlg(I[b]+' '+b+'・櫃檯'","openDlg(I[b]+' '+(b=='咖啡店'?'願你平安咖啡廳':b)+'・櫃檯'")
parts.append(b3)
b4=L(424,507)
b4=rep(b4,'st.inv.knife','st.inv.glove')
parts.append(b4)
b6=L(646,673)
b6=rep(b6,'const erTxt=()=>{','const erTxt0=()=>{')
b6+="\nconst sideTxt=()=>typeof st!='undefined'&&st.cafe==2?`<div class=\"mt-1 text-amber-200\">🧸 陪仰恩玩一整天（${st.cafeN}/5）</div>`:st.cafe==1?'<div class=\"mt-1 text-amber-200\">☕ 保羅想請你陪仰恩玩一天（找保羅）</div>':'';const erTxt=()=>erTxt0()+sideTxt();"
parts.append(b6)
b5=L(726,745)+'\n'+L(747,750)
b5=rep(b5,"o.push([it.u=='keep'?'（自動生效，無需使用）':'使用／食用',it.d,()=>useItem(k),it.u=='keep']);","if(it.u=='equip')o.push([eqOn(k)?'👕 脫下':'👕 穿上',it.d,()=>{toggleEquip(k);closeDlg();openBag()}]);else o.push([it.u=='keep'?'（自動生效，無需使用）':'使用／食用',it.d,()=>useItem(k),it.u=='keep']);")
b5=rep(b5,"o.push([`出售 1 個（💰${sp}）`,cs?'':'需在商店內或行商阿福旁邊'","const lk=eqOn(k)&&n<=1;o.push([`出售 1 個（💰${sp}）`,lk?'穿戴中，請先脫下':cs?'':'需在商店內或行商阿福旁邊'")
b5=rep(b5,"st.inv[k]--;gain(sp);hud();toast(`賣出 ${it.n} 💰+${sp}`);closeDlg();openBag()},!cs]);","st.inv[k]--;gain(sp);hud();toast(`賣出 ${it.n} 💰+${sp}`);closeDlg();openBag()},!cs||lk]);")
b5=rep(b5,"if(n>1)o.push([`全部出售（💰${sp*n}）`,'',()=>{st.inv[k]=0;gain(sp*n);hud();toast(`賣出 ${it.n}×${n} 💰+${sp*n}`);closeDlg();openBag()},!cs]);","if(n>1&&!eqOn(k))o.push([`全部出售（💰${sp*n}）`,'',()=>{st.inv[k]=0;gain(sp*n);hud();toast(`賣出 ${it.n}×${n} 💰+${sp*n}`);closeDlg();openBag()},!cs]);")
b5=rep(b5,"[['food',15],['rose',22]]","[['food',120],['rose',45]]")
b5=rep(b5,"o.push(['丟棄 1 個','',()=>{st.inv[k]--;","o.push(['丟棄 1 個','',()=>{if(eqOn(k)&&n<=1)return toast('穿戴中，請先脫下');st.inv[k]--;")
parts.append(b5)
parts.append(L(810,818))
parts.append(rd('f10_logic.js'))
for f in ['f13_ui.js','f13b_pets.js','f12_systems.js','f12b_furn.js','f12c_rooms.js','f12d_games.js','f12e_safety.js','f14_home.js','f14b_cafe.js','f15_friends.js','f15b_church.js','f15c_cinema_gym.js','f15d_assets.js','f16_brands.js','f17_dialogue.js','f17a_dlg_world.js','f17b_dlg_town.js','f17c_dlg_friends.js','f17d_dlg_generic.js','f17e_dlg_common.js','f17f_ai_chat.js','f18a_furn_art.js','f18_decor.js','f19_save.js','f20_ride.js','f21a_onsen_art.js','f21b_onsen_world.js','f22_fixes1.js','f22b_market.js','f22c_bey.js','f22d_verses.js','f22e_church2.js','f23a_bubbles.js','f23b_school.js','f23c_grill.js','f23e_social.js','f23f_mtn_polish.js','f23g_title.js','f23h_zhuyang.js','f24b_ua_world.js','f24c_npc_mem.js','f24d_ua_int.js','f24e_shops.js','f24f_allen.js','f24g_npcs.js','f24h_crowd.js','f24i_mem.js','f25a_fixes.js','f25b_deep.js','f25c_bey2.js','f26_weekend.js','f26b_economy.js','f26c_life.js','f26d_story.js','f26f_famimg.js','f26e_family.js','f26g_bokai.js','f26h_bday.js','f26i_bbq.js','f26j_mybday.js','f26k_party.js','f27_layout.js','f27b_temple.js','f27c_sports.js','f28_art.js','f28b_npc8.js','f29_layers.js','f30_veh.js','f31_loan.js','f31_int.js','f32_land.js','f33_editor.js','f33b_edui.js','f33c_indoor.js','f34_home.js','f34b_floors.js','f35_pk.js','f36_hide.js','f37_photos.js','f38_phase1.js','f39_phase2.js','f40_events.js','f41_build.js','f42_dex.js','f43_food.js','f44_fish.js','f45_fixes.js','f46_world2.js','f47_fix95.js','f48_furn.js','f49_views.js','f50_reno.js','f51_life.js','f52_shop2.js','f53_more.js','f54_wife.js','f55_pets.js','f56_5f.js','f57_mini.js','f58_art.js','f59_boxing.js','f60_art3.js','f61_art4.js','f62_games.js','f63_art5.js','f64_price.js','f65_room.js','f66_vr.js','f67_lao8.js','f68_tree.js','f69_vrart.js','f70_ch2.js','f71_bal.js','f72_ch3.js','f73_font.js','f74_names.js','f75_run.js','f76_keys.js','f77_world.js','f78_beastart.js','f79_beasts.js','f80_seaimg.js','f81_inv.js','f82_druid.js','f83_merc.js','f84_zheliang.js','f85_lines.js','f86_swim.js','f87_nerf.js','f88_court.js','f89_hud.js','f90_travel.js','f91_grow.js','f92_oldhouse.js','f94_memimg.js','f93_prologue.js','f95_memories.js','f96_fix13.js','f96b_lines.js','f97_arcade.js','f98_kart.js','f99_pro2.js','f99b_view.js','f99c_fix14.js','f99d_gift2.js','f99e_fix15.js','f99f_edlayer.js','f99g_animals.js','f99h_crisp.js','f99i_farm.js','f99j_floor.js','f99k_alley.js','f99l_title.js','f99m_bgm.js','f99n_fix16.js','f99o_findbike.js','f99p_solids.js','f99q_spots.js','f99r_boards.js','f99s_cheat.js','f99t_house.js','f99u_garden.js','f99v_coach.js','f99w_north.js','f99x_fix17.js','f99y_park.js','f99z_chores.js','f99zb_fix18.js','f99zc_chores2.js','f99zd_walk.js','f99ze_ride.js','f99zf_fix19.js','f99zg_fix20.js','f99zh_rot.js','f99zi_signal.js','f99zj_lake.js','f99zk_letter.js','f99zl_fast.js','f99zm_boyang.js']:
    import os
    if os.path.exists('/home/claude/v3/'+f): parts.append(rd(f))
parts.append(rd('f11_loop.js'))
tail="""cv.tabIndex=0;addEventListener('pointerdown',()=>{try{window.focus();cv.focus({preventScroll:true})}catch(e){}});try{window.focus()}catch(e){}
try{worldLayout()}catch(e){console.error(e)}
try{pixelS()}catch(e){console.error(e)}
try{uaPaint()}catch(e){console.error(e)}
try{buildBOV()}catch(e){console.error(e)}
hud();tm();requestAnimationFrame(frame);
toast('走到建築南側門口會詢問是否進入　M：小鎮地圖　空白鍵：互動');
</script>
</body>
</html>"""
out=head+'\n'+'\n'.join(parts)+'\n'+tail
_i=out.rindex('<script>',0,out.index('const W=window.__GW'))
out=out[:_i]+'<script id="GAMEJS" type="text/x-game">'+out[_i+8:]
_ld='<script src="pk/pk_index.js"></script><script>'+rd('ua_data.js')+rd('ua_data2.js')+rd('ua_data3.js')+rd('ua_data4.js')+rd('ua_data5.js')+rd('ua_data6.js')+rd('ua_data7.js')+rd('ua_data8.js')+rd('ua_data9.js')+rd('ua_data10.js')+rd('ua_data11.js')+rd('ua_data12.js')+'''
window.UAI={};(function(){const go=()=>{if(window.__GO)return;window.__GO=1;const s=document.createElement('script');s.textContent=document.getElementById('GAMEJS').textContent;document.body.appendChild(s)};
const ps=Object.keys(UA).map(k=>{const im=new Image();im.src=UA[k];UAI[k]=im;return (im.decode?im.decode():new Promise(r=>{im.onload=r})).catch(()=>{})});
window.PKA={};window.PKD=window.PKD||{};if(window.PKIDX)for(const sid in PKIDX){const im=new Image();PKA[sid]=im;ps.push(new Promise(res=>{const sc=document.createElement('script');sc.src='pk/d'+sid+'.js';sc.onload=()=>{if(PKD[sid]){im.src=PKD[sid];delete PKD[sid];(im.decode?im.decode():new Promise(r=>{im.onload=r;im.onerror=r})).catch(()=>{}).then(res)}else res()};sc.onerror=()=>res();document.head.appendChild(sc)}))}
{let nd=0;const N=ps.length;ps.forEach(p=>p.then(()=>{nd++;try{bootProg(nd/N)}catch(e){}}))}Promise.all(ps).then(go);setTimeout(go,45000)})();
</script>'''
_j=out.rindex('</body>')
out=out[:_j]+_ld+'\n'+out[_j:]
open('/home/claude/v3/out.html','w',encoding='utf8').write(out)
js=out.split('<script>',2)[2].rsplit('</script>',1)[0] if out.count('<script>')>1 else ''
_g=out.index('<script id="GAMEJS" type="text/x-game">')+len('<script id="GAMEJS" type="text/x-game">');open('/home/claude/v3/out.js','w',encoding='utf8').write(out[_g:out.index('</script>',_g)])
print(len(out))

import os
# v9.4 圖集改成 data URI 的 JS 檔（避免跨網域圖片讓畫布被汙染，素材畫不出來）
import base64,glob
for f in sorted(glob.glob('/home/claude/v3/pk/p*.webp')):
    sid=os.path.basename(f)[1:-5]
    open('/home/claude/v3/pk/d%s.js'%sid,'w').write("(window.PKD=window.PKD||{})['%s']='data:image/webp;base64,%s';"%(sid,base64.b64encode(open(f,'rb').read()).decode()))
