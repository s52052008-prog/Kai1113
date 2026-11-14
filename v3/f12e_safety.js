/* ===== v3：公共安全防護網（110 警察・119 消防／救護・拘留所・治安指數）===== */
Object.assign(I,{消防局:'🚒',城光復興堂:'⛪',遊藝場:'🕹️',寵物店:'🐾',服飾店:'👗'});
IT.extg={n:'滅火器',i:'🧯',p:50,d:'火警現場使用，可立即撲滅小型火勢（用掉一支）。',u:'keep'};PR.extg=120;
IT.kit={n:'急救包',i:'🩹',p:30,d:'遇到昏倒的人時可提高急救成功率。',u:'keep'};PR.kit=80;
SHOP['消防局']=['extg','kit'];if(SHOP['診所'])SHOP['診所'].push('kit');
st.safe=62;st.det=[];st.drill=-99;st.sv={rep:0,arrest:0,fire:0,aid:0,fail:0};
const INCT={fire:{ic:'🔥',n:'火警',tel:'119'},theft:{ic:'🕵️',n:'竊盜現行犯',tel:'110'},medical:{ic:'🚑',n:'有人昏倒',tel:'119'},brawl:{ic:'👊',n:'街頭鬥毆',tel:'110'}};
let INC=null,RESP=[],incCool=170,incAcc=0;st.burn={};
const dayIdx=()=>(T.year-1)*30+T.day,burnLeft=b=>Math.max(0,(st.burn&&st.burn[b.n]||0)-dayIdx());
const stnB=n=>B.find(b=>b.n==n);
const incSites=()=>B.filter(b=>!['家','公寓','農田','消防局','派出所'].includes(b.n)&&(b.bot==262||b.bot==640)&&Z.some(z=>z.b===b));
function mkResp(k,x,y,w){const d=VK[k],v={k,col:k=='truck'?'#d9302a':'#f4f6f8',ax:'x',dir:1,hold:0,br:0,rc:'#2f80ed',hc:'#d33',bx:0,pax:0,LL:d.L,TT:d.T,x:0,y:0,w:d.L,h:d.T,cx:x,cy:y,wp:w.slice(),wi:0,spd:0,state:'go',siren:1};respPos(v);return v}
function respPos(v){const X=v.ax=='x';v.LL=X?VK[v.k].L:VK[v.k].Lv;v.w=X?v.LL:v.TT;v.h=X?v.TT:v.LL;v.x=v.cx-v.w/2;v.y=v.cy-v.h/2}
function routeTo(stn,tx,ty){const z=Z.find(z=>z.b===stn),sx=z.x+z.w/2,sy=stn.bot+30,pts=[[sx,sy]];
 const east=tx>sx,laneY=east?381.5:358.5;
 if(ty<420){pts.push([sx,laneY],[tx,laneY])}
 else{const vx=Math.abs(tx-740)<Math.abs(tx-1256)?728.5:1242;pts.push([sx,laneY],[vx,laneY]);const e2=tx>vx;pts.push([vx,e2?760:732],[tx,e2?760:732])}
 return pts}
function dispatchTo(){const inc=INC;if(!inc||inc.disp)return;inc.disp=1;inc.dt=0;
 const types=inc.k=='fire'?[['消防局','truck'],['派出所','police']]:inc.k=='medical'?[['消防局','van']]:[['派出所','police']];
 if(inc.k=='brawl')types.push(['派出所','police']);
 inc.pend=types}
