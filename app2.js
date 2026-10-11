window.__pp=(window.__pp||0)+1;
/* ---------- Auth (accounts are stored on this device) ---------- */
const users=()=>J(LS.hm_users,{});
async function hash(p,salt){try{const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(salt+'|'+p));return[...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('')}catch(e){let h=5381;for(const c of salt+p)h=(h*33)^c.charCodeAt(0);return'x'+(h>>>0).toString(36)}}
const aerr=m=>{$('#aErr').textContent=m;$('#aErr').hidden=!m};
function setMode(m){amode=m||(amode==='login'?'reg':'login');$('#aBtn').textContent=amode==='login'?'Log in':'Sign up';$('#aMode').textContent=amode==='login'?'Create account':'I have an account';aerr('')}
async function auth(){
  try{
    const em=$('#aEmail').value.trim().toLowerCase(),pw=$('#aPw').value;
    if(!em||!pw)return aerr('Enter email and password');
    if(!/^\S+@\S+\.\S+$/.test(em))return aerr('Invalid email');
    const us=users(),ph=await hash(pw,em);
    if(amode==='reg'){
      if(us[em])return aerr('This email already has an account. Log in instead.');
      if(pw.length<4)return aerr('Password must be at least 4 characters');
      us[em]={email:em,ph};
    }else{
      if(!us[em])return aerr('No account found. Create one.');
      if(us[em].ph!==ph)return aerr('Wrong email or password');
    }
    LS.hm_users=JSON.stringify(us);LS.hm_cur=em;aerr('');start(em);
  }catch(e){aerr('Error: '+(e&&e.message||e))}
}
function start(uid){
  K=uid;U=users()[uid];if(!U)return logout();
  $('#auth').hidden=true;
  D=Object.assign(blank(),J(LS['hm_d_'+uid],{}));
  if(!U.name)return showSetup(false);
  enterApp();
}
let SB='';
const SF={sName:'name',sBio:'bio',sCls:'cls',sInst:'inst',sRes:'res',sAddr:'addr',sDob:'dob',sAim:'aim',sHob:'hob',sWr:'wr',sBk:'bk'};
function showSetup(edit,from){SB=from||'';$('#app').hidden=true;$('#settings').hidden=true;$('#setup').hidden=false;for(const id in SF)$('#'+id).value=U[SF[id]]||'';$('#sCancel').hidden=!edit;$('#sErr').hidden=true;scrollTo(0,0)}
function leaveSetup(){$('#setup').hidden=true;if(SB==='settings'){$('#settings').hidden=false}else{$('#app').hidden=false;tab('profile')}scrollTo(0,0)}
function cancelSetup(){leaveSetup()}
function saveSetup(){
  const v={};for(const id in SF)v[SF[id]]=$('#'+id).value.trim();
  if(!v.name||!v.cls||!v.inst){$('#sErr').textContent='Fill in name, class and institute';$('#sErr').hidden=false;return}
  const first=!U.name;U=Object.assign(U,v);{const us=users();us[K]=U;LS.hm_users=JSON.stringify(us)}
  saveD();
  if(first){$('#setup').hidden=true;enterApp()}else{leaveSetup();render()}
}
function openSettings(){$('#app').hidden=true;$('#settings').hidden=false;remUI();fxUI();scrollTo(0,0)}
function closeSettings(){$('#settings').hidden=true;$('#app').hidden=false;scrollTo(0,0)}
function aboutSite(){$('#settings').hidden=true;$('#about').hidden=false;renderAbout();scrollTo(0,0)}
function closeAbout(){$('#about').hidden=true;$('#settings').hidden=false;scrollTo(0,0)}
function renderAbout(){
  const x=xpTotal(),L=lvl(x),R=rankOf(L),tm=D.sessions.reduce((a,s)=>a+s.dur,0),ic=d=>`<i><svg viewBox="0 0 24 24"><path d="${d}"/></svg></i>`;
  let kb='–';try{let n=0;for(const k of Object.keys(LS))if(k.indexOf('hm_')===0)n+=(k.length+String(LS[k]).length)*2;kb=(n/1024).toFixed(n<10240?1:0)+' KB'}catch(e){}
  const inst=(matchMedia('(display-mode: standalone)').matches||navigator.standalone)?'Installed app':'Browser';
  const F=[['M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z','Study log','Record every session with subject, topic and time.'],['M13 2L4 14h7l-1 8 9-12h-7z','XP & levels','Every minute earns XP. Level up and climb the ranks.'],['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8z','Missions','Daily, weekly and monthly goals that keep you moving.'],['M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12zM8.5 14L7 21l5-3 5 3-1.5-7','110 badges','Unlock badges and pin your favourites to your profile.'],['M4 20V10M10 20V4M16 20v-8M22 20H2','Reports','Streaks, heatmap and shareable daily and monthly cards.'],['M12 3v12M7 10l5 5 5-5M4 20h16','Works offline','Install it on your phone and study anywhere.']];
  const S=[['Set your daily goal','Choose how many hours you want to study each day.'],['Log what you study','Add a session after every study block.'],['Grow every day','Build streaks, finish missions and watch your rank rise.']];
  $('#aboutBody').innerHTML=`<div class="abh">${logo('bg')}<p class="bt">পড়াশোনাকে অভ্যাসে বদলে দাও</p><p class="tag" style="margin-top:2px">Study hard. Stay consistent. Level up.</p>
  <div class="abm"><div><b>${fmt(tm)}</b><span>Studied</span></div><div><b>${L}</b><span>Level</span></div><div><b>${D.unlocked.length}</b><span>Badges</span></div></div></div>
  <p class="abt">Why Porua</p><p style="text-align:left;font-size:14px;line-height:1.65"><b>Porua</b> means a dedicated student. It turns every hour you study into progress you can see, so showing up each day feels rewarding.</p>
  <p class="abt">What you can do</p><div class="fg">${F.map(f=>`<div class="fc">${ic(f[0])}<b>${f[1]}</b><p>${f[2]}</p></div>`).join('')}</div>
  <p class="abt">How it works</p><div class="card" style="padding:6px 16px">${S.map((t,i)=>`<div class="stp"><em>${i+1}</em><p><b>${t[0]}</b><small>${t[1]}</small></p></div>`).join('')}</div>
  <p class="abt">Ranks</p><div class="card" style="padding:6px 16px">${RK.map(r=>`<div class="rkr">${emb(r,34)}<span style="${r===R?'color:'+(r.c==='#111111'?'#a87800':r.c):''}">${r.n}${r===R?' · you':''}</span><small>Level ${r.min}+</small></div>`).join('')}</div>
  <p class="abt">Your data</p><div class="card" style="text-align:left;font-size:14px;line-height:1.6"><b>Private by design.</b> Everything you add stays on this device. Nothing is uploaded to a server, so clearing your browser data also clears your progress.</div>
  <p class="abt">App info</p><div class="card" style="padding:6px 16px"><div class="inf"><span>Version</span><b>1.0</b></div><div class="inf"><span>Running as</span><b>${inst}</b></div><div class="inf"><span>Connection</span><b>${navigator.onLine?'Online':'Offline'}</b></div><div class="inf"><span>Stored on device</span><b>${kb}</b></div></div>
  <div class="g2" style="margin-top:14px"><button class="btn b1" onclick="shareApp()">Share Porua</button><button class="btn b2" onclick="refreshApp()">Refresh app</button></div>
  <p class="abf">Made with ♥ for every পড়ুয়া<br>© ${new Date().getFullYear()} Porua</p>`}
