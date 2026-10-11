window.__pp=(window.__pp||0)+1;
/* ---------- Report card (canvas) ---------- */
const rr=(c,x,y,w,h,r,f,s)=>{c.beginPath();c.roundRect?c.roundRect(x,y,w,h,r):c.rect(x,y,w,h);if(f){c.fillStyle=f;c.fill()}if(s){c.strokeStyle=s;c.lineWidth=2;c.stroke()}};
const tx=(c,s,x,y,f,col,al)=>{c.font=f;c.fillStyle=col;c.textAlign=al||'left';c.textBaseline='alphabetic';c.fillText(s,x,y)};
const cut=(c,s,w)=>{while(c.measureText(s).width>w&&s.length>1)s=s.slice(0,-1);return s};
const loadImg=u=>new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src=u});
async function exportCard(type){
  try{await Promise.all([document.fonts.load('700 40px Inter'),document.fonts.load('500 24px Inter'),document.fonts.load('700 40px "Anek Bangla"','রাফি'),document.fonts.load('500 24px "Anek Bangla"','রাফি')])}catch(e){}
  const xp=xpTotal(),L=lvl(xp),R=rankOf(L),W=1080,P=64,daily=type==='d',now=new Date();
  const em=await loadImg('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(emb(R,240))),av=D.pic?await loadImg(D.pic):null,cvI=D.cover?await loadImg(D.cover):null,lgI=await loadImg(typeof LOGO_URI==='string'?LOGO_URI:'');
  const HF='Inter,"Anek Bangla"',BF='Inter,"Anek Bangla"',days=daysMap(),t=todayStats();
  const ym=today().slice(0,7),MSn=D.sessions.filter(s=>s.d.slice(0,7)===ym);
  const title=daily?now.toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'}):MON[now.getMonth()]+' '+now.getFullYear();
  let stt;
  if(daily){const dx=t.T.reduce((a,s)=>a+Math.floor(s.dur/2),0)+D.missions.filter(m=>m.d===today()).reduce((a,m)=>a+m.xp,0);stt=[[fmt(t.min),'Total time'],[''+t.cnt,'Sessions'],[''+t.str,'Streak'],['+'+dx,'XP']]}
  else{const tm=MSn.reduce((a,s)=>a+s.dur,0),ad=Object.keys(days).filter(k=>k.slice(0,7)===ym),best=Math.max(0,...ad.map(k=>days[k]));stt=[[fmt(tm),'Total time'],[''+ad.length,'Active days'],[fmt(ad.length?tm/ad.length:0),'Daily avg'],[fmt(best),'Best day']]}
  const paint=(c,H)=>{
    c.fillStyle='#fff';c.fillRect(0,0,W,H);c.fillStyle='#0a0a0a';c.fillRect(0,0,W,270);if(cvI){const k=Math.max(W/cvI.width,270/cvI.height),w=cvI.width*k,h=cvI.height*k;c.save();c.beginPath();c.rect(0,0,W,270);c.clip();c.drawImage(cvI,(W-w)/2,(270-h)/2,w,h);c.fillStyle='rgba(10,10,10,.58)';c.fillRect(0,0,W,270);c.restore()}
    c.save();c.beginPath();c.arc(P+65,135,65,0,7);c.clip();if(av)c.drawImage(av,P,70,130,130);else{c.fillStyle='#fff';c.fillRect(P,70,130,130);tx(c,Array.from(U.name)[0]||'?',P+65,158,`700 64px ${HF}`,'#0a0a0a','center')}c.restore();
    c.font=`700 52px ${HF}`;tx(c,cut(c,U.name,520),P+160,125,`700 52px ${HF}`,'#fff');c.font=`500 28px ${BF}`;tx(c,cut(c,'Class '+U.cls+' · '+U.inst,520),P+160,175,`500 28px ${BF}`,'#bdbdbd');
    if(em)c.drawImage(em,W-P-120,38,120,120);tx(c,R.n+' · Level '+L,W-P,205,`600 28px ${BF}`,'#fff','right');
    let y=346;tx(c,title,P,y,`700 40px ${HF}`,'#0a0a0a');tx(c,daily?'Daily report':'Monthly report',W-P,y,`500 26px ${BF}`,'#6b7280','right');y+=36;
    const bw=(W-2*P-60)/4;stt.forEach((s,i)=>{const x=P+i*(bw+20);rr(c,x,y,bw,150,24,'#f4f4f5');tx(c,s[0],x+bw/2,y+80,`700 44px ${HF}`,'#0a0a0a','center');tx(c,s[1],x+bw/2,y+120,`500 24px ${BF}`,'#6b7280','center')});y+=190;
    if(daily){
      const p=Math.min(100,Math.round(t.min/(D.target*60)*100));tx(c,'Goal: '+D.target+'h',P,y+14,`600 28px ${BF}`,'#0a0a0a');tx(c,p+'%',W-P,y+14,`700 32px ${HF}`,'#0a0a0a','right');
      rr(c,P,y+34,W-2*P,26,13,'#ececec');if(p)rr(c,P,y+34,Math.max(26,(W-2*P)*p/100),26,13,'#0a0a0a');y+=120;
      tx(c,"Today's sessions",P,y,`700 34px ${HF}`,'#0a0a0a');y+=24;
      t.T.slice(0,8).forEach(s=>{rr(c,P,y,W-2*P,100,22,'#fff','#e5e7eb');rr(c,P,y,12,100,6,s.col);c.font=`700 34px ${HF}`;tx(c,cut(c,s.sub,520),P+40,y+44,`700 34px ${HF}`,'#0a0a0a');c.font=`500 24px ${BF}`;tx(c,cut(c,s.st+' – '+s.en+(s.topic?' · '+s.topic:''),560),P+40,y+78,`500 24px ${BF}`,'#6b7280');tx(c,fmt(s.dur),W-P-28,y+62,`700 38px ${HF}`,s.col,'right');y+=116});
      if(t.T.length>8){tx(c,'+'+(t.T.length-8)+' more',W/2,y+24,`500 26px ${BF}`,'#6b7280','center');y+=50}
      if(!t.T.length){tx(c,'No sessions today',W/2,y+60,`500 30px ${BF}`,'#6b7280','center');y+=110}
    }else{
      const by={};MSn.forEach(s=>by[s.sub]=(by[s.sub]||0)+s.dur);const ns=Object.keys(by).sort((a,b)=>by[b]-by[a]),tm=MSn.reduce((a,s)=>a+s.dur,0)||1;
      tx(c,'Subjects',P,y,`700 34px ${HF}`,'#0a0a0a');y+=30;
      ns.slice(0,7).forEach(n=>{const p=Math.round(by[n]/tm*100);c.font=`600 30px ${BF}`;tx(c,cut(c,n,520),P,y+30,`600 30px ${BF}`,'#0a0a0a');tx(c,fmt(by[n])+' · '+p+'%',W-P,y+30,`500 26px ${BF}`,'#6b7280','right');rr(c,P,y+46,W-2*P,18,9,'#ececec');rr(c,P,y+46,Math.max(18,(W-2*P)*p/100),18,9,hue(n));y+=88});
      if(!ns.length){tx(c,'No sessions this month',W/2,y+50,`500 30px ${BF}`,'#6b7280','center');y+=90}
      y+=24;tx(c,'Daily activity',P,y,`700 34px ${HF}`,'#0a0a0a');y+=24;
      const f=new Date(now.getFullYear(),now.getMonth(),1),dn=new Date(now.getFullYear(),now.getMonth()+1,0).getDate(),cw=124,gx=(W-2*P-7*cw)/6,ch=70;
      DAYS.forEach((d,i)=>tx(c,d,P+i*(cw+gx)+cw/2,y+24,`500 22px ${BF}`,'#6b7280','center'));y+=38;
      for(let d=1;d<=dn;d++){const i=f.getDay()+d-1,cx=P+(i%7)*(cw+gx),cy=y+Math.floor(i/7)*(ch+12),l=lv5(days[ym+'-'+pad(d)]||0);rr(c,cx,cy,cw,ch,14,GREEN[l]);tx(c,''+d,cx+14,cy+30,`600 24px ${BF}`,l>2?'#fff':'#374151')}
      y+=Math.ceil((f.getDay()+dn)/7)*(ch+12)+10;
    }
    if(lgI){const w=Math.min(260,W*.26),h=w*lgI.height/lgI.width;c.drawImage(lgI,(W-w)/2,y+28,w,h);return y+h+72}tx(c,'পড়ুয়া · Porua',W/2,y+50,`800 34px ${HF}`,'#9ca3af','center');return y+100};
  const H=Math.ceil(paint(document.createElement('canvas').getContext('2d'),4000)),cv=document.createElement('canvas');cv.width=W;cv.height=H;paint(cv.getContext('2d'),H);
  const url=cv.toDataURL('image/png'),name='Porua-'+(daily?today():ym)+'.png';
  window._exp={cv,name};
  openM(`<img src="${url}" style="width:100%;border:1px solid var(--line);border-radius:12px" alt=""><div class="g2" style="margin-top:14px"><a class="btn b1" href="${url}" download="${name}">Save</a><button class="btn b2" onclick="shareCard()">Share</button></div>`);
}
function shareCard(){const e=window._exp;e.cv.toBlob(b=>{const f=new File([b],e.name,{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[f]}))navigator.share({files:[f]}).catch(()=>{});else toast('Sharing not supported. Use Save.')})}

/* ---------- Start ---------- */
(function(){window.__porua=1;try{setMode('login');const k=LS.hm_cur;if(k&&users()[k])start(k);else $('#auth').hidden=false}catch(e){try{$('#auth').hidden=false;toast('Error: '+(e&&e.message||e))}catch(x){}console.error(e)}
  const sp=document.getElementById('splash');if(!sp)return;let gone=false;
  const hide=()=>{if(gone)return;gone=true;sp.classList.add('out');setTimeout(()=>sp.remove(),800)};
  const go=()=>setTimeout(hide,Math.max(250,2000-performance.now()));
  if(document.readyState==='complete')go();else addEventListener('load',go);
  setTimeout(hide,5000)})();


