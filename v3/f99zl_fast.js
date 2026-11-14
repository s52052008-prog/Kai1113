/* v13.47 開啟加速：套用地圖時，地板一次讀整張畫布，不再每一格都向顯示卡讀一次（原本上萬次，慢的電腦會「網頁無回應」） */
let EFBULK=null;
{const _a=gzApply;gzApply=function(){EFBULK=0;try{return _a.apply(this,arguments)}finally{EFBULK=null}}}
{const _p=gzPaintCell;gzPaintCell=function(ci,t){if(EFBULK!==null&&!EFB.has(ci)){try{
  if(!EFBULK)EFBULK=S.getContext('2d').getImageData(0,0,S.width,S.height);
  const r=gzCellRect(ci),w=Math.max(0,Math.min(r[2],S.width-r[0])),h=Math.max(0,Math.min(r[3],S.height-r[1]));
  if(w>0&&h>0&&w==r[2]&&h==r[3]){const id=new ImageData(w,h),src=EFBULK.data,dst=id.data,SW=S.width;
   for(let y=0;y<h;y++){const o=((r[1]+y)*SW+r[0])*4;dst.set(src.subarray(o,o+w*4),y*w*4)}EFB.set(ci,id)}}catch(e){}}
 return _p.apply(this,arguments)}}