async function shareApp(){const d={title:'Porua',text:'Track your study, level up every day.',url:location.href.split('?')[0]};try{if(navigator.share)await navigator.share(d);else{await navigator.clipboard.writeText(d.url);toast('Link copied')}}catch(e){}}
async function refreshApp(){try{if('caches' in window)for(const k of await caches.keys())await caches.delete(k);if(navigator.serviceWorker){const r=await navigator.serviceWorker.getRegistration();if(r)await r.update()}}catch(e){}location.reload()}
function enterApp(){
  $('#app').hidden=false;$('#dt').value=today();
  $('#tg').innerHTML=Array.from({length:12},(_,i)=>`<option value="${i+1}">${i+1} hrs</option>`).join('');$('#tg').value=D.target;$('#settings').hidden=true;
  if(!D.seen)D.seen=Date.now();
  try{evaluate(true);if(D.maxLvl<0)D.maxLvl=lvl(xpTotal());saveD();render();prev();tab('home')}catch(e){toast('Error: '+(e&&e.message||e));console.error(e)}
  tickStart();
  const qa=new URLSearchParams(location.search).get('a');if(qa){const m={add:'home',missions:'mission',report:'report'}[qa];if(m){tab(m);if(qa==='add')setTimeout(()=>$('#sub').focus(),300)}history.replaceState(null,'',location.pathname)}
}
function logout(){delete LS.hm_cur;location.reload()}
async function wipe(){if(await ask({icon:'trash',danger:1,hold:1,title:'Reset all data?',html:'<p style="margin:8px 0 18px">All sessions, XP and badges on this device will be deleted. This cannot be undone.</p>',ok:'Hold to reset',cancel:'Cancel'})){const p=D.pic;D=blank();D.pic=p;D.seen=Date.now();fx('del');commit()}}
function setT(v){D.target=+v;commit()}