function spawnResp(){const inc=INC;inc.pend.forEach(([sn,k],i)=>{const stn=stnB(sn),r=routeTo(stn,inc.tx+(i*34),inc.ty),v=mkResp(k,r[0][0],r[0][1],r.slice(1));v.stn=stn;v.route=r;v.off=i;RESP.push(v)});inc.pend=null;toast('🚨 '+(inc.k=='fire'?'消防車':inc.k=='medical'?'救護車':'警車')+'已出動，鳴笛趕往現場！')}
function newInc(){const s=incSites(),b=s[(Math.random()*s.length)|0],z=Z.find(z=>z.b===b),r=Math.random(),k=r<.12?'fire':r<.45?'theft':r<.75?'medical':'brawl',g=genLook(k=='theft'?'default':'office',(Math.random()*9999)|0),g2=genLook('student',(Math.random()*9999)|0);
 const tx=z.x+z.w/2,ty=b.bot+(b.bot==262?30:28);
 INC={k,b,tx,ty,t:0,rep:0,disp:0,pend:null,st:'new',lk:g.lk,lk2:g2.lk,nm:g.name,held:0,th:{x:tx-6,y:ty-6,dir:3,fr:0,mv:true,vx:46},prog:0,res:0,fade:0,ac:0};
 INC.crowd=mkCrowd(INC);const n=INCT[k];toast(`${n.ic} 緊急狀況：「${b.sg||b.n}」附近${n.n}！走過去看看，或到選單🚨打 ${n.tel}`)}
function mkCrowd(i){const b=i.b,c=[],roles=['default','student','elder','office','default'],mk=(x,y,dir)=>c.push({x,y,dir,lk:genLook(roles[(Math.random()*5)|0],(Math.random()*9999)|0).lk,ph:Math.random()*6,k:0});
 if(i.k=='fire'){for(let x=b.x-6;x<=b.x+b.w+6;x+=15)if(Math.random()<.85)mk(x+Math.random()*4,b.bot+48,1);for(let x=b.x+4;x<=b.x+b.w-4;x+=24)if(Math.random()<.7)mk(x+Math.random()*6,b.bot+62,1);mk(b.x-22,b.bot+30,3);mk(b.x+b.w+22,b.bot+30,2)}
 else{const o=[[-46,8,3],[46,8,2],[-30,28,1],[30,28,1],[-66,22,3],[66,22,2]],n=i.k=='theft'?3:i.k=='brawl'?5:4;o.slice(0,n).forEach(q=>mk(i.tx+q[0]+Math.random()*6,i.ty+q[1],q[2]))}
 return c}
function fireBlk(){const i=INC;if(!i||i.k!='fire'||i.fade||i.st=='ok'||i.st=='fail')return false;const b=i.b,r={x:b.x-24,y:b.bot-6,w:b.w+48,h:46};return hit(p,r)}
function sendBack(){RESP.forEach(v=>{if(v.state=='gone')return;const rt=v.route,idx=Math.max(1,Math.min(v.wi,rt.length-1));v.wp=rt.slice(0,idx).reverse();v.wi=0;v.state='back';v.hold=0})}
function autoRepDelay(){return Math.max(22,72-st.safe*.5)}
function reportInc(by){const i=INC;if(!i||i.rep)return;i.rep=by||1;i.rt=i.t;toast(`📞 已撥打 ${INCT[i.k].tel}，勤務中心受理，派遣出動中…`);dispatchTo();if(by==1){st.sv.rep++;fxApply({r:1})}}
function endInc(ok,msg,bonus){const i=INC;if(!i)return;if(i.k=='fire'){st.burn[i.b.n]=dayIdx()+3;msg+='<br>🏚️ 建築受損，「'+(i.b.sg||i.b.n)+'」將停業整修 3 天。'}i.st=ok?'ok':'fail';i.fade=0;
 if(ok){const early=i.rep==1?1:0,pay=Math.round(110+Math.random()*90+(bonus||0)+early*60);st.money+=pay;st.safe=Math.min(100,st.safe+(early?5:3));fxApply({r:early?4:2,j:6});st.sv[i.k=='fire'?'fire':i.k=='medical'?'aid':'arrest']++;hud();
  openDlg('✅ 事件處理完成',msg+`<br>🎖️ 里民感謝金 💰+${pay}　治安指數 ${st.safe}`,[['好的','',closeDlg]])}
 else{st.safe=Math.max(0,st.safe-8);fxApply({r:-3,j:-8});st.sv.fail++;hud();toast('⚠️ '+msg+'　治安指數 '+st.safe)}
 setTimeout(()=>{INC=null;incCool=300+Math.random()*240},4000)}
