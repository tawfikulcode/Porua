window.__pp=(window.__pp||0)+1;
const $=s=>document.querySelector(s);
const LS=(()=>{try{const s=window.localStorage;s.setItem('_t','1');s.removeItem('_t');return s}catch(e){return new Proxy({},{deleteProperty(t,k){delete t[k];return true}})}})();
const BNs='০১২৩৪৫৬৭৮৯',en=s=>String(s).replace(/[০-৯]/g,d=>BNs.indexOf(d));
const J=(s,f)=>{try{return JSON.parse(s)||f}catch(e){return f}};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const pad=n=>String(n).padStart(2,'0'),dk=d=>d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate()),today=()=>dk(new Date());
const hhmm=m=>pad(Math.floor(m/60)%24)+':'+pad(m%60);
const fmt=m=>{m=Math.round(m);const h=Math.floor(m/60),r=m%60;return(h?h+'h':'')+(h&&r?' ':'')+(r||!h?r+'m':'')};
const fmtL=m=>{const h=Math.floor(m/60),r=m%60;return(h?h+(h>1?' hrs':' hr'):'')+(h&&r?' ':'')+(r?r+' min':'')};
const colOf=m=>m<30?'#9ca3af':m<60?'#f59e0b':m<90?'#3b82f6':m<120?'#10b981':'#ef4444';
const hue=s=>{let h=0;for(const c of s)h=(h*31+c.charCodeAt(0))%360;return`hsl(${h} 55% 42%)`};
const DAYS=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const MS3=MON.map(m=>m.slice(0,3));
const GREEN=['#ebedf0','#9be9a8','#40c463','#30a14e','#216e39'];
const lv5=m=>m<=0?0:m<60?1:m<120?2:m<240?3:4;
const dlabel=k=>+k.slice(8)+' '+MS3[+k.slice(5,7)-1];