/* ---------- Time parsing (Bangla digits & words accepted) ---------- */
function parseT(s){
  s=en(s||'').toLowerCase().trim();
  const pm=/pm|পিএম|দুপুর|বিকাল|বিকেল|সন্ধ্যা|রাত/.test(s),am=/am|এএম|সকাল/.test(s),night=/রাত/.test(s);
  s=s.replace(/pm|am|পিএম|এএম|দুপুর|বিকাল|বিকেল|সন্ধ্যা|রাত|সকাল/g,'').trim();
  const m=s.match(/^(\d{1,2})(?:[:.\s](\d{1,2}))?$/);if(!m)return null;
  let h=+m[1],mi=+(m[2]||0);if(mi>59||h>24)return null;
  if(pm||am){if(h<1||h>12)return null;if(night)h=h>=6?h%12+12:h%12;else h=h%12+(pm?12:0)}else if(h===24)h=0;
  return h*60+mi;
}
function prev(){const a=parseT($('#tS').value),b=parseT($('#tE').value),el=$('#tPrev');if(a==null||b==null){el.textContent=($('#tS').value||$('#tE').value)?'Invalid time':'';return}let d=b-a;if(d<=0)d+=1440;el.innerHTML=`<i class="dot" style="background:${colOf(d)}"></i><b>${fmt(d)}</b>`}
async function add(){
  const sub=$('#sub').value.trim(),a=parseT($('#tS').value),b=parseT($('#tE').value),d=$('#dt').value;
  if(!sub)return toast('Enter a subject');if(a==null||b==null)return toast('Enter valid start and end times');if(!d)return toast('Pick a date');
  if(a===b)return toast('Start and end time are the same');
  let dur=b-a;if(dur<0)dur+=1440;
  if(dur>720&&!await ask({icon:'warn',title:'Long session',html:`<p style="margin:8px 0 16px">${fmtL(dur)} from ${hhmm(a)} to ${hhmm(b)}.<br>Is that right?</p>`,ok:'Yes, add',cancel:'Edit'}))return;
  addSession(sub,$('#topic').value.trim(),d,a,dur);
  $('#topic').value='';$('#tS').value='';$('#tE').value='';prev();
}
function addSession(sub,topic,d,sm,dur){
  const s={id:Date.now(),sub,topic,d,st:hhmm(sm),en:hhmm((sm+dur)%1440),sm,dur,col:colOf(dur)};
  D.sessions.unshift(s);const nt=note('xp','+'+Math.floor(dur/2)+' XP · '+sub+' · '+fmt(dur));fxq('ok');commit();
  toast('Added '+sub+' · '+fmt(dur),['Undo',()=>{D.sessions=D.sessions.filter(x=>x.id!==s.id);D.notes=D.notes.filter(n=>n!==nt);commit()}]);
}
const sRow=(s,showDate,withDel)=>`<div class="li" style="border-left-color:${s.col}"><div style="flex:1"><p><b>${esc(s.sub)}</b>${s.topic?' · '+esc(s.topic):''}</p><p class="mut sm">${showDate?dlabel(s.d)+' · ':''}${s.st} – ${s.en}</p></div><b style="color:${s.col};white-space:nowrap">${fmt(s.dur)}</b>${withDel?`<button class="x" onclick="del(${s.id})" aria-label="Delete">✕</button>`:''}</div>`;
async function del(id){
  const s=D.sessions.find(x=>x.id===id);if(!s)return;
  if(await ask({icon:'trash',danger:1,hold:1,title:'Delete this session?',html:`<div style="text-align:left;margin:12px 0 18px">${sRow(s,true)}</div>`,ok:'Hold to delete',cancel:'Keep it'})){D.sessions=D.sessions.filter(x=>x.id!==id);fx('del');commit()}
}

