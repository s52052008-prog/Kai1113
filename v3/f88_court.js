/* v12.9 教會旁邊的「多功能球場」（原教會停車場）：走近按空白鍵就能玩 Nerf */
const COURT={x:2580,y:112,w:190,h:184};
function courtMenu(){const N=nfS();if(!N.u)return openDlg('🏟️ 教會多功能球場','教會旁邊的多功能球場，畫著白線，兩頭有籃框。<br>球場邊的公告欄寫著：「青年團契・Nerf 軟彈槍大戰，有興趣找以倫牧師！」',[['（先去教會找以倫哥問問看）','',closeDlg]]);nerfMenu('court')}
// 位置固定（不讓版面重排時被移走）
SPOTS.push({get x(){return COURT.x+20},set x(v){},get y(){return COURT.y+30},set y(v){},get w(){return COURT.w-40},set w(v){},get h(){return COURT.h-60},set h(v){},n:'🏟️ 多功能球場（Nerf）',fn:courtMenu});