function safetyTick(dt){
 if(!INC){incCool-=dt;if(incCool<=0){incCool=14;const pr=st.safe<40?.3:st.safe>75?.12:.2;if(Math.random()<pr&&T.hour>=6)newInc()}}
 else{const i=INC;if(i.st=='new'||i.st=='hand'){i.t+=dt;i.fade=0}
  if(i.st=='new'){if(!i.rep&&i.t>autoRepDelay()&&!(i.k=='theft'&&i.held&&0)){reportInc(2);toast(i.k=='fire'?'☎️ 鄰居撥打了 119':i.k=='medical'?'☎️ 路人撥打了 119':'☎️ 監視中心／路人已通報 110')}
   if(i.disp&&i.pend){i.dt+=dt;if(i.dt>3)spawnResp()}
   if(i.t>150&&i.st=='new'){endInc(false,i.k=='fire'?'火勢蔓延，建築受損嚴重':i.k=='theft'?'歹徒逃逸無蹤':i.k=='medical'?'傷患延誤送醫':'鬥毆擴大，有人受傷')}
   if(i.k=='theft'&&!i.held){const t=i.th;t.x+=t.vx*dt;if(t.x>i.b.x+i.b.w+30||t.x<i.b.x-30)t.vx*=-1;t.dir=t.vx<0?2:3;t.at=(t.at||0)+dt;if(t.at>.14){t.at=0;t.fr=typeof t.fr=='string'?t.fr:t.fr^1}}
   if(i.k=='fire')i.prog=0}
  if(i.st=='hand'){i.hd-=dt;if(i.k=='fire')i.prog=Math.min(1,1-i.hd/i.hd0);if(i.hd<=0){sendBack();
    endInc(true,i.k=='fire'?'消防隊員撲滅了火勢，無人傷亡。':i.k=='theft'?'警方將嫌犯帶回派出所偵辦。':i.k=='medical'?'救護員將傷患送往醫院。':'員警制止了鬥毆，雙方被帶回調查。',i.k=='fire'?40:0);
    if(i.k=='theft'||i.k=='brawl'){st.det.push({n:i.k=='theft'?i.nm:'兩名鬥毆者',why:i.k=='theft'?'竊盜':'傷害',d:i.k=='theft'?3:2})}}}}
 RESP.forEach(v=>{if(v.state=='go'||v.state=='back'){const tg=v.wp[v.wi];if(!tg){if(v.state=='go'){v.state='arrived';v.spd=0;const i=INC;if(i&&i.st=='new'&&RESP.every(r=>r.state=='arrived'||r.state=='back')){i.st='hand';i.hd=i.hd0=i.k=='fire'?12:9;toast('🚨 救援人員抵達現場，處理中…')}}else{v.state='gone'}return}
   const dx=tg[0]-v.cx,dy=tg[1]-v.cy,d=Math.hypot(dx,dy);const want=(d<30&&v.state=='go'&&v.wi==v.wp.length-1)?70:200;v.spd+=(want-v.spd)*Math.min(1,dt*3);
   if(d<3){v.wi++;return}const m=Math.min(d,v.spd*dt);v.cx+=dx/d*m;v.cy+=dy/d*m;
   if(Math.abs(dx)>=Math.abs(dy)){v.ax='x';v.dir=dx>0?1:-1}else{v.ax='y';v.dir=dy>0?1:-1}respPos(v)}});
 RESP=RESP.filter(v=>v.state!='gone')}
