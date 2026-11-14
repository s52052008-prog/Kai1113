/* v5.6 主角 Allen：使用者自繪行走圖（64×128／格，6 欄 × 10 列，腳底基準線 y=120）與表情頭像 */
const ALS={fw:64,fh:128,foot:120,H:31};// H：角色在世界中的顯示高度（約）
// dm（0右 1上 2左 3下）→ 列
const AL_WALK={3:0,1:1,2:2,0:3},AL_IDLE={3:4,1:5,2:6,0:7};
function alDraw(c,o,key){key=key||'al_sheet';if(!uaOK(key))return false;const im=UAI[key],dr=(o.dir|0)%8,dm=CHDIR[dr],ph=o.ph||0,ps=o.pose||'',sit=o.sit;
 const s=ALS.H/105,dw=ALS.fw*s,dh=ALS.fh*s;let row,col=0,flip=false;
 const PM=NPOSE[key]||NPOSE.al_sheet,pk=key.replace('_sheet','_preach');let src=im;
 if(ps=='preach'&&uaOK(pk)){src=UAI[pk];row=0;col=0}
 else if(PM[ps]&&!o.mv){const a=PM[ps];row=9;col=a[Math.floor(ph*(ps=='pray'||ps=='sleepy'?1.2:2.4))%a.length]}
 else if(sit){row=8;if(dm==0)col=1;else if(dm==2){col=1;flip=true}else col=0}
 else if(o.mv){row=AL_WALK[dm];col=((Math.floor(ph*10))%6+6)%6}
 else{row=AL_WALK[dm];col=standCol(key,row)}
 let by=0;if(ps=='lift')by=-Math.abs(Math.sin(ph*2))*1.5;
 c.save();c.translate(Math.round(o.x+6),Math.round(o.y+8)+by);
 c.fillStyle='rgba(40,25,0,.28)';c.beginPath();c.ellipse(0,0,sit?7:6.6,sit?2.2:2.4,0,0,7);c.fill();
 c.imageSmoothingEnabled=false;if(flip)c.scale(-1,1);
 c.drawImage(src,col*ALS.fw,row*ALS.fh,ALS.fw,ALS.fh,-dw/2,-ALS.foot*s,dw,dh);
 if(flip)c.scale(-1,1);
 if(o.um){c.fillStyle='#e0443a';c.strokeStyle='#2a1a10';c.lineWidth=.8;const ux=6;c.beginPath();c.moveTo(ux-13,-33);c.quadraticCurveTo(ux,-46,ux+13,-33);c.quadraticCurveTo(ux,-36,ux-13,-33);c.fill();c.stroke();c.beginPath();c.moveTo(ux,-36);c.lineTo(ux,-16);c.stroke()}
 c.restore();return true}
// NPC 自繪圖：名字 → 素材前綴（例如 '黃禹豪':'yh' → yh_sheet, yh_happy…）
const NSPR={};
// 第 10 列特殊動作：pose → 可用格
const NPOSE={al_sheet:{wave:[0,1],guitar:[2,3],pray:[4,5]}};
const NPOSE6={wave:[0],sing:[1],pray:[2],clap:[3],hug:[4],heart:[5]};
const nsKey=(nm,ob)=>{if(!nm)return null;for(const k in NSPR)if(nm==k||nm.endsWith(' '+k)||nm.startsWith(k)){const r=NSPR[k];if(typeof scene!='undefined'&&scene=='黃禹豪的家'&&uaOK(r+'h_sheet'))return r+'h';return r}return typeof nsRole=='function'?nsRole(nm,ob):null};
{const _dc=drawChar;drawChar=function(c,o){if(o&&o.pose!='punch'){if(o.lk===ALLEN&&alDraw(c,o))return;const k=nsKey(o.nm,o.ob);if(k&&alDraw(c,o,k+'_sheet'))return}return _dc.apply(this,arguments)}}
// 對話與 HUD 頭像：依心情換表情
function alMood(){const j=st.joy,h=st.hp;if(window.AL_FACE)return AL_FACE;if(h<30||j<25)return'sad';if(j>=80)return'happy';return'neutral'}
{const _pt=portrait;portrait=function(kind,obj){if(kind!='me'){const k=nsKey(obj&&obj.n,obj);let em='neutral';try{const id=obj&&typeof obj.fr=='string'?obj.fr:null;if(id&&st.fr&&st.fr[id]){const lv=frLv(st.fr[id].pt);em=st.partner==FR[id].n?'love':lv>=3?'happy':'neutral'}if(window.NP_FACE&&NP_FACE[obj.n])em=NP_FACE[obj.n]}catch(e){}const f=k&&[k+'_'+em,k+'_neutral'].find(uaOK);if(!f)return _pt.apply(this,arguments);const key='NPF|'+f;if(PORT[key])return PORT[key];
  const o=document.createElement('canvas');o.width=o.height=168;const c=o.getContext('2d');const bg=c.createLinearGradient(0,0,0,168);bg.addColorStop(0,'#f6dcae');bg.addColorStop(1,'#e0a86e');c.fillStyle=bg;c.fillRect(0,0,168,168);c.imageSmoothingEnabled=false;c.drawImage(UAI[f],4,8,160,160);return PORT[key]=o}const f='al_'+alMood();if(!uaOK(f))return _pt.apply(this,arguments);
 const key='ALF|'+f+'|'+(T.hour>=19||T.hour<5?1:0);if(PORT[key])return PORT[key];
 const o=document.createElement('canvas');o.width=o.height=168;const c=o.getContext('2d');const bg=c.createLinearGradient(0,0,0,168);bg.addColorStop(0,'#bfe0f4');bg.addColorStop(1,'#8cc0e0');c.fillStyle=bg;c.fillRect(0,0,168,168);
 c.fillStyle='rgba(255,255,255,.16)';for(let i=0;i<6;i++){c.beginPath();c.arc(20+i*30,30+((i*37)%90),16+((i*13)%12),0,7);c.fill()}
 c.imageSmoothingEnabled=false;c.drawImage(UAI[f],4,8,160,160);return PORT[key]=o}}
// 特殊時刻換表情（驚訝：突發事件；生氣：被開罰單）
{const _t=toast;toast=function(m){try{if(/🚨|罰|闖紅燈/.test(m)){window.AL_FACE='angry';setTimeout(()=>window.AL_FACE=null,4000)}else if(/🔥|火災|昏倒|突發|❗/.test(m)){window.AL_FACE='surprised';setTimeout(()=>window.AL_FACE=null,4000)}}catch(e){}return _t.apply(this,arguments)}}
