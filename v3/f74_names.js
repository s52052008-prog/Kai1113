/* v12.2 名稱總表修改（冠宏 11/3）＋新怪物變種：劇毒史萊姆屁孩、巨魔野狼、惡毒蘑菇、食人樹精、獨眼火蜥、金錢哥布林、哥布林首領；屬性點數值調整；武器技能改名 */
// ───────── 章節、頭目、怪物 ─────────
VCH[0].n='綠綠草原';VCH[1].n='臭臭森林';
Object.assign(VMOB.boss,{n:'史萊姆國王'});Object.assign(VMOB.tking,{n:'腐敗樹王'});Object.assign(VMOB.demon,{n:'熔岩巨魔'});
VMOB.slime.n='史萊姆屁孩';VMOB.bat.n='吸血蝙蝠';VMOB.tbird.n='雷鳴鳥';
VMOB.bat.d='盤旋，頭上冒「!」就俯衝。被牠貼到會黏在你身上吸血 1 秒（這時打不動牠），吸飽才飛走。（屬性：☠️毒，怕風）';
VMOB.tbird.d='很會閃（攻擊常常落空）。會放「噪音」讓你和隊友攻擊、防禦下降，頭上冒「!」時腳下會落雷。（屬性：⚡電，怕毒）';
VMOB.golem.d='皮很厚，有兩層：先打破外殼（藍色護盾），本體防禦才會變低。舉雙拳砸地有衝擊波。（屬性：💧水，怕電）';
VMOB.gchief={n:'哥布林首領',hits:90,atk:1.6,r:30,spd:72,exp:9,drop:[['fang',1],['bark',1]],col:'#7a4ac0',boss:1,fo:28,el:'fire',d:'只有打倒「金錢哥布林」才可能開出神秘傳送門遇到牠。體型大、力量強，會用強大魔法：火球連發、隕石、瞬間移動，還會叫手下。（屬性：🔥火，怕水）'};
// 變種（名字、顏色、強化）：在 mkMob 之後套用
const VVAR={
 slime:{f:11,p:1,vn:'劇毒史萊姆屁孩',el:'poison',col:'#b07ad8',pal:'poison'},
 wolf:{f:11,p:1,vn:'巨魔野狼',col:'#6a4a5a',hue:[300,.7,.75],r:1.35,hp:1.9,atk:1.3},
 shroom:{f:11,p:1,vn:'惡毒蘑菇',col:'#c03a3a',hue:[-60,1.1,.9],big:1,hp:1.4},
 treant:{f:16,p:.35,vn:'食人樹精',col:'#7a3a6a',hue:[200,1,.85],snare:1,hp:1.2},
 lizard:{f:26,p:.4,vn:'獨眼火蜥',col:'#d02a1a',hue:[-15,1.2,.8],spd:1.5,hp:1.2},
 goblin:{f:6,p:0,vn:'💰金錢哥布林',col:'#ffc830',hue:[-50,1.3,1.25],gold:1}};
// 各章額外出現的怪（後面章節也會遇到變種）
VCH[1].extra=[['slime',2],['wolf',1],['shroom',1]];VCH[2].extra=[['wolf',2],['shroom',1],['slime',1]];
// 像素圖重新上色（變種用）
function vaHue(cv,h,s,l){const k='hue'+(cv._id||(cv._id=Math.random()))+h+s+l;if(VA[k])return VA[k];const c=document.createElement('canvas');c.width=cv.width;c.height=cv.height;const x=c.getContext('2d');x.drawImage(cv,0,0);const d=x.getImageData(0,0,c.width,c.height),a=d.data;
 for(let i=0;i<a.length;i+=4){if(!a[i+3])continue;let r=a[i]/255,g=a[i+1]/255,b=a[i+2]/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),L=(mx+mn)/2;if(mx-mn<.08||L<.12)continue;let H,S=(mx-mn)/(1-Math.abs(2*L-1));if(mx==r)H=((g-b)/(mx-mn))%6;else if(mx==g)H=(b-r)/(mx-mn)+2;else H=(r-g)/(mx-mn)+4;H=(H*60+h+360)%360;S=Math.min(1,S*s);const L2=Math.min(1,L*l);
  const C=(1-Math.abs(2*L2-1))*S,X=C*(1-Math.abs((H/60)%2-1)),m=L2-C/2;let [R,G2,B]=H<60?[C,X,0]:H<120?[X,C,0]:H<180?[0,C,X]:H<240?[0,X,C]:H<300?[X,0,C]:[C,0,X];a[i]=(R+m)*255;a[i+1]=(G2+m)*255;a[i+2]=(B+m)*255}x.putImageData(d,0,0);return VA[k]=c}