function safetyAct(){const i=INC;if(!i||i.st!='new')return false;const d=Math.hypot(p.x-i.tx,p.y-i.ty);if(d>64)return false;incMenu();return true}
function incMenu(){const i=INC,n=INCT[i.k],o=[];
 if(!i.rep)o.push([`📞 撥打 ${n.tel}（立刻通報）`,'愈早通報，獎勵愈高',()=>{reportInc(1);closeDlg()}]);else o.push(['📞 已通報，等待救援中','',closeDlg,true]);
 if(i.k=='fire')o.push(['🧯 使用滅火器撲滅','需要持有滅火器',()=>{if(!st.inv.extg)return;st.inv.extg--;hud();closeDlg();if(!i.rep)reportInc(1);i.st='hand';i.hd=i.hd0=4;sendBack();toast('🧯 你用滅火器壓制了火勢！')},!(st.inv.extg>0)]);
 if(i.k=='theft')o.push(['🏃 制伏嫌犯','成功率依你的⚔️力量；失敗會受傷',()=>{const nr=Math.hypot(p.x-i.th.x,p.y-i.th.y);closeDlg();if(i.held)return;if(nr>46)return toast('嫌犯跑太遠了，追上去再試試！');if(Math.random()<.35+st.pow/160){i.held=1;i.th.mv=false;toast('💪 你制伏了嫌犯！等警察來帶走。');if(!i.rep)reportInc(1);fxApply({r:3})}else{fxApply({h:-10,j:-4});hud();i.th.vx*=1.4;toast('💥 嫌犯掙脫逃跑了，你受了點傷。')}}]);
 if(i.k=='medical')o.push(['🩹 施行急救（CPR／包紮）',st.inv.kit?'有急救包：成功率高':'沒有急救包：成功率低',()=>{closeDlg();const ok=Math.random()<(st.inv.kit?.9:.5)+st.wis/400;if(st.inv.kit){st.inv.kit--;hud()}if(ok){fxApply({r:4,j:8});if(!i.rep)reportInc(1);i.st='hand';i.hd=i.hd0=3;toast('❤️ 傷患恢復了呼吸！救護人員接手。')}else toast('急救沒能奏效，快打 119！')}]);
 if(i.k=='brawl')o.push(['🗣️ 勸架（需要聲望）','失敗會受傷',()=>{closeDlg();if(Math.random()<.3+st.rep/180){fxApply({r:3,j:5});if(!i.rep)reportInc(1);i.st='hand';i.hd=i.hd0=3;toast('🙏 兩人冷靜下來，等警察了解狀況。')}else{fxApply({h:-8,j:-4});hud();toast('你被誤傷了一拳！趕快報警。')}}]);
 o.push(['離開','',closeDlg]);openDlg(`${n.ic} ${n.n}`,`「${i.b.sg||i.b.n}」門口發生${n.n}！<br>${i.rep?'已有人通報，救援正在趕來。':'目前還沒有人通報，要先報案嗎？'}`,o)}
