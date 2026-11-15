/* v13.49 使用者新畫的 8 位角色：仰恩、笑笑、保羅、柏凱、以倫（新造型）、老八、張博洋、朱哲良
   素材只放 4 方向 × 4 格走路圖＋頭像；其餘（站、坐、動作列）在這裡自動組出來 */
Object.assign(NSPR,{'仰恩':'ye','笑笑':'xx','保羅':'pl','廖柏凱':'bk','柏凱':'bk','黃以倫':'yl2','以倫牧師':'yl2','以倫':'yl2','老八':'l8','張博洋':'by','博洋':'by','朱哲良':'zl','哲良':'zl','小朱':'zl'});
const NPCN2=['ye','xx','pl','bk','yl2','l8','by','zl','w1','w2','w3','w4','w5','w6','a1','a2','a3','a4','a5','f1','f2','f3','f4','f5','f6','f7','k1','k2','k3','k4','m1','m2','m3','m4','u1','u2','u3','u4','u5','y1','y2','y3','y4','b1','b2','b3','s1','s2','s3','j1','j2','j3','j4','j5','q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16','q17','q18','q19','q20','r1','r2','r3'];
// v13.50 六位新路人女生：w1 金髮、w2 綠髮、w3 長馬尾、w4 老奶奶、w5 粉紅運動服、w6 耳罩少女
GF.push('w1','w2','w3','w5','w6','f1','f2','f4','f5','f6','f7');
// v13.51 第二批 20 位路人：a 阿嬤、m 阿公、f 女生/阿姨、k 小女孩
Object.assign(NSPR,{'王伯':'m4','茶行老闆娘':'f2','食堂阿桑':'a2','房東太太':'f5'});
NROLE.splice(NROLE.findIndex(q=>q[2]=='M'),0,[null,/^會友$|^信眾$/,['a1','a3','f1','f2','f4','f5','f6','m1','m2','m3','m4','w4']],[null,/阿姨$|媽媽$|大嬸$/,['f1','f2','f3','a4']],[null,/妹妹$|小女孩$/,['k1','k2','k3','k4']]);
NROLE.forEach(q=>{const t=String(q[1]);if(q[0]=='健身房'&&/健身客/.test(t))q[2]=q[2].concat(['w1','w3','w5']);else if(/阿嬤/.test(t))q[2]=['w4','a1','a2','a3','a5'];else if(/阿公/.test(t))q[2]=['m1','m2','m3','m4'];else if(/小朋友/.test(t))q[2]=['g01','k1','k3','k4','k2'];else if(/同學/.test(t))q[2]=q[2].concat(['f7','f6','k2']);else if(/張阿姨|清潔/.test(t))q[2]='f3';else if(q[0]=='遊藝場'&&/少女/.test(t))q[2]=['g26','w6']});
function npc2Sheet(code){const wk=code+'_walk4';if(!uaOK(wk))return undefined;const im=UAI[wk],FW=64,FH=128,cv=document.createElement('canvas');cv.width=FW*6;cv.height=FH*10;const x=cv.getContext('2d');x.imageSmoothingEnabled=false;
 const cell=(r,c,dc,dr)=>x.drawImage(im,c*FW,r*FH,FW,FH,dc*FW,dr*FH,FW,FH);
 for(let r=0;r<4;r++){[0,1,2,3,0,1].forEach((c,i)=>cell(r,c,i,r));for(let i=0;i<6;i++)cell(r,1,i,r+4)}
 for(let i=0;i<6;i++)cell(0,1,i,9);
 // 坐姿：上半身往下移、腿縮短
 const sit=(r,dc)=>{const t=document.createElement('canvas');t.width=FW;t.height=FH;const q=t.getContext('2d',{willReadFrequently:true});q.drawImage(im,1*FW,r*FH,FW,FH,0,0,FW,FH);const d=q.getImageData(0,0,FW,FH).data;let top=FH,bt=0;for(let y=0;y<FH;y++)for(let xx=0;xx<FW;xx++)if(d[(y*FW+xx)*4+3]>0){top=Math.min(top,y);bt=Math.max(bt,y)}
  const hip=Math.round(top+(bt-top)*.62),dd=Math.round((bt-hip)*.45);x.drawImage(t,0,0,FW,hip,dc*FW,8*FH+dd,FW,hip);x.drawImage(t,0,hip,FW,bt+1-hip,dc*FW,8*FH+hip+dd,FW,Math.max(1,bt+1-hip-dd))};
 sit(0,0);sit(3,1);
 cv.complete=true;cv.naturalWidth=cv.width;cv.naturalHeight=cv.height;return cv}