// ───────── 職業大招、天賦、裝備、道具改名 ─────────
Object.assign(VSK.boost,{n:'無詠'});Object.assign(VSK.rage,{n:'狂怒'});Object.assign(VSK.anthem,{n:'頌歌'});Object.assign(VSK.aegis,{n:'聖盾'});
{const bf=VTREE.warrior.find(p=>p.k=='warB');bf.nodes.forEach(n=>{if(n[1]=='疾如風')n[1]='疾風';if(n[1]=='見切')n[1]='雷切'});const bb=VTREE.bard.find(p=>p.k=='bardB');bb.cap[0]='安可曲!'}
VFORGE.forEach(f=>{if(f.nm=='熔岩岩魔鎧')f.nm='熔岩巨魔鎧'});
VIT.hpot.n='生命祕藥';VIT.mpot.n='魔力祕藥';
// 武器技能改版（新名稱、冷卻、魔力）
Object.assign(VSK.dash,{n:'十字斬',mp:10,cd:4});Object.assign(VSK.spin,{n:'劍氣',mp:14,cd:6});
Object.assign(VSK.shadow,{n:'二刀流',mp:10,cd:4});Object.assign(VSK.venom,{n:'星爆氣流斬',mp:20,cd:9});
Object.assign(VSK.quake,{n:'震地',mp:16,cd:7});Object.assign(VSK.charge,{n:'蓄力重斬',mp:18,cd:9});
Object.assign(VSK.lunge,{n:'靈蛇',mp:10,cd:4});Object.assign(VSK.sweep,{n:'槍之舞',mp:20,cd:10});
Object.assign(VSK.triple,{n:'三連射',mp:8,cd:3});Object.assign(VSK.leap,{n:'穿心箭',mp:12,cd:5});
Object.assign(VSK.twin,{n:'雙斧齊飛',mp:12,cd:5});Object.assign(VSK.orbit,{n:'迴旋斧',mp:14,cd:7});
Object.assign(VSK.rest,{n:'休止符',mp:8,cd:3});Object.assign(VSK.mbolt,{n:'靈彈',mp:6,cd:.7});Object.assign(VSK.heal,{n:'治癒之光',mp:22,cd:9});
Object.assign(VWP.staff,{d:'用法杖敲人（物理、傷害低）。Q「靈彈」按一下瞬發；按住蓄力 1.5 秒變二階（220%），3 秒變最大階（400%＋爆炸）'});
Object.assign(VWP.sword,{d:'Q 十字斬：連砍兩下（150%）・E 劍氣：往左右兩邊各發一道劍氣（爆擊 +10%）'});
Object.assign(VWP.dual,{d:'Q 二刀流：連砍 4 下（125%）・E 星爆氣流斬：瞬間揮刀 6 次（150%）'});
Object.assign(VWP.great,{d:'Q 震地：同一層地面的怪都被震到（飛的不算）・E 蓄力重斬：1 秒後往前衝、擊退，無敵 2 秒，之後自己變慢'});
Object.assign(VWP.spear,{d:'Q 靈蛇：長槍伸長刺兩下，第一下擊退、第二下 150%・E 槍之舞：3 秒內身邊形成怪物近不了的圈'});
Object.assign(VWP.bow,{d:'Q 三連射：三支箭打第一隻怪・E 穿心箭：穿透 3 隻、第一隻必定爆擊，射完往後退一步'});
Object.assign(VWP.axe,{d:'Q 雙斧齊飛：連丟兩把（各 150%）・E 迴旋斧：像飛盤一樣穿透擊退，飛回來再打一次'});
Object.assign(VWP.lute,{d:'Q 休止符：一條音符打出去，碰到的怪變慢・E 遲緩樂章'});
// ───────── 屬性點數值 ─────────
VSTAT.str[2]='攻擊 +1%';VSTAT.int[2]='技能傷害 +2%、魔力 +3%';VSTAT.agi[2]='閃避 +0.5%、爆擊 +0.25%';VSTAT.luk[2]='爆擊 +0.5%、掉寶率 +1.5%';VSTAT.vit[2]='血量 +4%、防禦 +2%';
// ───────── 菁英怪說明 ─────────
VMOB.slime.d='會一跳一跳撞過來；2 層以後有火焰、雷電兩種，臭臭森林以後有紫色的劇毒史萊姆屁孩。（屬性：💧水，怕電）';
VMOB.wolf.d+='　後面的章節會出現體型更大的「巨魔野狼」。';VMOB.shroom.d+='　後面的章節有「惡毒蘑菇」，噴一顆巨大孢子。';
VMOB.treant.d+='　森林深處有「食人樹精」，觸手會把你纏住不能動。';VMOB.lizard.d+='　火山深處有跑超快的「獨眼火蜥」。';VMOB.goblin.d+='　偶爾會出現「💰金錢哥布林」：打倒會噴金幣，還可能打開神秘傳送門！';