function safetyDraw(a){const i=INC;
 B.forEach(b=>{if(burnLeft(b)>0)a.push({y:b.bot+1,f:()=>{g.save();g.fillStyle='rgba(18,14,12,.62)';g.fillRect(b.x,b.bot-b.h,b.w,b.h);g.fillStyle='rgba(0,0,0,.35)';for(let k=0;k<7;k++){const sx=b.x+6+k*(b.w-12)/6;g.fillRect(sx,b.bot-b.h,5+(k%3)*3,b.h*(.45+(k*37%5)/10))}
   g.fillStyle='rgba(255,170,60,.18)';g.fillRect(b.x,b.bot-8,b.w,8);g.fillStyle='#e8c21a';g.fillRect(b.x-2,b.bot+4,b.w+4,6);g.fillStyle='#222';for(let x=b.x-2;x<b.x+b.w+2;x+=12)g.fillRect(x,b.bot+4,6,6);
   txt(g,'🚧 火災整修中・剩 '+burnLeft(b)+' 天',b.x+b.w/2,b.bot-b.h/2,'#fff','bold 8px sans-serif');g.restore()}})});
 if(i&&i.crowd){const t0=NOW/1000;i.crowd.forEach(c=>a.push({y:c.y+8,f:()=>drawChar(g,{x:c.x,y:c.y-6,dir:c.dir,mv:false,fr:0,lk:c.lk,ph:t0+c.ph})}));
  if(i.k=='fire'){const b=i.b;a.push({y:b.bot+42,f:()=>{g.save();for(let x=b.x-24;x<b.x+b.w+24;x+=8){g.fillStyle=(x/8|0)%2?'#e8c21a':'#222';g.fillRect(x,b.bot+40,8,2.5)}g.fillStyle='#8a8a90';g.fillRect(b.x-25,b.bot+30,2,13);g.fillRect(b.x+b.w+23,b.bot+30,2,13);txt(g,'🚫 警戒線',b.x+b.w/2,b.bot+38,'#e8c21a','bold 6px sans-serif');g.restore()}})}}

 RESP.forEach(v=>a.push({y:v.y+v.h,f:()=>{drawVeh(g,v);const ph=Math.floor(NOW/140)%2,X=v.ax=='x',cx=v.x+v.w/2,by=v.y+v.h-(X?22.5:28);g.save();
   if(v.k=='van'&&X){g.fillStyle='#e0302a';g.fillRect(cx-3,v.y+v.h-17,6,1.8);g.fillRect(cx-.9,v.y+v.h-19.2,1.8,6)}
   g.globalCompositeOperation='lighter';g.fillStyle=ph?'rgba(255,40,40,.95)':'rgba(60,110,255,.95)';g.beginPath();g.arc(cx-3.2,by,5.5,0,7);g.fill();g.fillStyle=ph?'rgba(60,110,255,.95)':'rgba(255,40,40,.95)';g.beginPath();g.arc(cx+3.2,by,5.5,0,7);g.fill();g.restore()}}));
 if(!i)return;const b=i.b,t=NOW/1000;
 if(i.k=='fire'&&i.fade==0){const amt=1-i.prog;a.push({y:b.bot+4,f:()=>{if(amt<.04)return;g.save();g.globalCompositeOperation='lighter';
   for(let k=0;k<9;k++){const fx=b.x+14+k*(b.w-28)/8,fh=(8+((k*7)%5)*3.5)*amt*(.8+.2*Math.sin(t*9+k)),fy=b.bot-12;const gr=g.createRadialGradient(fx,fy-fh*.4,1,fx,fy-fh*.4,fh*.8+4);gr.addColorStop(0,'rgba(255,240,150,.95)');gr.addColorStop(.45,'rgba(255,130,30,.7)');gr.addColorStop(1,'rgba(255,40,0,0)');g.fillStyle=gr;g.beginPath();g.ellipse(fx,fy-fh*.4,fh*.45+3,fh*.8+4,0,0,7);g.fill()}
   g.restore();g.fillStyle='rgba(60,60,64,.35)';for(let k=0;k<8;k++){const sx=b.x+20+k*(b.w-40)/7+Math.sin(t+k)*5,sy=b.bot-30-((t*14+k*13)%46);g.beginPath();g.arc(sx,sy,5+((t*14+k*13)%46)/9,0,7);g.fill()}
   if(i.st=='hand'){g.strokeStyle='rgba(120,200,255,.7)';g.lineWidth=1.4;RESP.filter(v=>v.k=='truck'&&v.state=='arrived').forEach(v=>{for(let k=0;k<5;k++){g.beginPath();g.moveTo(v.cx,v.cy-14);g.quadraticCurveTo((v.cx+i.tx)/2+Math.sin(t*8+k)*5,v.cy-40,i.tx-30+k*15,b.bot-20);g.stroke()}})}}})}
 else if(i.k=='theft'){const th=i.th;a.push({y:th.y+8,f:()=>{drawChar(g,{x:th.x,y:th.y,dir:th.dir,mv:th.mv,fr:th.fr,lk:i.lk,ph:t,pose:i.held?'':''});txt(g,i.held?'🔒 已制伏':'🕵️ 站住！',th.x+6,th.y-34,'#ffd84a','bold 8px sans-serif')}})}
 else if(i.k=='medical')a.push({y:i.ty+8,f:()=>{drawLying(g,{x:i.tx-8,y:i.ty-4,lk:i.lk,ph:t});if(i.st=='new')txt(g,'🆘',i.tx,i.ty-16,'#ff5a5a','bold 12px sans-serif')}});
 else if(i.k=='brawl'){const ph=Math.sin(t*9)>0;a.push({y:i.ty+8,f:()=>{drawChar(g,{x:i.tx-14,y:i.ty-6,dir:3,mv:false,fr:0,lk:i.lk,ph:t,pose:i.st=='new'?'punch':''});drawChar(g,{x:i.tx+4,y:i.ty-6,dir:2,mv:false,fr:0,lk:i.lk2,ph:t+1.5,pose:i.st=='new'?'punch':''});if(i.st=='new')txt(g,ph?'💢':'💥',i.tx,i.ty-34,'#ff5a5a','bold 12px sans-serif')}})}
 if(i.st=='hand'&&i.k!='fire'){RESP.filter(v=>v.state=='arrived'&&(v.k=='police'||v.k=='van')).forEach((v,ix)=>a.push({y:i.ty+9,f:()=>{drawChar(g,{x:i.tx-28+ix*50,y:i.ty-6,dir:ix?2:3,mv:false,fr:0,lk:genLook(v.k=='van'?'office':'police',77+ix).lk,ph:t})}}))}
 if(i.st=='new')a.push({y:b.bot+60,f:()=>{const bob=Math.sin(t*5)*2;txt(g,INCT[i.k].ic,i.tx,b.bot-b.h*.5-26+bob,'#fff','bold 18px sans-serif');g.save();g.globalAlpha=.4+.3*Math.sin(t*6);g.strokeStyle='#ff4a3a';g.lineWidth=1.6;g.beginPath();g.ellipse(i.tx,i.ty+6,22,9,0,0,7);g.stroke();g.restore()}})}