// 省記憶體：不再為每個角色另做一張大 sheet 畫布（80 多張會超過 iPhone 的畫布記憶體上限），直接從走路圖畫
const NPC2SET=new Set(),NPC2SIT={};
function npc2All(){NPCN2.forEach(c=>{if(!uaOK(c+'_walk4'))return;NPC2SET.add(c);const k=c+'_sheet';if(UAI[k]!==UAI[c+'_walk4'])UAI[k]=UAI[c+'_walk4'];NPOSE[k]={wave:[0],sing:[0],pray:[0],clap:[0],hug:[0],heart:[0],guitar:[0],lift:[0]}})}
function npc2SitInfo(c,r){const key=c+r;if(NPC2SIT[key])return NPC2SIT[key];const im=UAI[c+'_walk4'],FW=64,FH=128,t=document.createElement('canvas');t.width=FW;t.height=FH;const q=t.getContext('2d',{willReadFrequently:true});q.drawImage(im,FW,r*FH,FW,FH,0,0,FW,FH);
 const d=q.getImageData(0,0,FW,FH).data;let top=FH,bt=0;for(let y=0;y<FH;y++)for(let x=0;x<FW;x++)if(d[(y*FW+x)*4+3]>0){if(y<top)top=y;if(y>bt)bt=y}t.width=t.height=0;
 const hip=Math.round(top+(bt-top)*.62),dd=Math.round((bt-hip)*.45);return NPC2SIT[key]={hip,dd,bt}}
{const _ad=alDraw;alDraw=function(c,o,key){const code=key&&key.endsWith('_sheet')?key.slice(0,-6):null;if(!code||!NPC2SET.has(code))return _ad.apply(this,arguments);
 const im=UAI[code+'_walk4'];if(!uaOK(code+'_walk4'))return false;const dr=(o.dir|0)%8,dm=CHDIR[dr],ph=o.ph||0,ps=o.pose||'',sit=o.sit,FW=ALS.fw,FH=ALS.fh;
 const s=ALS.H/105,dw=FW*s,dh=FH*s;let row,col=1,flip=false,sitR=-1;
 if(ps&&ps!='preach'&&NPOSE[key]&&NPOSE[key][ps]&&!o.mv){row=0;col=1}
 else if(sit){if(dm==0)sitR=3;else if(dm==2){sitR=3;flip=true}else sitR=0}
 else if(o.mv){row=AL_WALK[dm];col=[0,1,2,3,0,1][((Math.floor(ph*10))%6+6)%6]}
 else{row=AL_WALK[dm];col=1}
 let by=0;if(ps=='lift')by=-Math.abs(Math.sin(ph*2))*1.5;
 c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8)+by);
 c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(0,0,sit?7:6.6,sit?2.2:2.4,0,0,7);c.fill();
 c.imageSmoothingEnabled=false;if(flip)c.scale(-1,1);const X=-dw/2,Y=-ALS.foot*s;
 if(sitR>=0){const S=npc2SitInfo(code,sitR),sy=sitR*FH;c.drawImage(im,FW,sy,FW,S.hip,X,Y+S.dd*s,dw,S.hip*s);const lh=S.bt+1-S.hip;c.drawImage(im,FW,sy+S.hip,FW,lh,X,Y+(S.hip+S.dd)*s,dw,Math.max(1,lh-S.dd)*s)}
 else c.drawImage(im,col*FW,row*FH,FW,FH,X,Y,dw,dh);
 c.restore();return true}}
npc2All();setTimeout(npc2All,1500);setTimeout(npc2All,5000);

