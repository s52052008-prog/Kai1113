/* v5.7 路人素材 32 位：依名字、職稱與場所自動套用 */
NPOSE['g01_sheet']={"wave": [0], "read": [1], "clap": [3]};
NPOSE['g02_sheet']={"wave": [0], "read": [1], "clap": [4]};
NPOSE['g03_sheet']={"wave": [0]};
NPOSE['g04_sheet']={"wave": [0], "clap": [5]};
NPOSE['g05_sheet']={"wave": [0], "clap": [5]};
NPOSE['g06_sheet']={"wave": [0], "clap": [5]};
NPOSE['g07_sheet']={"wave": [0], "clap": [4]};
NPOSE['g08_sheet']={"wave": [0], "clap": [5]};
NPOSE['g09_sheet']={"wave": [0], "clap": [5]};
NPOSE['g10_sheet']={"wave": [0], "clap": [4]};
NPOSE['g11_sheet']={"wave": [0], "lift": [1], "clap": [4]};
NPOSE['g12_sheet']={"wave": [0], "dribble": [2], "clap": [5]};
NPOSE['g13_sheet']={"wave": [0], "read": [1], "lift": [4], "clap": [5]};
NPOSE['g14_sheet']={"wave": [0], "lift": [3], "clap": [4]};
NPOSE['g15_sheet']={"wave": [0], "lift": [3], "clap": [5]};
NPOSE['g16_sheet']={"clap": [4], "wave": [5]};
NPOSE['g17_sheet']={"wave": [0], "clap": [5]};
NPOSE['g18_sheet']={"wave": [0]};
NPOSE['g19_sheet']={"wave": [0]};
NPOSE['g20_sheet']={"wave": [0], "guitar": [1], "sing": [2], "clap": [5]};
NPOSE['g21_sheet']={"wave": [0], "clap": [5]};
NPOSE['g22_sheet']={"wave": [0], "clap": [5]};
NPOSE['g23_sheet']={"wave": [0], "clap": [5]};
NPOSE['g24_sheet']={"wave": [0], "clap": [5]};
NPOSE['g25_sheet']={"wave": [0], "clap": [5]};
NPOSE['g26_sheet']={"wave": [0], "clap": [5]};
NPOSE['g27_sheet']={"wave": [0]};
NPOSE['g28_sheet']={"wave": [0], "read": [2]};
NPOSE['g29_sheet']={"wave": [0]};
NPOSE['g30_sheet']={"wave": [0], "clap": [5]};
NPOSE['g31_sheet']={"wave": [0], "read": [1], "clap": [5]};
NPOSE['g32_sheet']={"wave": [0], "sweep": [1]};

const GM=['g11','g24','g18','g13','g20','g31','g29','g21'],GF=['g28','g15','g07','g02','g14','g12','g25','g17','g22'];
const NROLE=[ // [場所(可省), 名字正規式, 素材或池]
 ['診所',/醫生/,'g05'],['診所',/護士|護理/,'g06'],
 [null,/警員|員警|警察/,'g03'],[null,/消防員|鄭隊長|值班員/,'g04'],
 ['健身房',/教練/,'g10'],['健身房',/健身客/,['g11','g15','g12']],
 [null,/吳老師|導護老師/,'g02'],
 ['服飾店',/店員/,'g07'],['餐廳',/服務生/,'g08'],['餐廳',/^阿香$/,'g09'],['餐廳',/收銀員/,'g22'],['餐廳',/收桌阿姨/,'g32'],
 ['碳佐麻里',/領位員|燒肉職人/,'g16'],['碳佐麻里',/駐唱吉他手/,'g20'],['賓士展示中心',/業務/,'g18'],
 ['機車行',/黑手學徒/,'g19'],['全家',/店員/,'g21'],['家樂福',/店員/,'g21'],['家樂福',/收銀員/,'g22'],
 ['寵物店',/店員/,'g23'],['捷安特',/店員/,'g24'],['美髮',/助理/,'g25'],['遊藝場',/少女/,'g26'],['遊藝場',/店員/,'g24'],
 [null,/站務員|驗票員/,'g27'],['咖啡店',/^保羅$/,'g29'],['咖啡店',/^笑笑$/,'g30'],['書局',/店員/,'g31'],
 ['旅館',/櫃檯小姐/,'g17'],['旅館',/行李員/,'g16'],['電影院',/售票員|販賣部/,'g30'],['銀行',/櫃員|行員/,'g17'],['銀行',/理專/,'g18'],
 [null,/志工 張阿姨|清潔/,'g32'],
 [null,/阿公$/,'g13'],[null,/阿嬤$|阿媽$/,'g14'],
 [null,/^(小朋友|小明|小豪|小安|小華|小寶)$/,'g01'],
 [null,/先生$|少年$|登山客$/,'M'],[null,/小姐$|少女$|太太$/,'F'],[null,/同學$/,['g01','g26','g12','g11']],
 [null,/^(客人|顧客|旅客|觀眾|民眾|客戶|讀者|遊客|信眾|玩家|病患)$/,'A']];
const nsH=s=>{let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h};
function nsRole(nm,ob){if(ob&&ob._sp!==undefined)return ob._sp;const sc=typeof scene!='undefined'?scene:null;let r=null;
 for(const q of NROLE){if(q[0]&&q[0]!=sc)continue;if(q[1].test(nm)){r=q[2];break}}
 if(r){const seed=nsH(nm+(ob?'|'+Math.round(ob.x||0)+','+Math.round(ob.y||0):''));const pool=r=='M'?GM:r=='F'?GF:r=='A'?GM.concat(GF):Array.isArray(r)?r:null;if(pool)r=pool[seed%pool.length];if(!uaOK(r+'_sheet'))r=null}
 if(ob)ob._sp=r;return r}