/* ---------- Calculations ---------- */
function daysMap(){const m={};D.sessions.forEach(s=>m[s.d]=(m[s.d]||0)+s.dur);return m}
function streak(m){let c=0;const d=new Date();if(!m[dk(d)])d.setDate(d.getDate()-1);while(m[dk(d)]){c++;d.setDate(d.getDate()-1)}return c}
function weekId(k){const d=new Date(k+'T00:00');d.setDate(d.getDate()-d.getDay());return dk(d)}
function metrics(){
  const S=D.sessions,days=daysMap(),subs={};let eb=0,no=0,tp=0;
  S.forEach(s=>{subs[s.sub]=(subs[s.sub]||0)+s.dur;if(s.sm<360)eb++;if(s.sm>=1380)no++;if(s.topic)tp++});
  const dv=Object.keys(days),dm=Object.values(days),sv=Object.values(subs);
  return{ONE:1,H:S.reduce((a,s)=>a+s.dur,0)/60,STR:streak(days),BS:Math.max(0,...S.map(s=>s.dur)),BD:Math.max(0,...dm)/60,SC:S.length,SUB:sv.length,MC:D.missions.length,TD:dm.filter(x=>x>=D.target*60).length,AD:dv.length,EB:eb,NO:no,TS:Math.max(0,...sv)/60,WE:new Set(dv.filter(k=>{const g=new Date(k+'T00:00').getDay();return g===5||g===6}).map(weekId)).size,TP:tp,PIC:D.pic?1:0};
}
function todayStats(){const T=D.sessions.filter(s=>s.d===today());return{T,min:T.reduce((a,s)=>a+s.dur,0),cnt:T.length,subs:new Set(T.map(s=>s.sub)).size,max:Math.max(0,...T.map(s=>s.dur)),eb:T.filter(s=>s.sm<480).length,nt:T.filter(s=>s.sm>=1200).length,tp:T.filter(s=>s.topic).length,str:streak(daysMap())}}
function xpTotal(){return D.sessions.reduce((a,s)=>a+Math.floor(s.dur/2),0)+D.unlocked.reduce((a,id)=>a+(AX[id]||0),0)+D.missions.reduce((a,m)=>a+m.xp,0)}
function note(k,t){const o={at:Date.now(),k,t};D.notes.unshift(o);if(D.notes.length>150)D.notes.length=150;return o}
function evaluate(quiet){
  const st=mStats(),got=[];
  for(const g of Object.keys(MG)){const {list,lab,key}=MG[g],kk=key();list.forEach(m=>{if(m.v(st[g])>=m.n&&!D.missions.some(x=>x.d===kk&&x.id===m.id)){D.missions.push({d:kk,id:m.id,xp:m.xp});if(!quiet){note('mission',lab+' complete: '+m.t+' · +'+m.xp+' XP');fxq('badge')}}})}
  let ch=true;
  while(ch){ch=false;const M=metrics(),x=xpTotal();M.XPT=x;M.LV=lvl(x);ACH.forEach(a=>{if(!D.unlocked.includes(a.id)&&M[a.k]>=a.n){D.unlocked.push(a.id);got.push(a);ch=true}})}
  if(!quiet&&got.length){got.forEach(a=>note('badge','Badge unlocked: '+a.t+' · +'+a.xp+' XP'));fxq('badge')}
}
function commit(){
  evaluate();const L=lvl(xpTotal());let up=null;
  if(D.maxLvl<0)D.maxLvl=L;
  else if(L>D.maxLvl){const nr=rankOf(L)!==rankOf(D.maxLvl);up=[L,nr];note('level','Reached level '+L);if(nr)note('rank','New rank: '+rankOf(L).n);D.maxLvl=L}
  saveD();render();if(up){fxq('up');levelUp(up[0],up[1])}
  if(FXQ){fx(FXQ);FXQ=null}
}