function safetyHud(){const i=INC;if(!i||scene||i.st!='new')return;const dx=i.tx-(p.x+6),dy=i.ty-(p.y+4),d=Math.hypot(dx,dy);if(d<90)return;
 const a=Math.atan2(dy,dx),cx=W/2,cy=H/2,rr=Math.min(W,H)/2-26,ex=cx+Math.cos(a)*rr*1.45,ey=cy+Math.sin(a)*rr;const x=Math.max(16,Math.min(W-16,ex)),y=Math.max(30,Math.min(H-22,ey));
 g.save();g.translate(x,y);g.fillStyle='rgba(30,10,10,.7)';g.beginPath();g.arc(0,0,13,0,7);g.fill();g.rotate(a);g.fillStyle=Math.floor(NOW/300)%2?'#ff5a4a':'#ffd84a';g.beginPath();g.moveTo(16,0);g.lineTo(9,-5);g.lineTo(9,5);g.fill();g.rotate(-a);g.font='bold 11px sans-serif';g.textAlign='center';g.fillStyle='#fff';g.fillText(INCT[i.k].ic,0,4);g.restore();
 txt(g,Math.round(d/4)+' m',x,y+23,'#fff','bold 7px sans-serif')}
/* ─ 選單與拘留所 ─ */
const safeTxt=s=>s>=80?'🟢 非常安全':s>=60?'🟢 良好':s>=40?'🟡 普通':'🔴 堪憂';
function detDaily(){st.det.forEach(d=>d.d--);const fin=st.det.filter(d=>d.d<=0);if(fin.length)toast('🔓 拘留所：'+fin.map(d=>d.n).join('、')+' 已獲釋');st.det=st.det.filter(d=>d.d>0);st.safe+=st.safe<60?1:st.safe>70?-.5:0;st.safe=Math.max(0,Math.min(100,st.safe))}
const _dt3=dayTick;dayTick=function(){_dt3();detDaily()};
function safetyMenu(){const o=[];
 if(INC&&INC.st=='new'&&!INC.rep)o.push([`📞 立即報案：${INCT[INC.k].ic}${INCT[INC.k].n}（${INCT[INC.k].tel}）`,'目前有未通報的事件',()=>{reportInc(1);closeDlg()}]);
 o.push(['🔒 拘留所名單',st.det.length?st.det.length+' 人在押':'目前沒有人在押',()=>openDlg('🔒 派出所拘留所',st.det.length?st.det.map(d=>`・${d.n}（${d.why}）剩 ${d.d} 天`).join('<br>'):'空蕩蕩的。治安不錯！',[['返回','',cancel]],true)]);
 o.push(['📊 防護網說明','',()=>openDlg('🛡️ 小鎮防護網',`<b>1. 通報</b>：110 警察／119 消防救護，愈早通報獎勵愈高。<br><b>2. 監視與鄰里</b>：治安指數愈高，路人與監視中心通報愈快（現在約 ${Math.round(autoRepDelay())} 秒）。<br><b>3. 出勤</b>：警車、消防車、救護車依道路趕往現場。<br><b>4. 偵辦拘留</b>：嫌犯由派出所拘留，期滿釋放。<br><b>5. 預防</b>：滅火器、急救包、消防宣導與演練能提升治安。`,[['返回','',cancel]],true)]);
 o.push(['關閉','',closeDlg]);
 openDlg('🚨 公共安全',`治安指數：<b>${Math.round(st.safe)}</b>　${safeTxt(st.safe)}<br>累計：報案 ${st.sv.rep}・逮捕 ${st.sv.arrest}・救火 ${st.sv.fire}・救護 ${st.sv.aid}・處理失敗 ${st.sv.fail}`,o)}
