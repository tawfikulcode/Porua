window.__pp=(window.__pp||0)+1;
/* ---------- Notifications (bell) ---------- */
const KIND={xp:['#f59e0b',4],badge:['#8b5cf6',21],mission:['#10b981',5],level:['#0ea5e9',3],rank:['#e0a100',15],remind:['#3b82f6',31]};
const kico=k=>{const [c,g]=KIND[k]||KIND.xp;return`<svg ${XM} viewBox="0 0 48 48"><circle cx="24" cy="24" r="22" fill="${c}"/><g transform="translate(12 12)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${G[g]}"/></g></svg>`};
const allNotes=()=>D.notes;
const unread=()=>allNotes().filter(n=>n.at>D.seen).length;
function ago(t){const s=(Date.now()-t)/1000;if(s<60)return'just now';if(s<3600)return Math.floor(s/60)+' min ago';if(s<86400)return Math.floor(s/3600)+' hr ago';const d=new Date(t);return d.getDate()+' '+MS3[d.getMonth()]}
function bellUI(){if(!D)return;const n=unread();$('#bellN').hidden=!n;$('#bellN').textContent=n>99?'99+':n}
function renderBell(){const seen=D.seen,L=allNotes();$('#nList').innerHTML=L.map(n=>`<div class="ni ${n.at>seen?'new':''}">${kico(n.k)}<div style="flex:1;min-width:0"><p>${esc(n.t)}</p><p class="mut sm">${ago(n.at)}</p></div></div>`).join('')||'<p class="mut" style="text-align:center;padding:24px">No notifications yet</p>'}
function openBell(){renderBell();D.seen=Date.now();saveD();bellUI()}
function sysNotify(t,b){if(!('Notification' in window)||Notification.permission!=='granted')return;navigator.serviceWorker&&navigator.serviceWorker.getRegistration().then(r=>r?r.showNotification(t,{body:b,icon:'icon-192.png',badge:'icon-192.png'}):new Notification(t,{body:b})).catch(()=>{})}
/* ---------- Reminder ---------- */
function remUI(){const r=D.rem||{on:false,t:1200};$('#remB').textContent=r.on?'On':'Off';$('#remB').style.background=r.on?'#0a0a0a':'';$('#remB').style.color=r.on?'#fff':'';if(document.activeElement!==$('#remT'))$('#remT').value=hhmm(r.t)}
function setRem(){const m=parseT($('#remT').value);if(m==null){remUI();return toast('Invalid time')}D.rem=Object.assign({on:false},D.rem,{t:m});saveD();remUI()}
async function togRem(){D.rem=Object.assign({t:1200},D.rem);D.rem.on=!D.rem.on;if(D.rem.on&&'Notification' in window){if(Notification.permission==='default'){try{await Notification.requestPermission()}catch(e){}}if(Notification.permission==='denied')toast('Notifications are blocked in your browser')}LS['hm_rem_'+K]='';saveD();remUI();checkRem()}
function checkRem(){if(!D||!D.rem||!D.rem.on)return;const n=new Date(),m=n.getHours()*60+n.getMinutes();if(m>=D.rem.t&&LS['hm_rem_'+K]!==today()&&!todayStats().cnt){LS['hm_rem_'+K]=today();note('remind','Reminder: time to study. Nothing logged today yet.');saveD();bellUI();sysNotify('Porua · পড়ুয়া','Time to study');fx('remind')}}

/* ---------- Level up ---------- */
function levelUp(L,nr){
  const R=rankOf(L),u=$('#up');
  u.innerHTML=`${emb(R,nr?220:170)}<p class="h" style="font-size:16px;letter-spacing:2px">${nr?'RANK UP':'LEVEL UP'}</p><h2 style="font-size:34px">Level ${L}</h2>${nr?`<p class="h" style="font-size:22px;color:${R.c}">${R.n}</p>`:''}<button class="btn b1" style="width:160px;margin-top:12px" onclick="$('#up').classList.remove('on')">Continue</button>`;
  for(let i=0;i<(nr?90:50);i++){const c=document.createElement('i');c.className='cf';c.style.cssText=`left:${Math.random()*100}%;background:hsl(${Math.random()*360} 70% 55%);animation-duration:${2+Math.random()*2}s;animation-delay:${Math.random()*.9}s`;u.appendChild(c)}
  u.classList.add('on');
}