const G=['M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2zM8 7h7','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2','M12 3c1 4 5 5 5 10a5 5 0 0 1-10 0c0-2 1-3 2-4 0 2 1 2 1 2 0-3 0-5 2-8z','M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z','M13 2L4 14h7l-1 8 9-12h-7z','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM12 11.5v1','M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3M12 14v4M8 21h8','M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5','M20 14A8 8 0 0 1 10 4a8 8 0 1 0 10 10z','M4 6h16v14H4zM4 10h16M8 3v4M16 3v4','M4 20l1-4L16 5l3 3L8 19zM14 7l3 3','M12 20s-8-5-8-11a4.5 4.5 0 0 1 8-2.5A4.5 4.5 0 0 1 20 9c0 6-8 11-8 11z','M12 3c4 2 6 6 5 11l-3 3h-4l-3-3c-1-5 1-9 5-11zM9 17l-3 4M15 17l3 4M12 9.5v.5','M5 19C5 9 11 4 20 4c0 9-5 15-15 15zM5 19l8-8','M6 4h12l3 5-9 11L3 9zM3 9h18M9 4l-1 5 4 11M15 4l1 5-4 11','M3 8l4 4 5-7 5 7 4-4-2 11H5z','M12 3l8 3v6c0 5-4 8-8 9-4-1-8-4-8-9V6z','M8 12a4 4 0 1 1 3.5 4L9 18.5H7V21H4v-3l5-5M16 8h.01','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM15.5 8.5L13.5 13.5 8.5 15.5 10.5 10.5z','M3 20l6-11 4 6 3-4 5 9z','M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 11c.6.5 1 1.2 1 2h5c0-.8.4-1.5 1-2A6 6 0 0 0 12 3z','M12 9a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM8.5 10L6 3h4l2 4 2-4h4l-2.5 7','M5 21V4M5 5h13l-3 4 3 4H5','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM8 12l3 3 5-6','M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9','M2 9l10-5 10 5-10 5zM6 11v5c0 1.5 3 3 6 3s6-1.5 6-3v-5','M12 12c-2-3-3-4-5-4a4 4 0 0 0 0 8c2 0 3-1 5-4s3-4 5-4a4 4 0 0 1 0 8c-2 0-3-1-5-4z','M12 2l2 7 7 3-7 3-2 7-2-7-7-3 7-3z','M5 8h11v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4zM16 9h2a2 2 0 0 1 0 5h-2M7 3v2M11 3v2','M4 15v-3a8 8 0 0 1 16 0v3M4 15h3v5H4zM17 15h3v5h-3z','M3 20h18M5 16l4-5 4 3 6-8','M6 17V11a6 6 0 0 1 12 0v6l2 2H4zM10 21h4','M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18','M12 3l9 5-9 5-9-5zM3 13l9 5 9-5','M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z','M21 3L3 11l7 3 3 7zM10 14l11-11'];
const SH=['M24 2a22 22 0 1 0 .01 0z','M24 2l19 7v14c0 12-9 20-19 23C14 43 5 35 5 23V9z','M24 2l19 11v22L24 46 5 35V13z','M14 3h20a11 11 0 0 1 11 11v20a11 11 0 0 1-11 11H14A11 11 0 0 1 3 34V14A11 11 0 0 1 14 3z'];
const XM='xmlns="http://www.w3.org/2000/svg"';
const icon=a=>`<svg ${XM} viewBox="0 0 48 48"><path d="${SH[a.s]}" fill="${a.c}"/><g transform="translate(12 12)" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="${a.g}"/></g></svg>`;
const W3='fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"';
const SHD='M24 3l17 6v13c0 11-8 18-17 21C15 40 7 33 7 22V9z';
const burst=(R,r,n)=>Array.from({length:n*2},(_,i)=>{const a=Math.PI*i/n-Math.PI/2,q=i%2?r:R;return(24+q*Math.cos(a)).toFixed(1)+','+(24+q*Math.sin(a)).toFixed(1)}).join(' ');
const RK=[
{n:'Silver',min:0,c:'#8e99a8',s:c=>`<path d="${SHD}" fill="${c}"/><path d="M16 21l8-7 8 7M16 29l8-7 8 7" ${W3}/>`},
{n:'Gold',min:5,c:'#e0a100',s:c=>`<path d="${SHD}" fill="${c}"/><path d="M24 12l3.2 6.6 7.2 1-5.2 5 1.2 7.2L24 28.5l-6.4 3.3 1.2-7.2-5.2-5 7.2-1z" fill="#fff"/>`},
{n:'Diamond',min:10,c:'#1ea5e6',s:c=>`<path d="M13 6h22l9 11-20 25L4 17z" fill="${c}"/><path d="M4 17h40M17 6l-3 11 10 25M31 6l3 11-10 25" ${W3.replace('3"','2"')}/>`},
{n:'Heroic',min:15,c:'#e8452c',s:c=>`<path d="M24 2l19 11v22L24 46 5 35V13z" fill="${c}"/><path d="M24 11v22M17 28h14M24 33v5M20 14l4-3 4 3" ${W3}/>`},
{n:'Master',min:22,c:'#7c4dff',s:c=>`<circle cx="24" cy="24" r="21" fill="${c}"/><path d="M11 31l-2-13 8 6 7-10 7 10 8-6-2 13z" fill="#fff"/><path d="M13 37h22" ${W3}/>`},
{n:'Grandmaster',min:30,c:'#c026a3',s:c=>`<polygon points="${burst(22,17,10)}" fill="${c}"/><path d="M24 12l3.2 6.6 7.2 1-5.2 5 1.2 7.2L24 28.5l-6.4 3.3 1.2-7.2-5.2-5 7.2-1z" fill="#fff"/>`},
{n:'Legend',min:40,c:'#111111',s:c=>`<path d="${SHD}" fill="#111" stroke="#ffc83d" stroke-width="2"/><path d="M24 10c1 6 8 8 8 16a8 8 0 0 1-16 0c0-4 2-6 4-8 0 3 1 4 2 4 0-4 0-8 2-12z" fill="#ffc83d"/>`}];
const emb=(r,z=48)=>`<svg ${XM} viewBox="0 0 48 48" width="${z}" height="${z}">${r.s(r.c)}</svg>`;
const rankOf=l=>RK.reduce((a,x)=>l>=x.min?x:a,RK[0]);
const xpAt=l=>25*l*(l+1),lvl=x=>Math.floor((Math.sqrt(1+4*x/25)-1)/2);


