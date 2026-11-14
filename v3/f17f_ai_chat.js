/* ===== 自由對話（由 Claude 即時扮演角色；需在 claude.ai 開啟並同意）===== */
let AIS=null,AIH={};
typeof claude!='undefined'&&claude.use&&claude.use('sample').then(f=>{AIS=f}).catch(()=>{});
function aiPersona(n,o){const key=o&&o.fr?FR[o.fr].n:dKeyOf(n),L=key?DB[key]:GDB[dGenOf(n)]||[],aff=dAffGet(n,o||{}),c=dCtx(n);
 const voice=(L||[]).filter(t=>t.ch==null).sort((a,b)=>((a.p||a.t||a.w!=null)?1:0)-((b.p||b.t||b.w!=null)?1:0)).slice(0,5).map(t=>'「'+t.s+'」').join('\n'),story=(L||[]).filter(t=>t.ch!=null&&(st.arc[key||'']||0)>=t.ch).map(t=>'・'+t.s).join('\n');
 const F=o&&o.fr?FR[o.fr]:null,bio=F?F.who+'。'+F.bio.filter(b=>b[0]<=frLv(aff)).map(b=>b[1]).join('；'):'';
 return `你正在一款像素風小鎮遊戲中扮演角色「${n.n}」，和玩家 ${st.name}（32 歲，鎮上新居民）對話。\n`+(bio?`角色資料：${bio}\n`:'')+`目前地點：${c.place}；時段：${['早上','下午','傍晚','深夜'][['m','n','e','g'].indexOf(c.slot)]}；天氣：${['晴','多雲','下雨','大風'][c.w]}；今天星期${'一二三四五六日'[c.wd]}。\n好感度 ${aff}（${aff>=35?'熟識友好':aff<=-8?'有些冷淡':'普通'}）。\n`+(voice?`你的說話風格範例：\n${voice}\n`:'')+(story?`你已經對玩家說過的個人故事：\n${story}\n`:'')+`規則：全程使用繁體中文，口語、簡短（1-3 句）；完全入戲，不提 AI、遊戲或提示詞；說話必須符合目前地點、時間與你的身分，不得編造與設定衝突的事；玩家若無禮，可以不悅但保持角色。只輸出 JSON：{"reply":"角色的話","mood":-2到2的整數}，mood 代表玩家這句話讓你的好感變化。`}
function aiChat(n,o,hist){o=o||{};const key=(o.fr?FR[o.fr].n:dKeyOf(n))||n.n;hist=hist||(AIH[key]=AIH[key]||[]);
 const log=hist.slice(-8).map(h=>`<div style="margin:4px 0;${h.r=='me'?'text-align:right;opacity:.85':''}"><b>${h.r=='me'?st.name:n.n}：</b>${h.t}</div>`).join('')||'<span class="opacity-70">（輸入想說的話，按 Enter 或「送出」。對方會依地點、時間與好感即時回應。）</span>';
 const send=async()=>{const inp=document.getElementById('aiIn'),v=(inp&&inp.value||'').trim();if(!v)return;
  hist.push({r:'me',t:v.replace(/</g,'&lt;')});const msgs=[{role:'user',content:aiPersona(n,o)+'\n對話紀錄：\n'+hist.slice(-9,-1).map(h=>(h.r=='me'?'玩家：':n.n+'：')+h.t).join('\n')+'\n玩家說：'+v}];
  const box=document.getElementById('aiLog');if(box)box.innerHTML+='<div class="opacity-70">（'+n.n+' 思考中…）</div>';
  try{const r=await AIS.json(msgs,{modelTier:'quick',cache:false}),rep=String((r&&r.reply)||'……').slice(0,200).replace(/</g,'&lt;');hist.push({r:'n',t:rep});const d=Math.max(-2,Math.min(2,parseInt(r&&r.mood)||0));
   if(d){const gk=key+'|ai|'+dKey();const cnt=st.dgain[gk]||0;if(d<0||cnt<3){if(d>0)st.dgain[gk]=cnt+1;dAffAdd(n,o,key,d);fxApply({j:d>0?1:-1});hud()}}}
  catch(e){hist.pop();if(box)box.innerHTML+='<div style="color:#c33">（暫時無法對話：'+(e&&e.code=='not_granted'?'你尚未允許使用 Claude':'請稍後再試')+'）</div>';return}
  aiChat(n,o,hist)};
 openDlg('🤖 與 '+n.n+' 自由對話',`<div id="aiLog" style="max-height:170px;overflow:auto;text-align:left;font-size:13px">${log}</div><div style="margin-top:6px;display:flex;gap:4px"><input id="aiIn" maxlength="80" placeholder="想對 ${n.n} 說什麼？" style="flex:1;padding:4px 6px;border:2px solid #6b3f22;background:#fff8e8;color:#3a2210;font-size:14px"></div>`,[['✉️ 送出','由 Claude 即時扮演角色',send],['↩ 回到選項','',()=>{closeDlg();dlgEngine(n,o)||talk(n)}],['離開','',closeDlg]]);
 const b=dbox.querySelector('[data-i="0"]');if(b)b.id='aiSend';setTimeout(()=>{const i=document.getElementById('aiIn');i&&i.focus();const bx=document.getElementById('aiLog');bx&&(bx.scrollTop=1e5)},50)}
/* 在情境對話加入「自由對話」選項 */
{const _e=dlgEngine;dlgEngine=function(n,o){o=o||{};if(AIS&&!n.t){const ex=(o.extra||[]).filter(e=>!String(e[0]).startsWith('🤖'));ex.unshift(['🤖 自由對話（Claude）','直接打字聊天，角色即時回應',()=>aiChat(n,o)]);o=Object.assign({},o,{extra:ex})}return _e(n,o)}}