function tickStart(){if(tk)return;tk=1;setInterval(checkRem,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)checkRem()})}

/* ---------- Sound & vibration ---------- */
let AC=null,FXQ=null;
const FX={tap:[[12],[[880,.05,.08]]],ok:[[18,30,18],[[660,.09],[880,.14]]],del:[[35],[[330,.09],[220,.16]]],badge:[[20,40,20,40,40],[[784,.09],[988,.09],[1175,.22]]],up:[[30,60,30,60,30,60,160],[[523,.12],[659,.12],[784,.12],[1047,.4]]],warn:[[25],[[440,.1]]],remind:[[60,60,60],[[880,.1],[880,.12]]]};
const PR={ok:1,badge:2,up:3};
function fxq(k){if(!FXQ||PR[k]>PR[FXQ])FXQ=k}
function fx(k){
  if(!D||D.fx===false||!FX[k])return;const [v,seq]=FX[k];
  try{navigator.vibrate&&navigator.vibrate(v)}catch(e){}
  try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();let t=AC.currentTime;
    seq.forEach(([f,d,vol])=>{const o=AC.createOscillator(),g=AC.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(vol||.16,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(g);g.connect(AC.destination);o.start(t);o.stop(t+d+.03);t+=d*.8})}catch(e){}
}
function fxUI(){const b=$('#fxB');if(!b)return;const on=D.fx!==false;b.textContent=on?'On':'Off';b.style.background=on?'#0a0a0a':'';b.style.color=on?'#fff':''}
function togFx(){D.fx=D.fx===false;saveD();fxUI();if(D.fx)fx('ok')}

/* ---------- In-app confirm dialog ---------- */
const CI={
  trash:'<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#dc2626" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><g class="lid"><path d="M9 14h30M19 14v-4h10v4"/></g><path d="M13 14l2 25a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3l2-25M20 21v13M28 21v13"/></svg>',
  warn:'<svg viewBox="0 0 48 48" width="44" height="44" fill="none" stroke="#d97706" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6L4 41h40zM24 19v10M24 35v.5"/></svg>'};
function ask(o){
  return new Promise(res=>{
    const el=$('#cf');let tm=0;
    el.innerHTML=`<div class="cfc ${o.danger?'dg':''}"><div class="cfi">${CI[o.icon]||CI.warn}</div><h3>${o.title}</h3>${o.html||''}<div class="g2"><button class="btn b2" id="cfN">${o.cancel||'Cancel'}</button><button class="btn cfo" id="cfY"><i></i><span>${o.ok||'OK'}</span></button></div></div>`;
    el.classList.add('on');fx('warn');
    const done=v=>{clearTimeout(tm);el.classList.remove('on');res(v)},y=$('#cfY');
    $('#cfN').onclick=()=>done(false);el.onclick=e=>{if(e.target===el)done(false)};
    if(o.hold){
      const st=()=>{if(tm)return;y.classList.add('hold');tm=setTimeout(()=>done(true),700)},en=()=>{y.classList.remove('hold');clearTimeout(tm);tm=0};
      y.onpointerdown=st;y.onpointerup=en;y.onpointerleave=en;y.onpointercancel=en;y.oncontextmenu=e=>e.preventDefault();
      y.onkeydown=e=>{if((e.key==='Enter'||e.key===' ')&&!e.repeat){e.preventDefault();st()}};y.onkeyup=en;
    }else y.onclick=()=>done(true);
  });
}