/* ---------- Badges (110) ---------- */
const GR=[
['H',[1,5,10,25,50,75,100,150,200,300,400,500,750,1000,2000],n=>n+(n>1?' hrs':' hr')+' studied'],
['STR',[2,3,5,7,10,14,21,30,45,60,90,120,180,365],n=>n+'-day streak'],
['BS',[30,60,90,120,180,240],n=>'One session: '+fmtL(n)],
['BD',[2,4,6,8,10,12],n=>n+' hrs in a day'],
['SC',[1,5,10,25,50,100,200,500,1000],n=>n+(n>1?' sessions':' session')],
['SUB',[2,3,5,8,10,15],n=>n+' subjects'],
['LV',[5,10,15,20,25,30,40,50],n=>'Level '+n],
['XPT',[500,1000,2500,5000,10000,25000],n=>n+' XP'],
['MC',[1,10,25,50,100,250,500],n=>n+(n>1?' missions':' mission')],
['TD',[1,5,10,20,30,50,100],n=>n+' goal days'],
['AD',[7,14,30,60,100,200,365,500],n=>n+' active days'],
['EB',[1,10,30],n=>'Before 6 AM ×'+n],
['NO',[1,10,30],n=>'After 11 PM ×'+n],
['TS',[10,25,50,100],n=>n+' hrs in one subject'],
['WE',[1,10,25],n=>n+(n>1?' weekends':' weekend')],
['TP',[10,50,100],n=>n+' topics logged'],
['PIC',[1],()=>'Profile photo']];
const ACH=[{k:'ONE',n:1,t:'First step',xp:10}];
GR.forEach(([k,ths,t])=>ths.forEach((n,j)=>ACH.push({k,n,t:t(n),xp:(j+1)*15})));
ACH.forEach((a,i)=>{a.id='a'+i;a.g=G[(i*5)%36];a.s=Math.floor(i/36);a.c=`hsl(${Math.round(i*137.508)%360} 62% ${36+(i%3)*5}%)`});
const AX={};ACH.forEach(a=>AX[a.id]=a.xp);

/* ---------- Daily missions (19) ---------- */
const MS=[
{id:'m1',t:'First session today',xp:10,n:1,u:'sessions',v:t=>t.cnt},
{id:'m2',t:'Study 1 hour',xp:10,n:1,u:'hrs',v:t=>t.min/60},
{id:'m3',t:'Study 2 hours',xp:12,n:2,u:'hrs',v:t=>t.min/60},
{id:'m4',t:'Study 3 hours',xp:14,n:3,u:'hrs',v:t=>t.min/60},
{id:'m5',t:'Study 5 hours',xp:18,n:5,u:'hrs',v:t=>t.min/60},
{id:'m6',t:'Reach your daily goal',xp:20,get n(){return D.target},u:'hrs',v:t=>t.min/60},
{id:'m7',t:'Study 2 subjects',xp:12,n:2,u:'subjects',v:t=>t.subs},
{id:'m8',t:'Study 3 subjects',xp:15,n:3,u:'subjects',v:t=>t.subs},
{id:'m9',t:'Study 4 subjects',xp:18,n:4,u:'subjects',v:t=>t.subs},
{id:'m10',t:'3 sessions',xp:12,n:3,u:'sessions',v:t=>t.cnt},
{id:'m11',t:'5 sessions',xp:16,n:5,u:'sessions',v:t=>t.cnt},
{id:'m12',t:'One 60-min session',xp:12,n:60,u:'min',v:t=>t.max},
{id:'m13',t:'One 90-min session',xp:15,n:90,u:'min',v:t=>t.max},
{id:'m14',t:'One 120-min session',xp:18,n:120,u:'min',v:t=>t.max},
{id:'m15',t:'Start before 8 AM',xp:14,n:1,u:'sessions',v:t=>t.eb},
{id:'m16',t:'Study after 8 PM',xp:12,n:1,u:'sessions',v:t=>t.nt},
{id:'m17',t:'Log a topic',xp:10,n:1,u:'sessions',v:t=>t.tp},
{id:'m18',t:'3-day streak',xp:15,n:3,u:'days',v:t=>t.str},
{id:'m19',t:'7-day streak',xp:20,n:7,u:'days',v:t=>t.str}];