// v13.52 第三批 20 位：u 大叔、y 年輕男生、b 小男孩、s 軍人、j 職業女性
GM.push('u1','u2','u3','u4','u5','y1','y2','y3');GF.push('j2');
Object.assign(NSPR,{'咖啡師':'j1','廚師':'j5','上班族':'u4','下班的上班族':'y3','營長':'s3','衛兵':'s1','阿兵哥':'s2','士兵':'s2'});
NROLE.forEach(q=>{const t=String(q[1]);
 if(/小朋友/.test(t))q[2]=q[2].concat(['b1','b2']);
 else if(/同學/.test(t))q[2]=q[2].concat(['y4','b3']);
 else if(/黑手學徒/.test(t))q[2]=['g19','j3'];
 else if(/站務員/.test(t))q[2]=['g27','j4'];
 else if(/領位員\|燒肉職人/.test(t))q[2]=['g16','j5'];});
NROLE.splice(NROLE.findIndex(q=>q[2]=='M'),0,[null,/^旅客$/,GM.concat(GF,['s2','s2','s3','s1'])],[null,/^少年$/,['y1','y2','y3','y4','b3','g11','g24']],[null,/叔叔$|大叔$|伯伯$/,['u1','u2','u3','u4','u5']]);

// v13.53 第四批 20 位：職業制服
GM.push('q7','q11','q13','q15','q20');GF.push('q1','q2');
Object.assign(NSPR,{'農夫伯':'q19','釣客 老林':'q12','釣客':'q12','老闆 阿財':'q18','教練 阿凱':'q6','郵差':'q20','外送員':'q15','保全':'q8','警衛':'q8','麵包師傅':'q13','園丁':'q11','水電工':'q7','機長':'q9','咖啡師':'q16'});GF.push('j1');GM.push('q10','q16');
NROLE.forEach(q=>{if(q[0]=='碳佐麻里'&&/領位員/.test(String(q[1])))q[2]=['g16','j5','q10']});
{const _r=nsRole;nsRole=function(nm,ob){if(ob&&ob._sp!==undefined)return ob._sp;const sc=typeof scene!='undefined'?scene:null;
 if(sc=='餐廳'&&nm=='老闆'){if(ob)ob._sp='q10';return 'q10'}return _r.apply(this,arguments)}}
NROLE.forEach(q=>{const t=String(q[1]);
 if(q[0]=='診所'&&/醫生/.test(t))q[2]='q5';
 else if(/警員/.test(t))q[2]=['g03','q3'];
 else if(/消防員/.test(t))q[2]=['g04','q4'];
 else if(q[0]=='健身房'&&/教練/.test(t))q[2]=['g10','q6'];
 else if(q[0]=='書局'&&/店員/.test(t))q[2]=['g31','q2','q14'];
 else if(q[0]=='銀行'&&/櫃員/.test(t))q[2]=['g17','q17'];
 else if(q[0]=='銀行'&&/理專/.test(t))q[2]=['g18','q17'];
 else if(/黑手學徒/.test(t))q[2]=q[2].concat(['q7']);
 else if(/^\/\^旅客\$\//.test(t))q[2]=q[2].concat(['q9','q9']);
 else if(/上班族/.test(t))q[2]=['u4','q17'];});
NROLE.splice(NROLE.findIndex(q=>q[2]=='M'),0,[null,/釣客/,['q12']],[null,/郵差/,['q1','q20']],[null,/外送/,['q15']]);

// v13.54 男醫生、男警察、男主廚
delete NSPR['廚師'];GM.push('r2');
NROLE.forEach(q=>{const t=String(q[1]);
 if(q[0]=='診所'&&/醫生/.test(t))q[2]=['q5','r1'];
 else if(/警員/.test(t))q[2]=['r2','q3','g03'];});
NROLE.splice(NROLE.findIndex(q=>q[2]=='M'),0,[null,/廚師|主廚/,['r3','j5']]);
// v13.60 暫時拿掉坐姿：目前的坐姿圖是盤腿，坐在椅子上很怪 → 一律用站立圖（等坐椅子的圖做好再補）
const SIT_OFF=true;
{const _ad2=alDraw;alDraw=function(c,o,key){if(SIT_OFF&&o&&o.sit){const o2=Object.assign({},o,{sit:0,mv:0});return _ad2.call(this,c,o2,key)}return _ad2.apply(this,arguments)}}