/* ---------- Cover photo ---------- */
let CE=null;
function coverMenu(){openM(`<h2 style="font-size:20px;margin-bottom:12px">Cover photo</h2><div class="cvprev" ${D.cover?`style="background-image:url('${D.cover}')"`:''}></div><label class="btn b1 lbtn" style="margin-top:14px">${D.cover?'Change photo':'Upload photo'}<input type="file" accept="image/*" hidden onchange="coverPick(event)"></label>${D.cover?'<button class="btn b2" style="margin-top:10px;color:#dc2626" onclick="coverRemove()">Remove cover</button>':''}<button class="btn b2" style="margin-top:10px" onclick="closeM()">Cancel</button>`)}
function coverPick(e){const f=e.target.files[0];e.target.value='';if(!f)return;if(!/^image\//.test(f.type)){toast('Choose an image file');return}const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{CE={im,z:1,x:.5,y:.5};coverEdit()};im.onerror=()=>toast('Could not read this image');im.src=r.result};r.readAsDataURL(f)}
function coverEdit(){openM(`<h2 style="font-size:20px">Adjust cover</h2><p class="mut sm" style="margin:2px 0 12px">Move and zoom to frame your photo.</p><canvas id="cvc" class="cvc" width="960" height="320"></canvas>
  <div class="rg"><label>Zoom</label><input type="range" min="1" max="3" step="0.01" value="${CE.z}" oninput="CE.z=+this.value;coverDraw()"></div>
  <div class="rg"><label>Left / right</label><input type="range" min="0" max="1" step="0.01" value="${CE.x}" oninput="CE.x=+this.value;coverDraw()"></div>
  <div class="rg"><label>Up / down</label><input type="range" min="0" max="1" step="0.01" value="${CE.y}" oninput="CE.y=+this.value;coverDraw()"></div>
  <div class="g2" style="margin-top:18px"><button class="btn b2" onclick="coverMenu()">Back</button><button class="btn b1" onclick="coverSave()">Save</button></div>`);coverDraw()}
function coverDraw(){const cv=$('#cvc');if(!cv||!CE)return;const c=cv.getContext('2d'),{im,z,x,y}=CE,k=Math.max(960/im.width,320/im.height)*z,w=im.width*k,h=im.height*k;c.fillStyle='#111';c.fillRect(0,0,960,320);c.drawImage(im,-(w-960)*x,-(h-320)*y,w,h)}
function coverSave(){const cv=$('#cvc');if(!cv)return;D.cover=cv.toDataURL('image/jpeg',.82);CE=null;commit();closeM();toast('Cover updated')}
function coverRemove(){delete D.cover;commit();closeM();toast('Cover removed')}

/* ---------- Pin badges ---------- */
let PN=[];
function openPins(){PN=(D.pins||[]).filter(id=>D.unlocked.includes(id));drawPins()}
function drawPins(){const L=ACH.filter(a=>D.unlocked.includes(a.id)),y=($('#sheet')||{}).scrollTop||0;
  openM(`<h2 style="font-size:20px">Pin badges</h2><p class="mut sm" style="margin-bottom:12px">Choose up to 5 · ${PN.length}/5</p>${L.length?`<div class="grid3">${L.map(a=>`<button class="ach ${PN.includes(a.id)?'sel':''}" onclick="togPin('${a.id}')">${icon(a)}<p>${a.t}</p></button>`).join('')}</div>`:'<p class="mut" style="text-align:center;padding:20px">Unlock badges to pin them here</p>'}<button class="btn b1" style="margin-top:16px" onclick="savePins()">Done</button>`);$('#sheet').scrollTop=y}
function togPin(id){const i=PN.indexOf(id);if(i>=0)PN.splice(i,1);else if(PN.length<5)PN.push(id);else toast('You can pin up to 5');drawPins()}
function savePins(){D.pins=PN.slice();saveD();closeM();render()}

/* ---------- Heatmap tap ---------- */
const DFULL=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function hmTap(ev){
  const c=ev.target.closest('.hc[data-d]');if(!c)return;const d=c.dataset.d,S=D.sessions.filter(s=>s.d===d),m=S.reduce((a,s)=>a+s.dur,0),dt=new Date(d+'T00:00');
  openM(`<h2 style="font-size:20px">${DFULL[dt.getDay()]}, ${dt.getDate()} ${MON[dt.getMonth()]} ${dt.getFullYear()}</h2><p class="mut" style="margin-bottom:12px">${m?fmt(m)+' · '+S.length+(S.length>1?' sessions':' session'):'No study logged'}</p>`+S.map(s=>sRow(s)).join('')+`<div class="g2" style="margin-top:8px"><button class="btn b2" onclick="closeM()">Close</button><button class="btn b1" onclick="logFor('${d}')">Log for this day</button></div>`);
}
function logFor(d){closeM();tab('home');$('#dt').value=d;$('#sub').focus()}

