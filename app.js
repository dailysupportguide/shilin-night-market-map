(()=>{'use strict';
const pageConfig=window.SHILIN_PAGE;
const marketURL=id=>pageConfig.root+pageConfig.routes[id]+'/';
const data=window.SHILIN_DATA,$=s=>document.querySelector(s),all=s=>[...document.querySelectorAll(s)],W=1536,H=1608,storeById=new Map(data.stores.map(s=>[s.id,s]));
const english={heading:'A good night starts here.',intro:'Find your next bite. Tap a number for walking directions.',loop:'One loop. Plenty to discover.',download:'Paper map',map:'Night market map',routeToggle:'Walking route',gesture:'Drag to explore · Pinch or scroll to zoom',tap:'Tap a number to see a shop',quick:'Before you go',navigationNote:'Walking directions open in your chosen maps app.',walk:'Walking directions',showOnMap:'Show on map',changeLanguage:'Change language / region',empty:'No matching shops.',printHint:'A4 landscape · Print at 100%',search:'Search food or shop',toilet:'Restrooms',zoomIn:'Zoom in',zoomOut:'Zoom out',fit:'Fit map',close:'Close'};
const translations={
jp:{heading:'今夜は、士林を食べ歩こう。',intro:'気になる番号をタップ。お店までの道順をチェック。',loop:'ひとめぐり、楽しみいろいろ。',download:'紙の地図',map:'士林夜市マップ',routeToggle:'散策ルート',gesture:'ドラッグで移動 · ピンチで拡大・縮小',tap:'番号をタップしてお店を見る',quick:'お出かけの前に',navigationNote:'道順は選んだ地図アプリで表示します。',walk:'徒歩ルート',showOnMap:'地図で場所を見る',changeLanguage:'言語・地域を変更',empty:'該当するお店がありません。',printHint:'A4横向き · 100%で印刷',search:'お店・グルメを検索',toilet:'トイレ',zoomIn:'拡大',zoomOut:'縮小',fit:'全体を表示',close:'閉じる'},
hk:{heading:'今晚，一起逛士林。',intro:'點選地圖編號，搵美食、查看步行路線。',loop:'行一圈，慢慢食。',download:'紙本地圖',map:'士林夜市地圖',routeToggle:'散步路線',gesture:'拖曳移動 · 雙指或滾輪縮放',tap:'點選編號查看店舖',quick:'出發前看看',navigationNote:'步行路線會在你選擇的地圖開啟。',walk:'步行導航',showOnMap:'在地圖上查看',changeLanguage:'更改語言／地區',empty:'沒有符合的店舖。',printHint:'A4橫向 · 以100%列印',search:'搜尋店名或美食',toilet:'洗手間',zoomIn:'放大',zoomOut:'縮小',fit:'顯示全圖',close:'關閉'},
cn:{heading:'今晚，一起逛士林。',intro:'点击地图编号，找美食、查看步行路线。',loop:'逛一圈，慢慢吃。',download:'纸质地图',map:'士林夜市地图',routeToggle:'散步路线',gesture:'拖动地图 · 双指或滚轮缩放',tap:'点击编号查看店铺',quick:'出发前看看',navigationNote:'步行路线会在你选择的地图中打开。',walk:'步行导航',showOnMap:'在地图上查看',changeLanguage:'更改语言／地区',empty:'没有匹配的店铺。',printHint:'A4横向 · 按100%打印',search:'搜索店名或美食',toilet:'洗手间',zoomIn:'放大',zoomOut:'缩小',fit:'显示全图',close:'关闭'},
kr:{heading:'오늘 밤, 스린을 맛보세요.',intro:'번호를 누르면 가게 정보와 도보 길찾기를 볼 수 있어요.',loop:'한 바퀴 돌며 천천히 즐겨요.',download:'종이 지도',map:'스린 야시장 지도',routeToggle:'산책 코스',gesture:'드래그로 이동 · 두 손가락으로 확대·축소',tap:'번호를 눌러 가게 보기',quick:'방문 전 안내',navigationNote:'선택한 지도 앱에서 도보 경로를 확인하세요.',walk:'도보 길찾기',showOnMap:'지도에서 보기',changeLanguage:'언어 / 지역 변경',empty:'검색 결과가 없습니다.',printHint:'A4 가로 · 100%로 인쇄',search:'가게 또는 음식 검색',toilet:'화장실',zoomIn:'확대',zoomOut:'축소',fit:'전체 지도',close:'닫기'},
vn:{heading:'Tối nay, cùng khám phá Sĩ Lâm.',intro:'Chạm vào số để xem quán ăn và đường đi bộ.',loop:'Dạo một vòng, khám phá thật nhiều.',download:'Bản đồ giấy',map:'Bản đồ chợ đêm',routeToggle:'Lộ trình đi bộ',gesture:'Kéo để di chuyển · Chụm hai ngón để thu phóng',tap:'Chạm vào số để xem quán',quick:'Trước khi đi',navigationNote:'Mở đường đi bộ trong ứng dụng bản đồ bạn chọn.',walk:'Đường đi bộ',showOnMap:'Xem trên bản đồ',changeLanguage:'Đổi ngôn ngữ / khu vực',empty:'Không tìm thấy quán phù hợp.',printHint:'A4 ngang · In ở 100%',search:'Tìm quán hoặc món ăn',toilet:'Nhà vệ sinh',zoomIn:'Phóng to',zoomOut:'Thu nhỏ',fit:'Xem toàn bản đồ',close:'Đóng'},
th:{heading:'คืนนี้ ไปเดินชิมที่ซื่อหลินกัน',intro:'แตะหมายเลขเพื่อดูร้านและเส้นทางเดิน',loop:'เดินหนึ่งรอบ ค่อย ๆ ชิม',download:'แผนที่กระดาษ',map:'แผนที่ตลาดกลางคืน',routeToggle:'เส้นทางเดินเที่ยว',gesture:'ลากเพื่อเลื่อน · ใช้สองนิ้วเพื่อซูม',tap:'แตะหมายเลขเพื่อดูร้าน',quick:'ก่อนออกเดินทาง',navigationNote:'เปิดเส้นทางเดินในแอปแผนที่ที่คุณเลือก',walk:'เส้นทางเดิน',showOnMap:'ดูบนแผนที่',changeLanguage:'เปลี่ยนภาษา / ภูมิภาค',empty:'ไม่พบร้านที่ค้นหา',printHint:'A4 แนวนอน · พิมพ์ที่ 100%',search:'ค้นหาร้านหรืออาหาร',toilet:'ห้องน้ำ',zoomIn:'ขยาย',zoomOut:'ย่อ',fit:'ดูแผนที่ทั้งหมด',close:'ปิด'}
};
translations.zh={...translations.hk,intro:'點選地圖編號，找美食、查看步行路線。',loop:'逛一圈，慢慢吃。',tap:'點選編號查看店家',empty:'沒有符合的店家。',toilet:'廁所'};
const choices={global:['English','General · All regions'],zh:['繁體中文','通用版 · 所有地區'],jp:['日本語','日本語版'],hk:['繁體中文','香港精選'],kr:['한국어','한국어판'],us:['English','United States'],cn:['简体中文','简体中文版'],ph:['English','Philippines'],sg:['English','Singapore'],vn:['Tiếng Việt','Bản tiếng Việt'],th:['ไทย','ฉบับภาษาไทย'],my:['English','Malaysia']};
const esc=v=>String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const placeById=new Map(data.places.map(p=>[p.id,p]));
let market=null,t=english,selected=null,s=1,tx=0,ty=0,fitScale=1,suppressUntil=0,gesture=null;const pointers=new Map(),vp=$('#map-viewport'),stage=$('#map-stage');

let transitOrigin='main';
function renderTransit(){
 const d=window.SHILIN_TRANSIT,c=d[market.id]||d.en,f=d.facts[transitOrigin],src=d.sources,rc=d.returnCopy[market.id]||d.returnCopy.en,isReturn=!!f.return;
 const link=(url,label,cls='')=>'<a class="'+cls+'" href="'+esc(url)+'" target="_blank" rel="noopener noreferrer">'+esc(label)+' ↗</a>';
 const planner='https://www.google.com/maps/dir/?'+new URLSearchParams({api:'1',origin:f.origin,destination:f.destination||'捷運劍潭站1號出口 臺北市士林區中山北路五段65號',travelmode:'transit'});
 const steps=isReturn?(transitOrigin==='back-main'?rc.mainSteps:rc.ximenSteps):(transitOrigin==='main'?c.mainSteps:c.ximenSteps);
 const tabs=['main','ximen','back-main','back-ximen'],labels=[...c.origins,...rc.tabs];
 const busBoard=isReturn?'捷運劍潭站(中山)':f.boarding,busAlight=isReturn?f.busAlighting:d.bus.alighting;
 const latinAlight=isReturn?f.latinAlighting:'MRT Jiantan Sta. (Taipei Performing Arts Center)';
 const latinBoard=isReturn?'MRT Jiantan Sta. (Zhongshan)':transitOrigin==='main'?'Taipei Main Sta. (Zhengzhou)':'MRT Ximen Sta.';
 $('#transit').innerHTML='<div class="transit-heading"><div><span class="eyebrow">'+esc(t.transitEyebrow)+'</span><h2 id="transit-title">'+esc(rc.title)+'</h2><p>'+esc(c.walk)+'</p></div><span class="station-badge">'+esc(c.exit)+'</span></div>'+
 '<div class="transit-tabs" role="tablist" aria-label="'+esc(c.title)+'">'+tabs.map((id,i)=>'<button role="tab" id="transit-tab-'+id+'" data-origin="'+id+'" aria-controls="transit-route" aria-selected="'+(transitOrigin===id)+'" tabindex="'+(transitOrigin===id?'0':'-1')+'">'+esc(labels[i])+'</button>').join('')+'</div>'+
 '<div id="transit-route" role="tabpanel" aria-labelledby="transit-tab-'+transitOrigin+'" class="transit-grid">'+
 '<article class="transit-card transit-rail"><h3><span class="transit-mode"><svg aria-hidden="true"><use href="#i-train"/></svg>MRT</span>'+esc(c.rail)+'</h3><p class="journey-time">'+esc(c.minutes.replace('{n}',f.minutes))+'</p><p class="transit-small">'+esc(c.estimateNote)+'</p><ol>'+steps.map(s=>'<li>'+esc(s)+'</li>').join('')+'</ol><div class="service-hours"><span>'+esc(c.firstLast)+'</span><strong>'+f.first+' – '+f.last+' <small>('+esc(t.nextDayLast)+')</small></strong></div><div class="transit-actions">'+link(isReturn?src.returnJourney:src[transitOrigin],c.railOfficial)+link(isReturn?src.returnLast:src[transitOrigin+'Last'],c.railSchedule)+link(planner,c.planner)+'</div></article>'+
 '<article class="transit-card transit-bus"><h3><span class="transit-mode bus-mode"><svg aria-hidden="true"><use href="#i-bus"/></svg>218</span>'+esc(c.bus)+'</h3><p class="bus-direction">'+esc(isReturn?rc.busDirection:c.busDirection)+'</p><p class="transit-small">'+esc(isReturn?rc.busAccess:c.busAccess)+'</p><dl class="bus-stops"><div><dt>'+esc(c.board)+'</dt><dd><strong>'+esc(busBoard)+'</strong><small>'+latinBoard+'</small></dd></div><div><dt>'+esc(c.alight)+'</dt><dd><strong>'+esc(busAlight)+'</strong><small>'+esc(latinAlight)+'</small></dd></div></dl><div class="service-hours"><span>'+esc(c.busHours)+' · 新北投 Xinbeitou</span><strong>'+d.bus.terminalFirst+' – '+d.bus.terminalLast+'</strong></div><p class="bus-hours-note">'+esc(c.busNote)+'</p><div class="transit-actions">'+link(src.busLive,c.live,'live-arrivals')+link(src.busSchedule,c.schedule)+'</div></article></div>'+
 '<aside class="return-train"><div><span class="eyebrow">'+esc(t.lastEyebrow)+'</span><h3>'+esc(c.backTitle)+'</h3><p>'+esc(c.backRoute)+'</p></div><div class="last-time"><strong>'+d.returnLast+'</strong><span>'+esc(c.nextDay)+'</span></div><div class="return-explanation"><p>'+esc(c.backNote)+'</p>'+link(src.returnLast,c.returnLink)+'</div></aside>'+
 '<div class="transit-footer"><p>'+esc(c.checked.replace('{date}',d.checked))+'</p>'+link(src.station,c.official)+'</div>';
}
$('#transit').addEventListener('click',e=>{const b=e.target.closest('[data-origin]');if(!b)return;transitOrigin=b.dataset.origin;renderTransit();$('#transit-tab-'+transitOrigin).focus()});
$('#transit').addEventListener('keydown',e=>{const b=e.target.closest('[role="tab"]');if(!b||!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();const tabs=['main','ximen','back-main','back-ximen'],index=tabs.indexOf(transitOrigin);transitOrigin=tabs[e.key==='Home'?0:e.key==='End'?3:(index+(e.key==='ArrowRight'?1:3))%4];renderTransit();$('#transit-tab-'+transitOrigin).focus()});

function readPreference(){try{return localStorage.getItem('shilin-market-v1')}catch{return null}}
function writePreference(id){try{localStorage.setItem('shilin-market-v1',id)}catch{}}
function renderList(){const items=market.foods;$('#food-list').innerHTML=items.map(f=>'<li><button class="food-button '+(f.photo?'':'no-photo')+'" data-store="'+esc(f.id)+'">'+(f.photo?'<span class="food-photo '+(f.id==='寒天Q棒'?'jelly':'')+'"><img src="/shilin-night-market-map/assets/'+esc(f.photo)+'" alt="" loading="lazy"><span class="rank">'+f.rank+'</span></span>':'<span class="rank">'+f.rank+'</span>')+'<span class="food-copy"><strong>'+esc(f.name)+'</strong><small>'+esc(f.subtitle)+'</small><span class="food-nav">'+esc(t.walk)+' ↗</span></span></button></li>').join('');}
function applyMarket(id,remember=true){market=data.markets.find(m=>m.id===id);if(!market)return;t={...english,...translations[id],...window.SHILIN_NAV_UI.en,...window.SHILIN_NAV_UI[id],...window.SHILIN_COPY.en,...window.SHILIN_COPY[id]};document.documentElement.lang=pageConfig.languages[id];document.title=pageConfig.titles[id];all('[data-ui]').forEach(el=>el.textContent=t[el.dataset.ui]);$('#edition').textContent=market.edition;$('#top-title').textContent=market.top;$('#wc-label').textContent=t.toilet;$('#route-title').textContent=market.route;$('#route-copy').textContent=market.routeLines.join(' ');$('#map-viewport').setAttribute('aria-label',t.map);$('#zoom-in').setAttribute('aria-label',t.zoomIn);$('#zoom-out').setAttribute('aria-label',t.zoomOut);$('#fit').setAttribute('aria-label',t.fit);all('.dialog-close').forEach(b=>b.setAttribute('aria-label',t.close));renderTransit();$('#pins').innerHTML=market.foods.map(f=>{const p=storeById.get(f.id);return '<button class="pin" data-store="'+esc(f.id)+'" data-rank="'+f.rank+'" aria-label="'+f.rank+'. '+esc(f.name)+'" style="left:'+p.x+'px;top:'+p.y+'px"><span class="pin-face">'+f.rank+'</span></button>'}).join('');selected=null;renderList();renderPlaces();all('.market-option').forEach(el=>el.classList.toggle('current',el.dataset.language==='en'?market.lang==='en':el.dataset.market===id));if(remember){writePreference(id);}$('#language-close').hidden=false;requestAnimationFrame(fit);}
function update(){stage.style.transform='translate('+tx+'px,'+ty+'px) scale('+s+')';const buttonSize=44/s,faceSize=Math.min(36,Math.max(22,76*s))/s;all('.pin').forEach(p=>{p.style.width=buttonSize+'px';p.style.height=buttonSize+'px';p.style.setProperty('--pin-face',faceSize+'px');p.style.setProperty('--pin-font',faceSize*.47+'px')});all('.poi-hotspot').forEach(p=>{p.style.width=Math.max(Number(p.dataset.w),44/s)+'px';p.style.height=Math.max(Number(p.dataset.h),44/s)+'px';p.style.setProperty('--poi-badge',12/s+'px');p.style.setProperty('--poi-border',1.5/s+'px')});$('#zoom-value').value=Math.round(s/fitScale*100)+'%';$('#zoom-in').disabled=s>=fitScale*8-.001;$('#zoom-out').disabled=s<=fitScale+.001;}
function fit(){const r=vp.getBoundingClientRect();fitScale=Math.min((r.width-16)/W,(r.height-16)/H);s=fitScale;tx=(r.width-W*s)/2;ty=(r.height-H*s)/2;update()}
function zoom(factor,x=vp.clientWidth/2,y=vp.clientHeight/2){const n=Math.max(fitScale,Math.min(fitScale*8,s*factor));tx=x-(x-tx)*n/s;ty=y-(y-ty)*n/s;s=n;update()}
function centerOn(id){const p=storeById.get(id)||placeById.get(id);if(!p)return;s=Math.min(fitScale*8,Math.max(s,fitScale*2.8));tx=vp.clientWidth/2-p.x*s;ty=vp.clientHeight/2-p.y*s;update();vp.scrollIntoView({block:'center',behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});vp.focus({preventScroll:true})}
function showShop(id){if(!market||performance.now()<suppressUntil)return;const f=market.foods.find(f=>f.id===id),p=storeById.get(id);if(!f||!p)return;$('#place-note').hidden=true;$('#place-source').hidden=true;$('#shop-image-wrap').classList.remove('place-image');selected=id;all('.pin').forEach(el=>el.classList.toggle('selected',el.dataset.store===id));all('.poi-hotspot').forEach(el=>el.classList.remove('selected'));$('#shop-name').textContent=f.name;$('#shop-rank').textContent=market.edition+' · TOP '+f.rank;$('#shop-subtitle').textContent=f.subtitle;$('#shop-branch').textContent=p.targetName;$('#shop-address').textContent=p.address;$('#google-link').href=p.google;$('#apple-link').href=p.apple;$('#shop-image-wrap').hidden=!f.photo;if(f.photo){$('#shop-image').src='/shilin-night-market-map/assets/'+f.photo;$('#shop-image').classList.toggle('jelly',id==='寒天Q棒');$('#shop-image').alt=f.name}$('#shop-dialog').showModal()}

function placeName(p){return p.sightIndex===undefined?p.name:market.sights[p.sightIndex]}
function placeSubtitle(p){return p.sightIndex===undefined?p.branchLatin:(placeName(p)===p.name?'':p.name)}
function renderPlaces(){
 $('#poi-hotspots').innerHTML=data.places.flatMap(p=>[{x:p.x,y:p.y,w:p.w,h:p.h},...(p.extraHotspots||[])].map((h,i)=>'<button class="poi-hotspot" data-place="'+esc(p.id)+'" data-w="'+h.w+'" data-h="'+h.h+'" aria-label="'+esc(placeName(p))+' · '+esc(t.walk)+'" title="'+esc(placeName(p))+'" style="left:'+h.x+'px;top:'+h.y+'px"><span aria-hidden="true">↗</span></button>')).join('');
}
function showPlace(id){
 if(!market||performance.now()<suppressUntil)return;const p=placeById.get(id);if(!p)return;selected=id;
 all('.pin').forEach(el=>el.classList.remove('selected'));all('.poi-hotspot').forEach(el=>el.classList.toggle('selected',el.dataset.place===id));
 $('#shop-name').textContent=placeName(p);$('#shop-rank').textContent=p.kind==='landmark'?t.landmarks:t.shops;$('#shop-subtitle').textContent=placeSubtitle(p);$('#shop-branch').textContent=p.targetName;$('#shop-address').textContent=p.address;$('#google-link').href=p.google;$('#apple-link').href=p.apple;
 $('#shop-image-wrap').hidden=false;$('#shop-image-wrap').classList.add('place-image');$('#shop-image').classList.remove('jelly');$('#shop-image').src='/shilin-night-market-map/assets/icons/'+p.icon;$('#shop-image').alt=placeName(p);
 $('#place-note').hidden=!p.noteKey;$('#place-note').textContent=p.noteKey?t[p.noteKey]:'';$('#place-source').hidden=false;$('#place-source').href=p.source;$('#shop-dialog').showModal();
}


stage.addEventListener('click',e=>{
 let b=e.target.closest('.pin,.poi-hotspot');if(!b||performance.now()<suppressUntil)return;
 // Enlarged touch targets may overlap at fit zoom. Resolve to the nearest
 // visible symbol center, so transparent hit areas cannot steal an icon tap.
 if(e.detail>0){
  const hits=all('.pin,.poi-hotspot').map(el=>({el,r:el.getBoundingClientRect()})).filter(({r})=>e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom);
  hits.sort((a,b)=>Math.hypot(e.clientX-a.r.x-a.r.width/2,e.clientY-a.r.y-a.r.height/2)-Math.hypot(e.clientX-b.r.x-b.r.width/2,e.clientY-b.r.y-b.r.height/2));
  b=hits[0]?.el||b;
 }
 if(b.dataset.place)showPlace(b.dataset.place);else showShop(b.dataset.store);
});


$('#food-list').addEventListener('click',e=>{const b=e.target.closest('[data-store]');if(b)showShop(b.dataset.store)});$('#show-on-map').onclick=()=>{$('#shop-dialog').close();centerOn(selected)};
$('#zoom-in').onclick=()=>zoom(1.4);$('#zoom-out').onclick=()=>zoom(1/1.4);$('#fit').onclick=fit;$('#route-toggle').onchange=e=>$('.road-overlay').style.display=e.target.checked?'':'none';
vp.addEventListener('wheel',e=>{if(e.target.closest('.map-controls'))return;e.preventDefault();const r=vp.getBoundingClientRect();zoom(Math.exp(-e.deltaY*.002),e.clientX-r.left,e.clientY-r.top)},{passive:false});
function gestureStart(){const pts=[...pointers.values()];if(pts.length===1)gesture={type:'pan',x:pts[0].x,y:pts[0].y,tx,ty,moved:false};else if(pts.length>=2){const a=pts[0],b=pts[1],cx=(a.x+b.x)/2,cy=(a.y+b.y)/2;gesture={type:'pinch',distance:Math.hypot(a.x-b.x,a.y-b.y),cx,cy,s,tx,ty};}}
vp.addEventListener('pointerdown',e=>{if(e.target.closest('.map-controls')||e.button>0)return;const r=vp.getBoundingClientRect();pointers.set(e.pointerId,{x:e.clientX-r.left,y:e.clientY-r.top});if(!e.target.closest('.pin,.poi-hotspot'))vp.setPointerCapture(e.pointerId);gestureStart()});
vp.addEventListener('pointermove',e=>{if(!pointers.has(e.pointerId)||!gesture)return;const r=vp.getBoundingClientRect();pointers.set(e.pointerId,{x:e.clientX-r.left,y:e.clientY-r.top});const pts=[...pointers.values()];if(gesture.type==='pinch'&&pts.length>=2){const a=pts[0],b=pts[1],cx=(a.x+b.x)/2,cy=(a.y+b.y)/2;const n=Math.max(fitScale,Math.min(fitScale*8,gesture.s*Math.hypot(a.x-b.x,a.y-b.y)/Math.max(1,gesture.distance)));tx=cx-(gesture.cx-gesture.tx)*n/gesture.s;ty=cy-(gesture.cy-gesture.ty)*n/gesture.s;s=n;suppressUntil=performance.now()+300;update()}else if(gesture.type==='pan'){const dx=pts[0].x-gesture.x,dy=pts[0].y-gesture.y;if(Math.hypot(dx,dy)>5){gesture.moved=true;suppressUntil=performance.now()+300}tx=gesture.tx+dx;ty=gesture.ty+dy;update()}});
function pointerEnd(e){if(!pointers.has(e.pointerId))return;pointers.delete(e.pointerId);if(vp.hasPointerCapture(e.pointerId))vp.releasePointerCapture(e.pointerId);if(pointers.size)gestureStart();else gesture=null}vp.addEventListener('pointerup',pointerEnd);vp.addEventListener('pointercancel',pointerEnd);
vp.addEventListener('keydown',e=>{if(e.target!==vp)return;const keys=['+','=','-','0','ArrowLeft','ArrowRight','ArrowUp','ArrowDown'];if(!keys.includes(e.key))return;e.preventDefault();if(e.key==='+'||e.key==='=')zoom(1.4);else if(e.key==='-')zoom(1/1.4);else if(e.key==='0')fit();else{tx+=e.key==='ArrowLeft'?40:e.key==='ArrowRight'?-40:0;ty+=e.key==='ArrowUp'?40:e.key==='ArrowDown'?-40:0;update()}});
const option=id=>'<a class="market-option" href="'+marketURL(id)+'" data-market="'+id+'"><span class="market-code">'+({global:'EN',zh:'繁中',cn:'简中'}[id]||id.toUpperCase())+'</span><span><strong>'+esc(choices[id][0])+'</strong><small>'+esc(choices[id][1])+'</small></span></a>';

const englishIds=['global','ph','my','sg','us'];
const englishNames={global:'General · All regions',ph:'Philippines',my:'Malaysia',sg:'Singapore',us:'United States'};
$('#language-options').innerHTML='<button class="market-option" data-language="en" aria-controls="english-editions" aria-expanded="false"><span class="market-code">EN</span><span><strong>English</strong><small>Choose a map edition →</small></span></button>'+['zh','jp','kr','cn','vn','th'].map(option).join('');

$('#english-options').innerHTML=englishIds.map(id=>'<a class="market-option" href="'+marketURL(id)+'" data-market="'+id+'"><span class="market-code">'+(id==='global'?'EN':id.toUpperCase())+'</span><span><strong>'+englishNames[id]+'</strong><small>'+(id==='global'?'For visitors from anywhere':'English · Regional Top 10')+'</small></span></a>').join('');
function languageStep(englishStep,focus=true){
 $('#language-main').hidden=englishStep;$('#english-editions').hidden=!englishStep;
 $('[data-language="en"]').setAttribute('aria-expanded',String(englishStep));
 $('#language-title').textContent=englishStep?'Choose your English map':'Choose your language';
 $('#language-description').innerHTML=englishStep?'Choose General or a regional Top 10.<br><span>通用版，或選擇你的地區版本。</span>':'選擇你看得懂的語言<br><span>All regions welcome. No country selection needed.</span>';
 $('#language-dialog').scrollTop=0;
 if(focus)(englishStep?$('#english-options [data-market="global"]'):$('[data-language="en"]')).focus();
}
$('#language-back').onclick=()=>languageStep(false);
$('#language-dialog').addEventListener('click',e=>{
 if(e.target.closest('[data-language="en"]')){languageStep(true);return}
 const b=e.target.closest('[data-market]');if(!b)return;writePreference(b.dataset.market);if(b.dataset.market===market?.id){e.preventDefault();$('#language-dialog').close()}
});
function chooseLanguage(){languageStep(false,false);$('#language-dialog').showModal()}
$('#language-btn').onclick=chooseLanguage;$('#footer-language').onclick=chooseLanguage;
for(const id of ['language','shop']){$('#'+id+'-close').onclick=()=>$('#'+id+'-dialog').close();$('#'+id+'-dialog').addEventListener('click',e=>{if(e.target!==e.currentTarget||id==='language'&&!market)return;const r=e.currentTarget.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)e.currentTarget.close()})}$('#language-dialog').addEventListener('cancel',e=>{if(!market)e.preventDefault()});
new ResizeObserver(()=>{if(market)fit()}).observe(vp);
const legacy=new URL(location.href).searchParams.get('market');
if(data.markets.some(m=>m.id===legacy)){location.replace(marketURL(legacy)+location.hash);return}
const requested=pageConfig.market||readPreference();
if(data.markets.some(m=>m.id===requested)){
 if(!pageConfig.market){location.replace(marketURL(requested)+location.hash);return}
 applyMarket(requested);
}else{applyMarket('global',false);market=null;$('#language-close').hidden=true;chooseLanguage()}
})();