const _sp=SP['派出所'];SP['派出所']=b=>[['🔒 拘留所／治安報告','',()=>safetyMenu()],...(_sp?_sp(b):[])];
SP['消防局']=()=>[['🎓 消防宣導講座（1 小時）','🧠+1 ⭐+1 治安+1',()=>{advance(1);fxApply({w:1,r:1,j:2});st.safe=Math.min(100,st.safe+1);hud();toast('🚒 學到了逃生與滅火的基本知識。')}],
 ['🚒 參加消防演練（2 小時・每週一次）','⚡-8 ⭐+2 治安+3',()=>{const wk=Math.floor(((T.year-1)*30+T.day-1)/7);if(st.drill==wk)return toast('這週已經演練過了');st.drill=wk;advance(2);fxApply({s:-8,r:2,j:4});st.safe=Math.min(100,st.safe+3);hud();toast('🧑‍🚒 演練順利完成，大家的防災意識提高了！')},st.sta<8],
 ['📋 公共安全報告','',()=>safetyMenu()]];
/* ─ 消防局室內 ─ */
def('消防局',{W:420,H:250,f:'#cfcbc4',g:'#c4c0b8',fl:'tile',w:'#b8302c',title:'🚒 消防局',
 fur:[['engine',24,38,120,50],['engine',152,38,120,50],['amb',282,40,90,46],['hose',380,40,30,34],['pole',400,100,12,60],['dispatch',20,112,100,34],['rug',150,118,110,60,'#8a8f9c'],['counter',270,150,100,22,'#6a1a1a'],['extinguisher',384,88,14,22],['plant',12,190,16,26],['cross2',200,6,18,18],['board',140,100,0,0]],
 ppl:[pp('消防員 鄭隊長',286,128,'#1b2a4a','#222','火場無情，平常的準備最重要。|滅火器要放在看得到、拿得到的地方。',{lk:{...genLook('police',301).lk,ht:'u',hc:'#f2c230',ou:'r',tp:'#e86a2a',bt:'#2a2a34'},dir:0,still:1}),
  pp('值班員 小周',50,126,'#2a4a8a','#222','119 勤務中心，請說您的位置。|報案要說清楚地點與狀況喔。',{lk:GL('police',302),sit:1,dir:0,still:1,pose:'chat'}),
  pp('消防員',160,150,'#e86a2a','#222','我在檢查水帶和空氣呼吸器。',{lk:{...genLook('worker',303).lk,hc:'#f2c230',tp:'#e86a2a'},dir:2,pose:'lift',still:1}),
  pp('消防員',200,196,'#e86a2a','#222','今天的體能訓練完成了！',{lk:{...genLook('jogger',304).lk,tp:'#e86a2a'},dir:0,pose:'squat',still:1}),
  pp('小朋友',230,176,'#2f80ed','#222','哇！消防車好大！我長大要當消防員！',{lk:GL('kid',305),dir:1,wk:[190,260]})],
 sp:[['main',270,176,100,12]],spl:{main:'消防櫃檯'}});