/* ---------- UI helpers ---------- */
function toast(m,act){while($('#toasts').children.length>2)$('#toasts').firstChild.remove();const e=document.createElement('div');e.className='toast';e.textContent=m;if(act){const b=document.createElement('button');b.textContent=act[0];b.style.cssText='margin-left:12px;font-weight:700;text-decoration:underline;color:#fff';b.onclick=()=>{act[1]();e.remove()};e.appendChild(b);e.style.pointerEvents='auto'}$('#toasts').appendChild(e);setTimeout(()=>e.remove(),act?5000:2800)}
const openM=h=>{$('#sheet').innerHTML=h;$('#ov').classList.add('on')},closeM=()=>$('#ov').classList.remove('on');
function tab(n){
  document.querySelectorAll('.page').forEach(p=>p.classList.toggle('on',p.id==='p-'+n));
  document.querySelectorAll('.dock button').forEach(b=>b.classList.toggle('on',b.dataset.t===n));
  scrollTo(0,0);
    if(n==='bell')openBell();
  if(n==='report'){const h=$('#hmx');h.scrollLeft=h.scrollWidth}
}
const avatar=z=>D.pic?`<img class="av" src="${D.pic}" width="${z}" height="${z}" alt="">`:`<div class="av" style="width:${z}px;height:${z}px;font-size:${z*.45}px">${esc(Array.from(U.name||'?')[0])}</div>`;
function pic(e){const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const c=document.createElement('canvas');c.width=c.height=256;const s=Math.min(im.width,im.height);c.getContext('2d').drawImage(im,(im.width-s)/2,(im.height-s)/2,s,s,0,0,256,256);D.pic=c.toDataURL('image/jpeg',.82);commit()};im.src=r.result};r.readAsDataURL(f)}
function ach(i){const a=ACH[i],M=metrics(),x=xpTotal();M.XPT=x;M.LV=lvl(x);const ok=D.unlocked.includes(a.id),cur=Math.min(M[a.k],a.n),p=Math.round(cur/a.n*100);
  openM(`<div style="text-align:center"><div class="${ok?'':'ach lock'}" style="border:0;padding:0">${icon(a).replace('<svg','<svg width="96" height="96"')}</div><h2 style="font-size:22px;margin-top:8px">${a.t}</h2><p class="mut">+${a.xp} XP</p><div class="bar" style="margin:14px 0 6px"><i style="width:${p}%"></i></div><p>${ok?'Unlocked':+cur.toFixed(1)+' / '+a.n}</p></div><button class="btn b1" style="margin-top:16px" onclick="closeM()">OK</button>`)}