const MW=[
{id:'w1',t:'Study 10 hours',xp:40,n:10,u:'hrs',v:t=>t.min/60},
{id:'w2',t:'Study 15 hours',xp:60,n:15,u:'hrs',v:t=>t.min/60},
{id:'w3',t:'Study 25 hours',xp:100,n:25,u:'hrs',v:t=>t.min/60},
{id:'w4',t:'Study on 4 days',xp:40,n:4,u:'days',v:t=>t.days},
{id:'w5',t:'Study on 6 days',xp:60,n:6,u:'days',v:t=>t.days},
{id:'w6',t:'Study all 7 days',xp:100,n:7,u:'days',v:t=>t.days},
{id:'w7',t:'Hit your goal on 3 days',xp:50,n:3,u:'days',v:t=>t.goal},
{id:'w8',t:'Hit your goal on 5 days',xp:80,n:5,u:'days',v:t=>t.goal},
{id:'w9',t:'Study 5 subjects',xp:50,n:5,u:'subjects',v:t=>t.subs},
{id:'w10',t:'Log 15 sessions',xp:50,n:15,u:'sessions',v:t=>t.cnt}];
const MO=[
{id:'o1',t:'Study 40 hours',xp:150,n:40,u:'hrs',v:t=>t.min/60},
{id:'o2',t:'Study 80 hours',xp:250,n:80,u:'hrs',v:t=>t.min/60},
{id:'o3',t:'Study 120 hours',xp:400,n:120,u:'hrs',v:t=>t.min/60},
{id:'o4',t:'Study on 15 days',xp:150,n:15,u:'days',v:t=>t.days},
{id:'o5',t:'Study on 25 days',xp:250,n:25,u:'days',v:t=>t.days},
{id:'o6',t:'Hit your goal on 10 days',xp:200,n:10,u:'days',v:t=>t.goal},
{id:'o7',t:'Hit your goal on 20 days',xp:350,n:20,u:'days',v:t=>t.goal},
{id:'o8',t:'Study 8 subjects',xp:150,n:8,u:'subjects',v:t=>t.subs},
{id:'o9',t:'Log 50 sessions',xp:200,n:50,u:'sessions',v:t=>t.cnt},
{id:'o10',t:'Reach a 14-day streak',xp:250,n:14,u:'days',v:t=>t.str}];
const MG={d:{list:MS,lab:'Mission',key:()=>today()},w:{list:MW,lab:'Weekly mission',key:()=>'W'+weekId(today())},m:{list:MO,lab:'Monthly mission',key:()=>'M'+today().slice(0,7)}};
let MQ=LS.hm_mq||'d';
function pStats(f){const S=D.sessions.filter(s=>f(s.d)),dm={},sb=new Set();let tp=0;S.forEach(s=>{dm[s.d]=(dm[s.d]||0)+s.dur;sb.add(s.sub);if(s.topic)tp++});const v=Object.values(dm);return{min:S.reduce((a,s)=>a+s.dur,0),cnt:S.length,subs:sb.size,days:v.length,goal:v.filter(x=>x>=D.target*60).length,tp,str:streak(daysMap())}}
function mStats(){const td=today(),w=weekId(td);return{d:todayStats(),w:pStats(d=>d>=w),m:pStats(d=>d.slice(0,7)===td.slice(0,7))}}
function setMq(q){MQ=q;LS.hm_mq=q;render()}
function bestStreak(m){const ks=Object.keys(m).sort();let b=0,c=0,pv=null;for(const k of ks){if(pv&&Math.round((new Date(k+'T00:00')-new Date(pv+'T00:00'))/864e5)===1)c++;else c=1;if(c>b)b=c;pv=k}return b}

/* ---------- Logo ---------- */
const MARK=`<svg ${XM} viewBox="0 0 48 48"><rect width="48" height="48" rx="13" fill="#0a0a0a"/><path d="M7 36c6-3 9 2 17-1s11 1 17-2" stroke="#ffd43b" stroke-width="5" stroke-linecap="round" fill="none"/><path d="M9 14c5-2 10-1 15 2v18c-5-3-10-4-15-2z" fill="#fff"/><path d="M39 14c-5-2-10-1-15 2v18c5-3 10-4 15-2z" fill="#e5e7eb"/><path d="M27.5 9h5.5v11l-2.75-2.2L27.5 20z" fill="#ffd43b"/><path d="M12 6.5l1 2.3 2.3 1-2.3 1-1 2.3-1-2.3-2.3-1 2.3-1z" fill="#ffd43b"/></svg>`;
const logo=k=>k==='hd'?`<img class="lgi hd" src="logo-full.png" alt="Porua · পড়ুয়া">`:`<img class="lgi bg" src="logo-full.png" alt="Porua · পড়ুয়া">`;
document.querySelectorAll('[data-logo]').forEach(e=>e.innerHTML=logo(e.dataset.logo));

/* ---------- State ---------- */
let K=null,U=null,D=null,amode='login',tk=0;
const blank=()=>({sessions:[],unlocked:[],missions:[],target:6,pic:'',rem:{on:false,t:1200},fx:true,ts:0,maxLvl:-1,notes:[],seen:0,pins:[]});
const saveD=()=>{try{LS['hm_d_'+K]=JSON.stringify(D)}catch(e){toast('Storage is full')}};