function render(){
  const xp=xpTotal(),L=lvl(xp),R=rankOf(L),M=metrics(),t=todayStats();M.XPT=xp;M.LV=L;
  $('#hAv').innerHTML=avatar(34);
  const pct=Math.min(100,Math.round(t.min/(D.target*60)*100));
  $('#ring').style.strokeDashoffset=251.3*(1-pct/100);$('#rPct').textContent=pct+'%';
  $('#rTxt').textContent=fmt(t.min)+' / '+D.target+'h';$('#stk').textContent='Streak: '+M.STR+(M.STR===1?' day':' days');
  $('#hRank').innerHTML=`${emb(R,28)}<b style="color:${R.c}">${R.n}</b><span class="mut">Level ${L}</span>`;
  const tot={};D.sessions.forEach(s=>tot[s.sub]=(tot[s.sub]||0)+s.dur);const names=Object.keys(tot).sort((a,b)=>tot[b]-tot[a]);
  $('#subs').innerHTML=names.map(n=>`<option value="${esc(n)}">`).join('');
  $('#chips').innerHTML=names.slice(0,5).map(n=>`<button type="button" class="chip" data-s="${esc(n)}" onclick="$('#sub').value=this.dataset.s">${esc(n)}</button>`).join('');
  const row=(s,sd)=>sRow(s,sd,true);
  $('#tHrs').textContent=fmt(t.min);$('#tList').innerHTML=t.T.map(s=>row(s)).join('')||'<p class="mut" style="text-align:center;padding:12px">Nothing logged today</p>';
  {const g=MG[MQ],st=mStats()[MQ],done=D.missions.filter(m=>m.d===g.key()),dx=done.reduce((a,m)=>a+m.xp,0),nw=new Date(),dl=new Date(nw.getFullYear(),nw.getMonth()+1,0).getDate()-nw.getDate()+1,wl=7-nw.getDay();
  [['D','d'],['W','w'],['M','m']].forEach(([a,b])=>$('#mq'+a).classList.toggle('on',MQ===b));
  $('#mReset').textContent=MQ==='d'?'Resets at midnight':MQ==='w'?'Resets in '+wl+(wl>1?' days':' day'):'Resets in '+dl+(dl>1?' days':' day');
  $('#mSum').textContent=done.length+'/'+g.list.length+' · +'+dx+' XP';
  $('#mList').innerHTML=g.list.map(m=>{const ok=done.some(x=>x.id===m.id),v=Math.min(m.n,m.v(st));return`<div class="ms ${ok?'done':''}"><div class="row sp"><span class="mt">${m.t}</span><span class="xpc">+${m.xp} XP</span></div><div class="bar s"><i style="width:${v/m.n*100}%"></i></div><p class="mut sm" style="margin-top:4px">${+v.toFixed(1)} / ${m.n} ${m.u}</p></div>`}).join('')}
  $('#bSum').textContent=D.unlocked.length+'/'+ACH.length;
  $('#bGrid').innerHTML=ACH.map((a,i)=>{const ok=D.unlocked.includes(a.id),p=ok?100:Math.round(Math.min(1,M[a.k]/a.n)*100);return`<button class="ach ${ok?'':'lock'}" onclick="ach(${i})">${icon(a)}<p>${a.t}</p><div class="bar s"><i style="width:${p}%"></i></div></button>`}).join('');
  const days=daysMap(),now=new Date(),ws=new Date(now);ws.setDate(ws.getDate()-ws.getDay());
  const wk=D.sessions.filter(s=>s.d>=dk(ws)).reduce((a,s)=>a+s.dur,0),mo=D.sessions.filter(s=>s.d.slice(0,7)===today().slice(0,7)).reduce((a,s)=>a+s.dur,0);
  $('#rStats').innerHTML=[['Today',t.min],['This week',wk],['This month',mo]].map(([l,v])=>`<div class="stat"><b>${fmt(v)}</b><span class="mut sm">${l}</span></div>`).join('');
  const arr=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);arr.push([d,days[dk(d)]||0])}
  const mx=Math.max(60,...arr.map(a=>a[1]));
  $('#wk7').innerHTML=arr.map(([d,m],i)=>`<div class="bc ${i===6?'n':''}"><span class="sm mut">${m?+(m/60).toFixed(1):''}</span><div class="t"><i style="height:${Math.max(m?6:3,m/mx*100)}%"></i></div><span class="sm">${DAYS[d.getDay()]}</span></div>`).join('');
  {const ti=now.getDay();let tw=0,lw=0,lwf=0;const cm=[];
  for(let i=0;i<7;i++){const a=new Date(ws);a.setDate(ws.getDate()+i);const b=new Date(ws);b.setDate(ws.getDate()+i-7);const x=i>ti?null:(days[dk(a)]||0),y=days[dk(b)]||0;cm.push([DAYS[i],x,y]);if(x!=null)tw+=x;lw+=y;if(i<=ti)lwf+=y}
  const df=tw-lwf,pc=lwf?Math.round(Math.abs(df)/lwf*100):null,m2=Math.max(60,...cm.map(c=>Math.max(c[1]||0,c[2])));
  $('#cmp').innerHTML=`<div class="row sp"><b style="font-size:18px">vs last week</b><b style="color:${df>=0?'#16a34a':'#dc2626'}">${df>=0?'+':'−'}${fmt(Math.abs(df))}${pc!=null?' ('+pc+'%)':''}</b></div><div class="cmp" style="margin-top:12px">${cm.map(([l,x,y])=>`<div class="cc"><div class="t"><i style="height:${Math.max(y?4:2,y/m2*100)}%;background:#d4d4d8"></i><i style="height:${x==null?0:Math.max(x?4:2,x/m2*100)}%;background:#0a0a0a"></i></div><span class="sm">${l}</span></div>`).join('')}</div><div class="row sm mut" style="margin-top:10px;gap:14px"><span><i class="dot" style="background:#d4d4d8"></i> Last week ${fmt(lw)}</span><span><i class="dot" style="background:#0a0a0a"></i> This week ${fmt(tw)}</span></div>`}
  heat(days);
  const all=names.reduce((a,n)=>a+tot[n],0)||1;
  $('#rSub').innerHTML=names.slice(0,6).map(n=>{const p=Math.round(tot[n]/all*100);return`<div style="margin-bottom:10px"><div class="row sp"><span>${esc(n)}</span><span class="mut">${fmt(tot[n])} · ${p}%</span></div><div class="bar s"><i style="width:${p}%;background:${hue(n)}"></i></div></div>`}).join('')||'<p class="mut" style="text-align:center">No data yet</p>';
  $('#rLogs').innerHTML=D.sessions.slice(0,40).map(s=>row(s,true)).join('');
  {const cur=xpAt(L),nx=xpAt(L+1),ac=R.c==='#111111'?'#ffc83d':R.c,bs=bestStreak(days),ic=d=>`<svg viewBox="0 0 24 24"><path d="${d}"/></svg>`,
  handle='@'+(K.split('@')[0].replace(/[^a-z0-9_.]/gi,'')||'porua').toLowerCase(),
  pins=(D.pins||[]).map(id=>ACH.find(a=>a.id===id)).filter(a=>a&&D.unlocked.includes(a.id));
  let age='';if(U.dob){const b=new Date(U.dob+'T00:00'),n=new Date();let y=n.getFullYear()-b.getFullYear();if(n<new Date(n.getFullYear(),b.getMonth(),b.getDate()))y--;if(y>=0&&y<120)age=' · '+y+' yrs'}
  const dob=U.dob?(()=>{const b=new Date(U.dob+'T00:00');return b.getDate()+' '+MON[b.getMonth()]+' '+b.getFullYear()+age})():'';
  const AR=[['M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5','Class',U.cls],['M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6','Institute',U.inst],['M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11zM12 7a3 3 0 1 0 0 6 3 3 0 0 0 0-6z','Address',U.addr],['M6 3h9l4 4v14H6zM9 12h7M9 16h7M9 8h3','Exam result',U.res],['M4 8h16v12H4zM4 8l4-4h8l4 4M12 12v4','Date of birth',dob],['M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11.5v1','Aim in life',U.aim],['M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z','Hobby',U.hob],['M4 20l1-4L16 5l3 3L8 19zM14 7l3 3','Favourite writer',U.wr],['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM8 7h7','Favourite book',U.bk]];
  $('#pro').innerHTML=`<div class="pcard"><div class="cover${D.cover?' has':''}" style="--rc:${ac}${D.cover?`;background-image:url('${D.cover}')`:''}">${D.cover?'':'<span class="cvt">পড়ুয়া</span>'}<button class="cvbtn" onclick="coverMenu()"><svg viewBox="0 0 24 24"><path d="M4 8h3l2-3h6l2 3h3v11H4zM12 17a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>${D.cover?'Edit cover':'Add cover'}</button></div><div class="pb">
  <div class="prow"><label class="avl pav">${avatar(92)}<span class="cam">✎</span><input type="file" accept="image/*" hidden onchange="pic(event)"></label><button class="btn b2 pedit" onclick="showSetup(true)">Edit profile</button></div>
  <h2 class="pname">${esc(U.name)}<span class="rkc" style="color:${ac==='#e0a100'?'#a87800':ac}">${emb(R,22)}${R.n}</span></h2>
  <p class="mut sm">${esc(handle)}</p>
  ${U.bio?`<p class="pbio">${esc(U.bio)}</p>`:''}
  <div class="pmeta"><span>${ic(AR[0][0])}${esc(U.cls)}</span><span>${ic(AR[1][0])}${esc(U.inst)}</span>${U.addr?`<span>${ic(AR[2][0])}${esc(U.addr)}</span>`:''}</div>
  <div class="pn"><div><b>${L}</b><span>Level</span></div><div><b>${D.unlocked.length}</b><span>Badges</span></div><div><b>${D.sessions.length}</b><span>Sessions</span></div><div><b>${bs}</b><span>Best streak</span></div></div>
  <div class="pxp"><div class="row sp"><span>${xp} XP</span><span>${nx-xp} XP to level ${L+1}</span></div><div class="bar s"><i style="width:${(xp-cur)/(nx-cur)*100}%;background:${ac}"></i></div></div>
  </div></div>
  <div class="card"><div class="row sp" style="margin-bottom:10px"><b style="font-size:18px">Pinned badges</b><button class="chip" onclick="openPins()">${pins.length?'Edit':'Pin'}</button></div>
  <div class="pins">${pins.map(a=>`<button onclick="ach(${ACH.indexOf(a)})">${icon(a)}</button>`).join('')||'<p class="e">Pin up to 5 badges to show them here</p>'}</div></div>
  <div class="card"><b style="font-size:18px;display:block;margin-bottom:4px">About</b>${AR.slice(1).map(([d,l,v])=>`<div class="arow">${ic(d)}<div style="min-width:0"><small>${l}</small><p class="${v?'':'no'}">${v?esc(v):'Not added yet'}</p></div></div>`).join('')}</div>`;
  const tm=D.sessions.reduce((a,s)=>a+s.dur,0);
  $('#pStats').innerHTML=[['Current streak',M.STR+(M.STR===1?' day':' days')],['Total time',fmt(tm)],['Missions done',D.missions.length],['Active days',Object.keys(days).length],['Rank',R.n],['XP',xp]].map(([l,v])=>`<div class="stat"><b>${v}</b><span class="mut sm">${l}</span></div>`).join('')}
  $('#pLad').innerHTML=RK.map(r=>`<div class="rk ${L>=r.min?'':'lock'}">${emb(r,52)}<p style="font-size:11px">${r.n}</p><span>Lv ${r.min}+</span></div>`).join('');
  remUI();fxUI();bellUI();if($('#p-bell').classList.contains('on'))renderBell();
}
function heat(days){
  const end=new Date();end.setHours(0,0,0,0);const st=new Date(end);st.setDate(st.getDate()-st.getDay()-25*7);
  let h='<div class="hmw"><div class="dl"><span class="ml"></span>'+['','Mon','','Wed','','Fri',''].map(x=>`<span>${x}</span>`).join('')+'</div>';
  for(let w=0;w<26;w++){let lab='',col='';for(let d=0;d<7;d++){const x=new Date(st);x.setDate(st.getDate()+w*7+d);if(x.getDate()===1&&w>0)lab=MS3[x.getMonth()];
    if(x>end){col+='<i class="hc f"></i>';continue}const m=days[dk(x)]||0;col+=`<i class="hc l${lv5(m)}" data-d="${dk(x)}" title="${x.getDate()} ${MON[x.getMonth()]}: ${m?fmt(m):'0'}"></i>`}
    h+=`<div class="wkc"><span class="ml">${lab}</span>${col}</div>`}
  $('#hmx').innerHTML=h+'</div>';
}

