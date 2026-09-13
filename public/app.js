const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const icon={
 home:'<svg viewBox="0 0 24 24"><path d="M3 10.5 12 3l9 7.5v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
 search:'<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/></svg>',
 library:'<svg viewBox="0 0 24 24"><path d="M4 5h3v14H4zM10.5 5h3v14h-3zM17 5h3v14h-3z"/></svg>',
 heart:'<svg viewBox="0 0 24 24"><path d="M20.8 8.7c0 5.5-8.8 10.3-8.8 10.3S3.2 14.2 3.2 8.7A4.7 4.7 0 0 1 12 6.1a4.7 4.7 0 0 1 8.8 2.6Z"/></svg>',
 clock:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>',
 playlist:'<svg viewBox="0 0 24 24"><path d="M4 6h11M4 10h11M4 14h7M17 7v11a3 3 0 1 1-2-2.8V7l5-1v9"/></svg>',
 download:'<svg viewBox="0 0 24 24"><path d="M12 4v10m0 0 4-4m-4 4-4-4M5 19h14"/></svg>',
 activity:'<svg viewBox="0 0 24 24"><path d="M3 12h4l2-6 4 12 2-6h6"/></svg>',
 stats:'<svg viewBox="0 0 24 24"><path d="M5 19V9M12 19V5M19 19v-7"/></svg>',
 settings:'<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.8 1.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V20h-2.6v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-1.8-1.8.1-.1A1.7 1.7 0 0 0 8 15a1.7 1.7 0 0 0-1.6-1H6v-2.6h.4A1.7 1.7 0 0 0 8 10a1.7 1.7 0 0 0-.3-1.9l-.1-.1 1.8-1.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V5H15v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 1.8 1.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1V14H21a1.7 1.7 0 0 0-1.6 1Z"/></svg>',
 shield:'<svg viewBox="0 0 24 24"><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>',
 play:'<svg viewBox="0 0 24 24"><path d="m8 5 11 7-11 7z"/></svg>',
 pause:'<svg viewBox="0 0 24 24"><path d="M8 5v14M16 5v14"/></svg>',
 prev:'<svg viewBox="0 0 24 24"><path d="M6 5v14M18 7l-8 5 8 5z"/></svg>',
 rewind10:'<svg viewBox="0 0 32 24"><path d="M11 6 5 10l6 4"/><path d="M6 10h9a6 6 0 1 1-5 9"/><text x="19" y="14" font-size="8" text-anchor="middle" font-family="Arial" font-weight="700">10</text></svg>',
 forward10:'<svg viewBox="0 0 32 24"><path d="M21 6l6 4-6 4"/><path d="M26 10h-9a6 6 0 1 0 5 9"/><text x="13" y="14" font-size="8" text-anchor="middle" font-family="Arial" font-weight="700">10</text></svg>',
 next:'<svg viewBox="0 0 24 24"><path d="M18 5v14M6 7l8 5-8 5z"/></svg>',
 shuffle:'<svg viewBox="0 0 24 24"><path d="M4 7h3c4 0 6 10 10 10h3M17 5l3 2-3 2M17 15l3 2-3 2M4 17h3c1.2 0 2.2-.7 3-1.7"/></svg>',
 repeat:'<svg viewBox="0 0 24 24"><path d="M17 7H7a3 3 0 0 0 0 6h1M7 17h10a3 3 0 0 0 0-6h-1M15 5l2 2-2 2M9 15l-2 2 2 2"/></svg>',
 queue:'<svg viewBox="0 0 24 24"><path d="M4 6h11M4 10h11M4 14h8M4 18h7M18 14v6m0 0 3-2m-3 2-3-2"/></svg>',
 more:'<svg viewBox="0 0 24 24"><circle cx="5" cy="12" r="1.2"/><circle cx="12" cy="12" r="1.2"/><circle cx="19" cy="12" r="1.2"/></svg>',
 close:'<svg viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18"/></svg>',
 back:'<svg viewBox="0 0 24 24"><path d="m14 5-7 7 7 7M7 12h13"/></svg>',
 upload:'<svg viewBox="0 0 24 24"><path d="M12 16V4m0 0L8 8m4-4 4 4M5 19h14"/></svg>',
 trash:'<svg viewBox="0 0 24 24"><path d="M5 7h14M10 11v5M14 11v5M8 7l1-3h6l1 3m-9 0 1 13h8l1-13"/></svg>'
};
const svg=n=>icon[n]||'';
const audio=$('#audio');
const fallback='data:image/svg+xml,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600"><rect width="600" height="600" fill="#121217"/><circle cx="300" cy="300" r="205" fill="url(#g)"/><defs><linearGradient id="g"><stop stop-color="#a43cff"/><stop offset=".6" stop-color="#26c7e8"/><stop offset="1" stop-color="#26d59a"/></linearGradient></defs><text x="300" y="340" text-anchor="middle" fill="white" font-size="120" font-family="Arial" font-weight="800">S</text></svg>`);
let songs=[],playlists=[],page='home',current=null,queue=[],qIndex=0,shuffle=false,repeat='off',user=localStorage.getItem('synthUser')||'',owner=false,ownerCandidate=false,ownerKey=localStorage.getItem('synthOwnerKey')||'',ownerEmail='';
function safeJSON(key,fallback){try{const v=JSON.parse(localStorage.getItem(key));return v??fallback}catch{return fallback}}
let favorites=new Set(safeJSON('favorites:'+user,[]));let recent=safeJSON('recent:'+user,[]);let listened=Number(localStorage.getItem('listenedSeconds:'+user)||0);let listenTimer=null;
const IS_NATIVE_APP=!!(window.Capacitor?.isNativePlatform?.());
const API_BASE=(IS_NATIVE_APP?(window.SYNTH_SERVER_URL||''):(window.location.origin||'')).replace(/\/$/,'');
const resourceUrl=u=>{
  const raw=String(u||'');
  if(!raw)return '';
  try{
    const x=new URL(raw,window.location.href);
    const host=x.hostname;
    if(host==='localhost'||host==='127.0.0.1'||/^10\\./.test(host)||/^192\\.168\\./.test(host)||/^172\\.(1[6-9]|2\\d|3[0-1])\\./.test(host)){
      return window.location.origin+x.pathname+x.search;
    }
    return x.href;
  }catch{return raw.startsWith('/')?window.location.origin+raw:raw}
};
const apiCache=new Map();
const apiInflight=new Map();
const api=async(u,o={})=>{
  const target=/^https?:\/\//i.test(u)?u:(API_BASE+u);
  const method=String(o.method||'GET').toUpperCase();
  const cacheKey=method==='GET'?target:'';
  if(method==='GET' && apiInflight.has(cacheKey)) return apiInflight.get(cacheKey);
  const run=(async()=>{
    const r=await fetch(target,{...o,cache:o.cache||'no-store'});
    if(!r.ok)throw Error((await r.json().catch(()=>({}))).error||'Request failed');
    return r.status===204?null:r.json();
  })();
  if(cacheKey)apiInflight.set(cacheKey,run);
  try{return await run}finally{if(cacheKey)apiInflight.delete(cacheKey)}
};
const formatBytes=b=>{b=Number(b)||0;if(b<1024)return `${b} B`;if(b<1024**2)return `${(b/1024).toFixed(1)} KB`;if(b<1024**3)return `${(b/1024**2).toFixed(1)} MB`;return `${(b/1024**3).toFixed(2)} GB`},cover=s=>s?.cover||fallback,fmt=x=>{x=Math.max(0,Math.floor(Number(x)||0));return `${Math.floor(x/60)}:${String(x%60).padStart(2,'0')}`},mins=s=>`${Math.floor(s/60)} min`;
function saveUserState(){localStorage.setItem('favorites:'+user,JSON.stringify([...favorites]));localStorage.setItem('recent:'+user,JSON.stringify(recent));localStorage.setItem('listenedSeconds:'+user,String(listened))}
async function migrateLegacyDownloads(){for(const s of songs){const raw=localStorage.getItem('download:'+s.id);if(!raw||!raw.startsWith('data:'))continue;try{const r=await fetch(raw);const b=await r.blob();await putOffline(s.id,b);localStorage.removeItem('download:'+s.id)}catch{}}}
async function init(){try{const c=await api('/api/config');ownerEmail=String(c.ownerEmail||'').trim().toLowerCase()}catch{}ownerCandidate=!!user&&!!ownerEmail&&user.trim().toLowerCase()===ownerEmail;if(ownerKey){try{await api('/api/admin/stats',{headers:{'x-admin-key':ownerKey}});owner=true}catch{owner=false;ownerKey='';localStorage.removeItem('synthOwnerKey');localStorage.removeItem('synthOwnerEmail')}}if(user){ownerCandidate=!!ownerEmail&&user.trim().toLowerCase()===ownerEmail;favorites=new Set(safeJSON('favorites:'+user,[]));recent=safeJSON('recent:'+user,[]);listened=Number(localStorage.getItem('listenedSeconds:'+user)||0);await refreshData();}else renderLogin();if(location.hash==='#owner')ownerGate()}
let lastCatalogSignature='';
let downloadMigrationStarted=false;
function catalogSignature(list){return JSON.stringify((list||[]).map(s=>[s.id,s.title,s.artist,s.album,s.genre,s.language,s.cover,s.file,s.plays,s.updatedAt]).sort((a,b)=>String(a[0]).localeCompare(String(b[0]))))}
async function refreshData({silent=false}={}){
  const email=encodeURIComponent(user);
  const [nextSongs,nextPlaylists,stats]=await Promise.all([
    api('/api/songs'),
    api('/api/playlists?userEmail='+email),
    api('/api/user/stats?userEmail='+email).catch(()=>null)
  ]);
  const normalizedSongs=Array.isArray(nextSongs)?nextSongs:[];
  const normalizedPlaylists=Array.isArray(nextPlaylists)?nextPlaylists:[];
  const changed=catalogSignature(normalizedSongs)!==lastCatalogSignature || JSON.stringify(normalizedPlaylists)!==JSON.stringify(playlists);
  songs=normalizedSongs;
  playlists=normalizedPlaylists;
  lastCatalogSignature=catalogSignature(songs);
  if(stats){listened=Number(stats.listeningSeconds||listened);localStorage.setItem('listenedSeconds:'+user,String(listened))}
  if(!silent||changed)render();
  // Run legacy migration once, after the first useful paint.
  if(!downloadMigrationStarted){downloadMigrationStarted=true;const run=()=>migrateLegacyDownloads().catch(()=>{});if(window.requestIdleCallback) window.requestIdleCallback(run,{timeout:2500}); else setTimeout(run,1200);}
  return {songs,playlists,changed};
}

function nav(p,ic,label){return `<button class="nav ${page===p?'active':''}" onclick="go('${p}')"><span class="ico">${svg(ic)}</span><span>${label}</span></button>`}
function shell(){return `<aside class="side"><div class="brand"><span class="logo" aria-label="SYNTH AUDIO logo"></span><b>SYNTH AUDIO</b></div><div class="group">DISCOVER</div>${nav('home','home','Home')}${nav('search','search','Search')}<div class="group">YOUR LIBRARY</div>${nav('library','library','Library')}${nav('favorites','heart','Favorites')}${nav('recent','clock','Recently Played')}${nav('playlists','playlist','Playlists')}${nav('downloads','download','Downloads')}${nav('activityStats','activity','Activity & Stats')}<div class="group">GENERAL</div>${nav('settings','settings','Settings')}<div class="profile" onclick="go('settings')" role="button" tabindex="0"><div class="avatar">${esc((user||'A')[0].toUpperCase())}</div><div class="profileText"><b>${esc(user.split('@')[0]||'Listener')}</b><small><i></i> Online</small></div></div></aside><main id="main" class="main"><div class="topBar">${owner?`<button class="topAdmin" onclick="go('admin')" title="Open owner administration">${svg('shield')}<span>Admin</span></button>`:''}</div><div id="pageContent"></div></main><div id="player"></div><nav class="mobileNav">${[['home','home','Home'],['search','search','Search'],['library','library','Library'],['playlists','playlist','Playlists'],['activityStats','activity','Activity'],['settings','settings','Settings']].map(x=>`<button class="mnav ${page===x[0]?'active':''}" onclick="go('${x[0]}')"><span>${svg(x[1])}</span>${x[2]}</button>`).join('')}</nav>`}
function card(s,extra=''){return `<article class="card" onclick="playSong('${s.id}')"><div class="coverWrap"><img src="${esc(cover(s))}" class="cover" loading="lazy" onerror="this.onerror=null;this.src=fallback">${extra}<button class="cardplay" aria-label="Play">${svg('play')}</button><button class="dots" onclick="event.stopPropagation();more('${s.id}')">${svg('more')}</button></div><div class="title">${esc(s.title)}</div><div class="meta">${esc(s.artist||'Unknown Artist')}${s.language?' · '+esc(s.language):''}</div></article>`}
function row(s){return `<div class="songrow"><img class="thumb" src="${esc(cover(s))}" onerror="this.onerror=null;this.src=fallback"><div class="grow" onclick="playSong('${s.id}')"><div class="title">${esc(s.title)}</div><div class="meta">${esc(s.artist||'Unknown Artist')} · ${esc(s.album||'Single')}${s.language?' · '+esc(s.language):''}</div></div><button class="rowbtn ${favorites.has(s.id)?'fav':''}" onclick="event.stopPropagation();toggleFav('${s.id}')" title="Favorite">${favorites.has(s.id)?'♥':'♡'}</button><button class="rowbtn" onclick="event.stopPropagation();downloadSong('${s.id}')" title="Download">${svg('download')}</button><button class="rowbtn" onclick="event.stopPropagation();more('${s.id}')" title="More">${svg('more')}</button></div>`}
function renderLogin(){document.body.classList.add('loginMode');$('#app').innerHTML=`<div class="login"><div class="loginbox"><div class="brand center"><span class="logo" aria-label="SYNTH AUDIO logo"></span><b>SYNTH AUDIO</b></div><div class="loginGlow"></div><h1>Welcome back</h1><p>Sign in to your music library.</p><input id="email" class="field" type="email" autocomplete="email" placeholder="Email address" onkeydown="if(event.key==='Enter')login()"><button class="primary wide" onclick="login()">Continue</button><p class="loginHint">Your library, playlists and listening activity stay connected to your account.</p></div></div>`}
let shellReady=false;
function render(){
  document.body.classList.remove('loginMode');
  if(!user){renderLogin();shellReady=false;return}
  ownerCandidate=!!ownerEmail&&user.trim().toLowerCase()===ownerEmail;
  if(!shellReady || !$('#pageContent')){$('#app').innerHTML=shell();shellReady=true;}
  renderPage();renderPlayer();
}

function renderPage(){const m=$('#pageContent');if(page==='home'){const r=recent.map(id=>songs.find(s=>s.id===id)).filter(Boolean),most=songs.slice().sort((a,b)=>(b.plays||0)-(a.plays||0)).filter(s=>(s.plays||0)>0),added=songs.slice(0,20);m.innerHTML=`<div class="pageIntro"><h1>Good evening</h1><p class="sub">Pick up where you left off</p></div><section><h2>Smart Playlists</h2><div class="smart"><button class="smartcard hot" onclick="showCollection('Most Played',${JSON.stringify(most.map(s=>s.id))})"><span>${svg('activity')}</span><b>Most Played</b><small>${most.length} songs</small></button><button class="smartcard recentcard" onclick="go('recent')"><span>${svg('clock')}</span><b>Recently Played</b><small>${r.length} songs</small></button><button class="smartcard added" onclick="showCollection('Recently Added',${JSON.stringify(added.map(s=>s.id))})"><span>${svg('stats')}</span><b>Recently Added</b><small>${added.length} songs</small></button></div></section><section><div class="sectionhead"><h2>Recently Played</h2>${r.length?'<button onclick="go(\'recent\')">See all ›</button>':''}</div><div class="grid">${r.slice(0,6).map(card).join('')||'<p class="sub emptyText">Your listening history will appear here.</p>'}</div></section><section><div class="sectionhead"><h2>Your Playlists</h2><button onclick="go('playlists')">See all ›</button></div><div class="grid">${playlists.slice(0,4).map(playlistCard).join('')||'<p class="sub emptyText">Create your first playlist.</p>'}</div></section>`}
else if(page==='search')m.innerHTML=`<div class="pageIntro"><h1>Search</h1><p class="sub">Find songs, artists, albums, genres and languages.</p></div><div class="searchbox">${svg('search')}<input id="search" placeholder="What do you want to play?" oninput="searchNow()" autocomplete="off"></div><div id="results" class="section"><p class="sub">Start typing to search your music.</p></div>`;
else if(page==='library')m.innerHTML=`<div class="pageIntro"><h1>Your Library</h1><p class="sub">All music available to you.</p></div><div class="filterbar"><div class="tabs"><button class="active">Songs</button><button onclick="go('favorites')">Favorites</button><button onclick="go('playlists')">Playlists</button><button onclick="go('downloads')">Downloads</button></div><div class="libraryFilters"><select id="genreFilter" onchange="filterLibrary()"><option value="">All genres</option>${[...new Set(songs.map(s=>s.genre).filter(Boolean))].sort().map(x=>`<option>${esc(x)}</option>`).join('')}</select><select id="langFilter" onchange="filterLibrary()"><option value="">All languages</option>${[...new Set(songs.map(s=>s.language).filter(Boolean))].sort().map(x=>`<option>${esc(x)}</option>`).join('')}</select></div></div><div id="libraryList" class="list">${songs.map(row).join('')||'<p class="sub">No songs available yet.</p>'}</div>`;
else if(page==='favorites')m.innerHTML=`<div class="pageIntro"><h1>Favorites</h1><p class="sub">Songs you saved for quick access.</p></div><div class="list">${songs.filter(s=>favorites.has(s.id)).map(row).join('')||'<p class="sub emptyText">Your favorite songs will appear here.</p>'}</div>`;
else if(page==='recent')m.innerHTML=`<div class="pageIntro"><h1>Recently Played</h1><p class="sub">Your latest listening history.</p></div><div class="list">${recent.map(id=>songs.find(s=>s.id===id)).filter(Boolean).map(row).join('')||'<p class="sub emptyText">No listening history yet.</p>'}</div>`;
else if(page==='downloads'){Promise.all(songs.map(async s=>[s,await hasOffline(s.id)])).then(items=>{const ds=items.filter(x=>x[1]).map(x=>x[0]);m.innerHTML=`<div class="pageIntro"><h1>Downloads</h1><p class="sub">Available offline on this device.</p></div><div class="list">${ds.map(row).join('')||'<p class="sub emptyText">No downloaded songs yet.</p>'}</div>`})}
else if(page==='activityStats')renderActivity(m);
else if(page==='playlists')m.innerHTML=`<div class="pageIntro splitIntro"><div><h1>Playlists</h1><p class="sub">Your personal collections.</p></div><button class="primary" onclick="newPlaylist()">＋ Create playlist</button></div><div class="grid playlistgrid">${playlists.map(playlistCard).join('')||'<p class="sub emptyText">Create a playlist to start.</p>'}</div>`;
else if(page.startsWith('playlist:'))renderPlaylist(m,page.split(':')[1]);
else if(page==='settings')m.innerHTML=`<div class="pageIntro"><h1>Settings</h1><p class="sub">Your account and SYNTH AUDIO preferences.</p></div><div class="accountLayout"><section class="accountCard"><div class="accountAvatar">${esc((user||'A')[0].toUpperCase())}</div><div class="accountIdentity"><span class="accountLabel">SIGNED IN</span><h2>${esc(user.split('@')[0]||'Listener')}</h2><p>${esc(user)}</p><span class="statusPill"><i></i> Online</span></div></section><section class="settings settingsClean"><div class="settingRow"><div><b>Account email</b><span>Your SYNTH AUDIO account identifier.</span></div><strong>${esc(user)}</strong></div><div class="settingRow"><div><b>Offline music</b><span>Downloaded songs remain available on this device.</span></div><span class="settingValue">Offline downloads</span></div>${owner?`<div class="settingRow ownerEnabled"><div><b>Owner access</b><span>Owner controls are currently unlocked for this account.</span></div><button class="secondary" onclick="go('admin')">Open Admin ${svg('shield')}</button></div>`:ownerCandidate?`<div class="settingRow ownerAccess"><div><b>Owner access</b><span>This is the registered owner account. Unlock the private Admin area with your owner key.</span></div><button class="primary" onclick="ownerGate()">Unlock Admin ${svg('shield')}</button></div>`:''}<div class="accountActions"><button class="secondary" onclick="logout()">Log out</button></div></section></div>`;
else if(page==='admin')renderAdmin(m)}
function renderActivity(m){api('/api/user/stats?userEmail='+encodeURIComponent(user)).then(st=>{listened=Number(st.listeningSeconds||0);localStorage.setItem('listenedSeconds:'+user,String(listened));const events=st.events||[];m.innerHTML=`<div class="pageIntro"><h1>Activity & Stats</h1><p class="sub">Your listening time, activity and personal music overview.</p></div><div class="stats"><div class="stat accentStat"><span>Total listening</span><b>${mins(listened)}</b><small>${fmt(listened)} total</small></div><div class="stat"><span>Sessions</span><b>${events.filter(e=>e.type==='play').length}</b><small>play actions</small></div><div class="stat"><span>Favorites</span><b>${favorites.size}</b><small>saved songs</small></div><div class="stat"><span>Downloads</span><b>${songs.filter(s=>offlineUrls.has(s.id)).length}</b><small>on this device</small></div></div><section><div class="sectionhead"><h2>Recent activity</h2></div><div class="activitylist">${events.slice(0,30).map(activityItem).join('')||'<p class="sub emptyText">No activity yet.</p>'}</div></section>`}).catch(()=>{m.innerHTML='<p class="sub">Could not load activity. Please try again.</p>'})}
function activityItem(e){const raw=String(e.detail||'');const sid=raw.split(' · ')[0];const s=songs.find(x=>x.id===sid)||null;const detail=s?.title||raw||'Activity';return `<div class="activityItem"><div class="activityIcon">${svg(e.type==='play'?'play':e.type==='listening'?'activity':'playlist')}</div><div class="grow"><b>${esc(e.type.replaceAll('_',' '))}</b><span>${esc(detail)}</span></div><time>${new Date(e.at).toLocaleString()}</time></div>`}
function playlistCard(p){const s=songs.find(x=>p.songIds?.includes(x.id));return `<article class="card" onclick="go('playlist:${p.id}')"><img class="cover" src="${esc(p.image||cover(s||{}))}" loading="lazy" onerror="this.onerror=null;this.src=fallback"><div class="title">${esc(p.name)}</div><div class="meta">${p.songIds?.length||0} songs</div></article>`}
function renderPlaylist(m,id){const p=playlists.find(x=>x.id===id);if(!p){return go('playlists')}const ss=(p.songIds||[]).map(x=>songs.find(s=>s.id===x)).filter(Boolean);m.innerHTML=`<button class="back" onclick="go('playlists')">${svg('back')} Back to playlists</button><div class="playlisthead"><div class="playlistcover"><img src="${esc(p.image||cover(ss[0]||{}))}"></div><div class="playlistinfo"><div class="renameLine"><input id="playlistName" class="playlistname" value="${esc(p.name)}"><button class="secondary" onclick="renamePlaylist('${p.id}')">Save</button></div><p class="sub">${ss.length} songs</p><div class="actions"><button class="primary" onclick="playPlaylist('${p.id}')">${svg('play')} Play</button><button class="secondary" onclick="shufflePlaylist('${p.id}')">${svg('shuffle')} Shuffle</button><button class="secondary" onclick="addAllToQueue('${p.id}')">${svg('queue')} Add all to queue</button><button class="secondary" onclick="changePlaylistArtwork('${p.id}')">Artwork</button><button class="secondary dangerBtn" onclick="deletePlaylist('${p.id}')">Delete</button></div></div></div><div class="list">${ss.map(row).join('')||'<p class="empty">This playlist is empty. Add songs from the library or search.</p>'}</div>`}
function showCollection(name,ids){const ss=(ids||[]).map(id=>songs.find(s=>s.id===id)).filter(Boolean);$('#main').innerHTML=`<button class="back" onclick="go('home')">${svg('back')} Back</button><h1>${esc(name)}</h1><p class="sub">${ss.length} songs</p><div class="collectionActions">${ss.length?`<button class="primary" onclick='playCollection(${JSON.stringify(ss.map(s=>s.id))})'>${svg('play')} Play all</button><button class="secondary" onclick='shuffleCollection(${JSON.stringify(ss.map(s=>s.id))})'>${svg('shuffle')} Shuffle</button>`:''}</div><div class="list">${ss.map(row).join('')||'<p class="sub">Nothing here yet.</p>'}</div>`}
let searchTimer=null;
function searchNow(){
  clearTimeout(searchTimer);
  const input=$('#search');
  searchTimer=setTimeout(()=>{
    const q=(input?.value||'').toLowerCase().trim();
    const out=q?songs.filter(s=>[s.title,s.artist,s.album,s.genre,s.language].join(' ').toLowerCase().includes(q)):songs;
    const results=$('#results');if(!results)return;
    results.innerHTML=`${q?`<div class="sectionhead"><h2>Results</h2><span class="resultCount">${out.length} songs</span></div>`:''}<div class="list">${out.map(row).join('')||'<p class="sub">No results found.</p>'}</div>`;
  },120);
}

const normFilter=v=>String(v??'').trim().toLowerCase();
function filterLibrary(){const g=normFilter($('#genreFilter')?.value),l=normFilter($('#langFilter')?.value);const out=songs.filter(s=>(!g||normFilter(s.genre)===g)&&(!l||normFilter(s.language)===l));$('#libraryList').innerHTML=out.map(row).join('')||'<p class="sub">No songs match those filters.</p>'}
function go(p){if(p==='stats'||p==='activity')p='activityStats';if(p==='admin'&&!(owner&&ownerCandidate)){if(ownerCandidate){ownerGate();return}return go('home')}page=p;const hash=p.startsWith('playlist:')?'#playlist-'+p.slice(9):'#'+p;history.pushState({},'',location.pathname+hash);render()}
window.addEventListener('popstate',()=>{if(location.hash.startsWith('#playlist-')){page='playlist:'+location.hash.slice(10);render()}else if(location.hash==='#playlists'){page='playlists';render()}else if(location.hash==='#activityStats'||location.hash==='#activity'||location.hash==='#stats'){page='activityStats';render()}else if(location.hash==='#admin'){page='admin';render()}else{page='home';render()}});
function login(){const e=$('#email')?.value.trim().toLowerCase();if(!e||!/^\S+@\S+\.\S+$/.test(e))return toast('Enter a valid email address');user=e;ownerCandidate=!!ownerEmail&&user===ownerEmail;localStorage.setItem('synthUser',user);favorites=new Set(safeJSON('favorites:'+user,[]));recent=safeJSON('recent:'+user,[]);listened=Number(localStorage.getItem('listenedSeconds:'+user)||0);refreshData().catch(()=>{toast('Could not connect to SYNTH AUDIO server');render()})}
function ownerGate(){if(!ownerCandidate&&!owner)return toast('Owner access is limited to the registered owner account');document.body.classList.remove('loginMode');const d=document.createElement('div');d.className='modal ownerModal';d.innerHTML=`<div class="modalbox ownerBox"><button class="modalClose" onclick="this.closest('.modal').remove()">${svg('close')}</button><div class="ownerIcon">${svg('shield')}</div><span class="ownerKicker">PRIVATE AREA</span><h2>Owner access</h2><p>Enter your SYNTH AUDIO owner key to open Administration.</p><label class="fieldLabel">Owner account</label><input id="ownerEmail" class="field" type="email" value="${esc(ownerEmail)}" readonly><label class="fieldLabel">Owner key</label><input id="ownerKey" class="field" type="password" autocomplete="current-password" placeholder="Enter owner key" onkeydown="if(event.key==='Enter')verifyOwner()"><button class="primary wide" onclick="verifyOwner()">Unlock Admin ${svg('shield')}</button><div id="ownerMsg" class="formMsg"></div></div></div>`;document.body.appendChild(d);setTimeout(()=>$('#ownerKey')?.focus(),60)}
async function verifyOwner(){const e=$('#ownerEmail')?.value.trim().toLowerCase(),k=$('#ownerKey')?.value||'';const x=$('#ownerMsg');if(!e||!k){if(x)x.textContent='Enter your owner key.';return}const btn=document.querySelector('.ownerBox .primary');if(btn){btn.disabled=true;btn.classList.add('loading')}if(x)x.textContent='Verifying owner access…';try{await api('/api/admin/verify',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({email:e,key:k})});owner=true;ownerKey=k;ownerEmail=e;localStorage.setItem('synthOwnerKey',k);localStorage.setItem('synthOwnerEmail',e);if(!user){user=e;localStorage.setItem('synthUser',e);favorites=new Set();recent=[];listened=0}document.querySelector('.ownerModal')?.remove();location.hash='';page='admin';render();toast('Owner access verified')}catch{if(x)x.textContent='Owner authorization failed. Check the owner key and try again.';if(btn){btn.disabled=false;btn.classList.remove('loading')}}}
function logout(){stopListenTimer();localStorage.removeItem('synthUser');localStorage.removeItem('synthOwnerKey');localStorage.removeItem('synthOwnerEmail');user='';owner=false;ownerCandidate=false;ownerKey='';audio.pause();destroyNativePlayer();stopNativePolling();current=null;renderLogin()}
function playSong(id){const i=songs.findIndex(s=>s.id===id);if(i<0)return;queue=songs.slice();qIndex=i;startSong(queue[qIndex])}
function playCollection(ids){queue=ids.map(id=>songs.find(s=>s.id===id)).filter(Boolean);if(!queue.length)return;qIndex=0;startSong(queue[0])}
function shuffleCollection(ids){queue=ids.map(id=>songs.find(s=>s.id===id)).filter(Boolean).sort(()=>Math.random()-.5);qIndex=0;startSong(queue[0])}
let offlineUrls=new Map();
const IDB_NAME='synth-audio-offline',IDB_STORE='tracks';
function offlineDB(){return new Promise((resolve,reject)=>{const r=indexedDB.open(IDB_NAME,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(IDB_STORE))r.result.createObjectStore(IDB_STORE)};r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)})}
async function getOffline(id){try{const db=await offlineDB();return await new Promise((resolve,reject)=>{const q=db.transaction(IDB_STORE,'readonly').objectStore(IDB_STORE).get(id);q.onsuccess=()=>resolve(q.result||null);q.onerror=()=>reject(q.error)})}catch{return null}}
async function putOffline(id,blob){const db=await offlineDB();return new Promise((resolve,reject)=>{const q=db.transaction(IDB_STORE,'readwrite').objectStore(IDB_STORE).put(blob,id);q.onsuccess=()=>resolve();q.onerror=()=>reject(q.error)})}
async function deleteOffline(id){try{const db=await offlineDB();await new Promise((resolve,reject)=>{const q=db.transaction(IDB_STORE,'readwrite').objectStore(IDB_STORE).delete(id);q.onsuccess=resolve;q.onerror=()=>reject(q.error)});if(offlineUrls.has(id)){URL.revokeObjectURL(offlineUrls.get(id));offlineUrls.delete(id)}}catch{}}
async function hasOffline(id){return !!(await getOffline(id))}
// Native background playback is enabled only inside Capacitor. Browser/Electron keeps the existing HTML audio engine.
const nativeCap=window.Capacitor;
const nativeAudio=(()=>{try{return nativeCap?.Plugins?.AudioPlayer||nativeCap?.registerPlugin?.('AudioPlayer')||null}catch{return null}})();
const nativeMode=()=>!!(nativeAudio&&nativeCap?.isNativePlatform?.());
const NATIVE_AUDIO_ID='synth-main';
let nativeReady=false,nativePlaying=false,nativeDuration=0,nativeTime=0,nativeListenersBound=false,nativePolling=null;
function playbackPaused(){return nativeMode()&&nativeReady?!nativePlaying:audio.paused}
function playbackTime(){return nativeMode()&&nativeReady?nativeTime:(Number(audio.currentTime)||0)}
function playbackDuration(){return nativeMode()&&nativeReady?nativeDuration:(Number(audio.duration)||0)}
function nativeSource(s){return resourceUrl(s?.file)}
async function destroyNativePlayer(){if(!nativeMode())return;try{if(nativeReady)await nativeAudio.stop({audioId:NATIVE_AUDIO_ID})}catch{}try{if(nativeReady)await nativeAudio.destroy({audioId:NATIVE_AUDIO_ID})}catch{}nativeReady=false;nativePlaying=false;nativeDuration=0;nativeTime=0}
function startNativePolling(){if(nativePolling||!nativeMode())return;nativePolling=setInterval(async()=>{if(!nativeReady)return;try{const r=await nativeAudio.getCurrentTime({audioId:NATIVE_AUDIO_ID});nativeTime=Number(r?.currentTime)||0}catch{}const r=document.querySelector('#seek');if(r&&nativeDuration)r.value=nativeTime/nativeDuration*100;const t=document.querySelector('#cur');if(t)t.textContent=fmt(nativeTime);const f=document.querySelector('#fpcurr');if(f)f.textContent=fmt(nativeTime);const fp=document.querySelector('#fpseek');if(fp&&nativeDuration)fp.value=nativeTime/nativeDuration*100},500)}
function stopNativePolling(){if(nativePolling){clearInterval(nativePolling);nativePolling=null}}
async function bindNativeListeners(){if(nativeListenersBound||!nativeMode())return;nativeListenersBound=true;try{await nativeAudio.onAudioEnd({audioId:NATIVE_AUDIO_ID},()=>{nativePlaying=false;renderPlayer();next()})}catch{}try{await nativeAudio.onPlaybackStatusChange({audioId:NATIVE_AUDIO_ID},r=>{if(r?.status==='playing'){nativePlaying=true;startListenTimer();renderPlayer()}else if(r?.status==='paused'){nativePlaying=false;stopListenTimer();renderPlayer()}else if(r?.status==='stopped'){nativePlaying=false;stopListenTimer();renderPlayer()}})}catch{}}
async function startNativeSong(s){await bindNativeListeners();const source=nativeSource(s);if(!source)return false;try{const meta={friendlyTitle:String(s.title||'SYNTH AUDIO'),artistName:String(s.artist||'Unknown Artist'),albumTitle:String(s.album||'SYNTH AUDIO'),artworkSource:/^https?:\/\//i.test(cover(s))?cover(s):undefined};if(nativeReady){try{await nativeAudio.pause({audioId:NATIVE_AUDIO_ID})}catch{}await nativeAudio.changeAudioSource({audioId:NATIVE_AUDIO_ID,source});try{await nativeAudio.changeMetadata({audioId:NATIVE_AUDIO_ID,...meta})}catch{}nativeDuration=0;nativeTime=0}else{await nativeAudio.create({audioId:NATIVE_AUDIO_ID,audioSource:source,...meta,useForNotification:true,showSeekBackward:true,showSeekForward:true,seekBackwardTime:10,seekForwardTime:10});await nativeAudio.onAudioReady({audioId:NATIVE_AUDIO_ID},async()=>{try{const r=await nativeAudio.getDuration({audioId:NATIVE_AUDIO_ID});nativeDuration=Number(r?.duration)||0}catch{}renderPlayer()});await nativeAudio.initialize({audioId:NATIVE_AUDIO_ID});nativeReady=true;nativePlaying=false;nativeTime=0}startNativePolling();await nativeAudio.play({audioId:NATIVE_AUDIO_ID});nativePlaying=true;return true}catch(e){console.error('SYNTH AUDIO native playback error',e);nativeReady=false;nativePlaying=false;return false}}
async function skip(seconds){const delta=Number(seconds)||0;if(nativeMode()&&nativeReady){try{await nativeAudio.seek({audioId:NATIVE_AUDIO_ID,timeInSeconds:Math.max(0,Math.min(playbackDuration(),playbackTime()+delta))});nativeTime=Math.max(0,Math.min(playbackDuration(),playbackTime()+delta));renderPlayer();return}catch{}}if(audio.duration)audio.currentTime=Math.max(0,Math.min(audio.duration,audio.currentTime+delta))}
async function startSong(s){if(!s)return;current=s;updateMediaSession(s);stopNativePolling();const blob=await getOffline(s.id);if(blob){await destroyNativePlayer();if(!offlineUrls.has(s.id))offlineUrls.set(s.id,URL.createObjectURL(blob));audio.src=offlineUrls.get(s.id);audio.currentTime=0;audio.load();touchRecent(s.id);sendEvent('play',s.id);renderPlayer();try{await audio.play()}catch{renderPlayer();toast('Tap Play to start playback')}return}if(nativeMode()){try{audio.pause()}catch{}audio.removeAttribute('src');audio.load();touchRecent(s.id);sendEvent('play',s.id);renderPlayer();if(await startNativeSong(s)){startListenTimer();renderPlayer();return}toast('Background audio could not start. Trying normal playback…')}await destroyNativePlayer();audio.src=resourceUrl(s.file);audio.currentTime=0;audio.load();touchRecent(s.id);sendEvent('play',s.id);renderPlayer();try{await audio.play()}catch{renderPlayer();toast('Tap Play to start playback')}}
function touchRecent(id){recent=[id,...recent.filter(x=>x!==id)].slice(0,50);saveUserState()}
function next(){if(!queue.length)return;if(repeat==='one'){if(nativeMode()&&nativeReady){nativeAudio.seek({audioId:NATIVE_AUDIO_ID,timeInSeconds:0}).then(()=>nativeAudio.play({audioId:NATIVE_AUDIO_ID})).catch(()=>{});nativeTime=0;nativePlaying=true;renderPlayer()}else{audio.currentTime=0;audio.play().catch(()=>{})}return}if(shuffle){let n=Math.floor(Math.random()*queue.length);if(queue.length>1&&n===qIndex)n=(n+1)%queue.length;qIndex=n}else qIndex++;if(qIndex>=queue.length){if(repeat==='all')qIndex=0;else{if(nativeMode()&&nativeReady){nativeAudio.stop({audioId:NATIVE_AUDIO_ID}).catch(()=>{});nativePlaying=false;stopNativePolling()}else audio.pause();stopListenTimer();renderPlayer();return}}startSong(queue[qIndex])}
function prev(){if(!queue.length)return;if(playbackTime()>3){skip(-999999);return}qIndex=(qIndex-1+queue.length)%queue.length;startSong(queue[qIndex])}
async function togglePlay(){if(!current)return;if(nativeMode()&&nativeReady){try{if(nativePlaying){await nativeAudio.pause({audioId:NATIVE_AUDIO_ID});nativePlaying=false}else{await nativeAudio.play({audioId:NATIVE_AUDIO_ID});nativePlaying=true}renderPlayer()}catch{toast('Unable to change playback')}return}if(audio.paused)audio.play().catch(()=>toast('Unable to play this song'));else audio.pause()}
function seek(v){const d=playbackDuration();if(!d)return;const t=d*Number(v)/100;if(nativeMode()&&nativeReady){nativeAudio.seek({audioId:NATIVE_AUDIO_ID,timeInSeconds:t}).then(()=>{nativeTime=t;renderPlayer()}).catch(()=>{});return}audio.currentTime=t}
function cycleShuffle(){shuffle=!shuffle;toast(shuffle?'Shuffle on':'Shuffle off');renderPlayer()}
function cycleRepeat(){repeat=repeat==='off'?'all':repeat==='all'?'one':'off';toast(repeat==='off'?'Repeat off':repeat==='all'?'Repeat all':'Repeat one');renderPlayer()}
function queueView(){const d=document.createElement('div');d.className='modal';d.innerHTML=`<div class="modalbox queueBox"><div class="modalTitle"><h3>Queue</h3><button onclick="this.closest('.modal').remove()">${svg('close')}</button></div><div class="queueList">${queue.map((s,i)=>`<button class="queueItem ${i===qIndex?'current':''}" onclick="startFromQueue(${i});this.closest('.modal').remove()"><img src="${esc(cover(s))}"><span class="grow"><b>${esc(s.title)}</b><small>${esc(s.artist)}</small></span>${i===qIndex?'<em>Playing</em>':''}</button>`).join('')||'<p class="sub">Queue is empty.</p>'}</div></div>`;document.body.appendChild(d)}
function startFromQueue(i){if(!queue[i])return;qIndex=i;startSong(queue[i])}
function addToQueue(id){const s=songs.find(x=>x.id===id);if(s){queue.push(s);toast('Added to queue');renderPlayer()}}
function nextAdd(id){const s=songs.find(x=>x.id===id);if(s){if(!queue.length){queue=[s];qIndex=0}else queue.splice(Math.min(qIndex+1,queue.length),0,s);toast('Added to play next');renderPlayer()}}
function more(id){const d=document.createElement('div');d.className='modal';d.innerHTML=`<div class="modalbox actionBox"><div class="modalTitle"><h3>Song actions</h3><button onclick="this.closest('.modal').remove()">${svg('close')}</button></div><button onclick="playSong('${id}');this.closest('.modal').remove()">${svg('play')} Play</button><button onclick="nextAdd('${id}');this.closest('.modal').remove()">${svg('next')} Play next</button><button onclick="addToQueue('${id}');this.closest('.modal').remove()">${svg('queue')} Add to queue</button><button onclick="addToPlaylist('${id}');this.closest('.modal').remove()">${svg('playlist')} Add to playlist</button><button onclick="toggleFav('${id}');this.closest('.modal').remove()">${svg('heart')} ${favorites.has(id)?'Remove from favorites':'Add to favorites'}</button><button onclick="downloadSong('${id}');this.closest('.modal').remove()">${svg('download')} ${localStorage.getItem('download:'+id)?'Downloaded':'Download'}</button></div>`;document.body.appendChild(d)}
function toggleFav(id){favorites.has(id)?favorites.delete(id):favorites.add(id);saveUserState();render();toast(favorites.has(id)?'Added to favorites':'Removed from favorites')}
async function newPlaylist(){const d=document.createElement('div');d.className='modal';d.innerHTML=`<div class="modalbox formBox"><div class="modalTitle"><h3>Create playlist</h3><button onclick="this.closest('.modal').remove()">${svg('close')}</button></div><input id="newPlaylistName" class="field" placeholder="Playlist name" maxlength="80"><label class="fileLabel">Optional artwork<input id="newPlaylistImage" type="file" accept="image/*"></label><button class="primary wide" onclick="createPlaylistFromForm()">Create playlist</button></div>`;document.body.appendChild(d);$('#newPlaylistName').focus()}
async function createPlaylistFromForm(){const name=$('#newPlaylistName')?.value.trim();if(!name)return toast('Enter a playlist name');let image='';const f=$('#newPlaylistImage')?.files?.[0];if(f)image=await fileData(f);try{const p=await api('/api/playlists',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,image,userEmail:user})});playlists=await api('/api/playlists?userEmail='+encodeURIComponent(user));document.querySelector('.modal')?.remove();go('playlist:'+p.id);toast('Playlist created')}catch(e){toast(e.message)}}
async function renamePlaylist(id){const name=$('#playlistName')?.value.trim();if(!name)return toast('Playlist name cannot be empty');await api('/api/playlists/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({name,userEmail:user})});playlists=await api('/api/playlists?userEmail='+encodeURIComponent(user));render();toast('Playlist renamed')}
async function changePlaylistArtwork(id){const d=document.createElement('div');d.className='modal';d.innerHTML=`<div class="modalbox formBox"><div class="modalTitle"><h3>Playlist artwork</h3><button onclick="this.closest('.modal').remove()">${svg('close')}</button></div><input id="artFile" type="file" accept="image/*" class="field"><button class="primary wide" onclick="savePlaylistArtwork('${id}')">Save artwork</button></div>`;document.body.appendChild(d)}
async function savePlaylistArtwork(id){const f=$('#artFile')?.files?.[0];if(!f)return toast('Choose an image');const image=await fileData(f);await api('/api/playlists/'+id,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({image,userEmail:user})});playlists=await api('/api/playlists?userEmail='+encodeURIComponent(user));document.querySelector('.modal')?.remove();render();toast('Artwork updated')}
async function deletePlaylist(id){if(!confirm('Delete this playlist?'))return;await api('/api/playlists/'+id+'?userEmail='+encodeURIComponent(user),{method:'DELETE'});playlists=await api('/api/playlists?userEmail='+encodeURIComponent(user));go('playlists');toast('Playlist deleted')}
function playPlaylist(id){const p=playlists.find(x=>x.id===id);if(!p)return;playCollection(p.songIds||[])}
function shufflePlaylist(id){const p=playlists.find(x=>x.id===id);if(!p)return;shuffleCollection(p.songIds||[])}
function addAllToQueue(id){const p=playlists.find(x=>x.id===id);if(!p)return;queue.push(...(p.songIds||[]).map(x=>songs.find(s=>s.id===x)).filter(Boolean));toast('Playlist added to queue')}
async function addToPlaylist(id){if(!playlists.length)return newPlaylist();const d=document.createElement('div');d.className='modal';d.innerHTML=`<div class="modalbox actionBox"><div class="modalTitle"><h3>Add to playlist</h3><button onclick="this.closest('.modal').remove()">${svg('close')}</button></div>${playlists.map(p=>`<button onclick="addSongToPlaylist('${p.id}','${id}');this.closest('.modal').remove()">${svg('playlist')} ${esc(p.name)} <span class="push">${p.songIds?.length||0}</span></button>`).join('')}</div>`;document.body.appendChild(d)}
async function addSongToPlaylist(pid,sid){const p=playlists.find(x=>x.id===pid);if(!p)return;if(!p.songIds.includes(sid))p.songIds.push(sid);await api('/api/playlists/'+pid,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({songIds:p.songIds,userEmail:user})});playlists=await api('/api/playlists?userEmail='+encodeURIComponent(user));toast('Added to playlist')}
async function downloadSong(id){const s=songs.find(x=>x.id===id);if(!s)return;if(await hasOffline(id))return toast('Already downloaded');toast('Downloading…');try{const r=await fetch(resourceUrl(s.file),{cache:'no-store',credentials:'same-origin'});if(!r.ok)throw Error('Server returned '+r.status);const b=await r.blob();await putOffline(id,b);sendEvent('download',id);toast('Downloaded for offline listening');if(page==='downloads')render()}catch(e){const msg=String(e?.name||'').includes('Quota')?'Download failed: device browser storage is full. Remove an old download and try again.':'Download failed. Check your connection and try again.';toast(msg)}}
function fileData(f){return new Promise((res,rej)=>{const r=new FileReader();r.onload=()=>res(r.result);r.onerror=rej;r.readAsDataURL(f)})}
function renderPlayer(){const p=$('#player');if(!current){p.innerHTML='';return}const d=playbackDuration(),t=playbackTime(),pct=d?t/d*100:0,paused=playbackPaused();p.innerHTML=`<div class="bottom"><div class="now" onclick="fullPlayer()"><img class="miniart" src="${esc(cover(current))}"><div class="grow"><div class="title">${esc(current.title)}</div><div class="meta">${esc(current.artist||'Unknown Artist')}${current.album?' · '+esc(current.album):''}</div></div></div><div class="transport"><button onclick="prev()" title="Previous">${svg('prev')}</button><button onclick="skip(-10)" title="10 seconds back">${svg('rewind10')}</button><button class="bigplay" onclick="togglePlay()" title="Play/Pause">${paused?svg('play'):svg('pause')}</button><button onclick="skip(10)" title="10 seconds forward">${svg('forward10')}</button><button onclick="next()" title="Next">${svg('next')}</button></div><div class="progress"><span id="cur">${fmt(t)}</span><input id="seek" type="range" min="0" max="100" value="${pct}" oninput="seek(this.value)"><span id="dur">${fmt(d)}</span></div><div class="miniTools"><button class="miniOptional" onclick="cycleShuffle()">${svg('shuffle')}</button><button class="miniOptional" onclick="cycleRepeat()">${svg('repeat')}</button><button onclick="queueView()">${svg('queue')}</button><button onclick="fullPlayer()">⌃</button></div></div>`}
function fullPlayer(){if(!current)return;const d=document.createElement('div');d.className='fullplayer';d.innerHTML=`<div class="fphead"><button onclick="this.closest('.fullplayer').remove()">${svg('close')}</button><b>Now Playing</b><button onclick="more('${current.id}')">${svg('more')}</button></div><div class="fpbody"><img src="${esc(cover(current))}" class="fpcover"><div class="fpmeta"><h2>${esc(current.title)}</h2><p>${esc(current.artist||'Unknown Artist')} · ${esc(current.album||'Single')}</p></div><div class="fpseek"><input id="fpseek" type="range" min="0" max="100" value="${playbackDuration()?playbackTime()/playbackDuration()*100:0}" oninput="seek(this.value)"><div><span id="fpcurr">${fmt(playbackTime())}</span><span>${fmt(playbackDuration())}</span></div></div><div class="fpcontrols"><button class="toggleSmall ${shuffle?'on':''}" onclick="cycleShuffle()">${svg('shuffle')}</button><button onclick="prev()">${svg('prev')}</button><button class="fpplay" onclick="togglePlay()">${playbackPaused()?svg('play'):svg('pause')}</button><button onclick="next()">${svg('next')}</button><button class="toggleSmall ${repeat!=='off'?'on':''}" onclick="cycleRepeat()">${svg('repeat')}</button></div><div class="fpsecondary"><button onclick="queueView()">${svg('queue')} Queue</button><button onclick="toggleFav('${current.id}')">${favorites.has(current.id)?'♥':'♡'} Favorite</button><button onclick="downloadSong('${current.id}')">${svg('download')} Download</button></div></div></div>`;document.body.appendChild(d)}

let listenAccum=0,lastTick=Date.now();
function flushListening(){if(!user||!current||playbackPaused())return;const now=Date.now();const sec=Math.max(0,Math.min(30,Math.floor((now-lastTick)/1000)));lastTick=now;if(sec>0){listened+=sec;saveUserState();api('/api/listening',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userEmail:user,songId:current.id,seconds:sec})}).catch(()=>{});updateVisibleListening()}}
window.addEventListener('visibilitychange',()=>{if(document.hidden)flushListening();else lastTick=Date.now()});window.addEventListener('beforeunload',flushListening);

let lastListenMark=Date.now();
function startListenTimer(){if(listenTimer||!user)return;lastTick=Date.now();listenTimer=setInterval(()=>{if(!playbackPaused()&&current){const now=Date.now();const sec=Math.max(1,Math.min(10,Math.floor((now-lastTick)/1000)));lastTick=now;listened+=sec;saveUserState();api('/api/listening',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({userEmail:user,songId:current.id,seconds:sec})}).catch(()=>{});updateVisibleListening() }},10000)}
function stopListenTimer(){if(listenTimer){clearInterval(listenTimer);listenTimer=null}}
function updateVisibleListening(){const x=document.querySelectorAll('[data-listened]');x.forEach(n=>n.textContent=mins(listened))}
function sendEvent(type,songId){api('/api/events',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({type,songId,userEmail:user})}).catch(()=>{})}
audio.addEventListener('play',()=>{startListenTimer();renderPlayer()});audio.addEventListener('pause',()=>{if(!nativeReady){stopListenTimer();renderPlayer()}});audio.addEventListener('ended',()=>{if(!nativeReady)next()});audio.addEventListener('loadedmetadata',()=>{const d=$('#dur');if(d&&!nativeReady)d.textContent=fmt(audio.duration)});audio.addEventListener('timeupdate',()=>{if(nativeReady)return;const r=$('#seek');if(r&&audio.duration)r.value=audio.currentTime/audio.duration*100;const t=$('#cur');if(t)t.textContent=fmt(audio.currentTime);const f=$('#fpcurr');if(f)f.textContent=fmt(audio.currentTime);const fp=$('#fpseek');if(fp&&audio.duration)fp.value=audio.currentTime/audio.duration*100});
function toast(t){const x=document.createElement('div');x.className='toast';x.textContent=t;document.body.appendChild(x);requestAnimationFrame(()=>x.classList.add('show'));setTimeout(()=>{x.classList.remove('show');setTimeout(()=>x.remove(),180)},2200)}
async function renderAdmin(m){
 if(!owner||!ownerCandidate)return go('home');
 let st;
 try{st=await api('/api/admin/stats',{headers:{'x-admin-key':ownerKey}})}catch{owner=false;ownerKey='';localStorage.removeItem('synthOwnerKey');localStorage.removeItem('synthOwnerEmail');toast('Owner session expired. Please verify again.');return go('home')}
 m.innerHTML=`<div class="adminPage">
   <div class="adminTopbar">
     <button class="adminBack" onclick="go('home')">${svg('home')}<span>Back to music</span></button>
     <div class="adminTopIdentity"><span class="adminShield">${svg('shield')}</span><div><b>Owner Administration</b><small>${esc(ownerEmail)}</small></div></div>
     <button class="secondary adminExport" onclick="exportData()">${svg('download')} Export</button>
   </div>
   <div class="adminHero">
     <div><span class="eyebrow">SYNTH AUDIO · OWNER ONLY</span><h1>Administration</h1><p class="sub">Manage your shared music library and monitor activity.</p></div>
     <span class="ownerStatus"><i></i> Secure owner session</span>
   </div>
   <div class="adminOverview">
     <div class="adminStatPrimary"><span>Music library</span><b>${st.songs}</b><small>songs available to users</small></div>
     <div class="adminStat"><span>Storage used</span><b>${formatBytes(st.storageBytes)}</b><small>uploaded audio storage</small></div>
     <div class="adminStat"><span>Listening time</span><b>${mins(st.listeningSeconds)}</b><small>total tracked listening</small></div>
     <div class="adminStat"><span>Active listeners</span><b>${st.users}</b><small>accounts with activity</small></div>
   </div>
   <div class="adminTabs">
     <button class="active" onclick="adminTab(this,'manage')">${svg('library')} <span>Music library</span></button>
     <button onclick="adminTab(this,'add')">${svg('upload')} <span>Add music</span></button>
     <button onclick="adminTab(this,'delete')">${svg('trash')} <span>Delete music</span></button>
     <button onclick="adminTab(this,'activity')">${svg('activity')} <span>Activity</span></button>
   </div>
   <div id="adminbody"></div>
 </div>`;
 adminManage();
}
function adminTab(btn,tab){document.querySelectorAll('.adminTabs button').forEach(x=>x.classList.remove('active'));btn.classList.add('active');if(tab==='manage')adminManage();else if(tab==='add')adminAdd();else if(tab==='delete')adminDelete();else adminActivity()}
function adminManage(){const b=$('#adminbody');if(!b)return;const list=songs.map(adminRow).join('');const empty=`<div class="adminEmpty"><div>${svg('library')}</div><h3>Your library is empty</h3><p>Use Add music to publish the first song.</p><button class="primary" onclick="adminAdd()">${svg('upload')} Add music</button></div>`;b.innerHTML=`<div class="adminPanel"><div class="adminPanelHead"><div><h2>Music library</h2><p class="sub">Every uploaded song shared with authorized users.</p></div><span class="countPill">${songs.length} songs</span></div><div class="adminSearchRow"><div class="searchbox">${svg('search')}<input placeholder="Search title, artist, album, language or genre..." oninput="filterAdmin(this.value)"></div></div><div id="adminsongs" class="list adminList">${list||empty}</div></div>`}
function adminRow(s){return `<div class="songrow adminrow"><img class="thumb" src="${esc(cover(s))}" onerror="this.onerror=null;this.src=fallback"><div class="grow"><div class="title">${esc(s.title)}</div><div class="meta">${esc(s.artist||'Unknown Artist')} · ${esc(s.album||'Single')} · ${esc(s.language||'Unknown')} · ${esc(s.genre||'Other')}</div></div><button class="rowbtn" onclick="playSong('${s.id}')" title="Play">${svg('play')}</button><button class="rowbtn danger" onclick="adminDeleteSong('${s.id}')" title="Delete">${svg('trash')}</button></div>`}
let adminSearchTimer=null;
function filterAdmin(q){
  clearTimeout(adminSearchTimer);adminSearchTimer=setTimeout(()=>{
    q=String(q||'').toLowerCase().trim();const el=$('#adminsongs');if(!el)return;
    const list=songs.filter(s=>[s.title,s.artist,s.album,s.language,s.genre].join(' ').toLowerCase().includes(q)).map(adminRow).join('');
    el.innerHTML=list||'<div class="adminEmpty compact"><h3>No matching music</h3><p>Try another title, artist, album, language or genre.</p></div>';
  },120);
}

function adminAdd(){const b=$('#adminbody');b.innerHTML=`<div class="adminPanel"><div class="adminPanelHead"><div><h2>Add music</h2><p class="sub">Choose your audio file. If it already contains cover artwork and music tags, SYNTH AUDIO will use them automatically.</p></div></div><div class="uploadBox easyUpload"><div id="dropZone" class="dropZone" onclick="$('#ufile').click()" ondragover="event.preventDefault();this.classList.add('dragging')" ondragleave="this.classList.remove('dragging')" ondrop="event.preventDefault();this.classList.remove('dragging');handleAudioDrop(event.dataTransfer.files)"><div class="uploadIcon">${svg('upload')}</div><h3>Drop your music here</h3><p>or click to choose an audio file</p><span class="dropHint">MP3, WAV, OGG, OPUS, AAC, M4A or FLAC · up to 250 MB</span><input id="ufile" type="file" accept="audio/*" hidden onchange="handleAudioFile(this.files)"></div><div id="selectedAudio" class="selectedAudio hidden"></div><div class="artworkNote"><span class="artworkCheck">✓</span><div><b>Existing artwork will be used</b><small>If your music file already has album art embedded, you do not need to upload it again.</small></div></div><details class="advancedUpload"><summary>Add or edit details</summary><div class="twocol"><label class="fieldLabel">Title <span class="optional">optional</span><input id="utitle" placeholder="Song title"></label><label class="fieldLabel">Artist <span class="optional">optional</span><input id="uartist" placeholder="Artist name"></label></div><div class="twocol"><label class="fieldLabel">Album <span class="optional">optional</span><input id="ualbum" placeholder="Album name"></label><label class="fieldLabel">Language <span class="optional">optional</span><input id="ulang" placeholder="Tamil, English..."></label></div><label class="fieldLabel">Genre <span class="optional">optional</span><input id="ugenre" placeholder="Melody, Pop, Rock..."></label><label class="fieldLabel">Custom artwork <span class="optional">optional</span><input id="ucov" type="file" accept="image/*"></label></details><button id="publishBtn" class="primary wide publishBtn" onclick="upload()" disabled>${svg('upload')} Publish to library</button><div id="uploadMsg" class="formMsg"></div></div></div>`}
function handleAudioDrop(files){handleAudioFile(files)}
function handleAudioFile(files){const f=files?.[0];if(!f)return;const input=$('#ufile');if(input&&files instanceof FileList){try{input.files=files}catch{}}else if(input&&files?.length){try{const dt=new DataTransfer();dt.items.add(f);input.files=dt.files}catch{}}const box=$('#selectedAudio');if(box){box.classList.remove('hidden');box.innerHTML=`<span class="selectedIcon">${svg('play')}</span><div><b>${esc(f.name)}</b><small>${formatBytes(f.size)} · Ready to upload</small></div><button type="button" onclick="clearSelectedAudio(event)">${svg('close')}</button>`}const btn=$('#publishBtn');if(btn)btn.disabled=false;const title=$('#utitle');if(title&&!title.value)title.value=f.name.replace(/\.[^.]+$/,'').replace(/[_-]+/g,' ').trim();toast('Music file selected')}
function clearSelectedAudio(e){e?.stopPropagation();const input=$('#ufile');if(input)input.value='';const box=$('#selectedAudio');if(box){box.classList.add('hidden');box.innerHTML=''}const btn=$('#publishBtn');if(btn)btn.disabled=true}

async function upload(){
  const f=$('#ufile')?.files?.[0];if(!f)return toast('Choose an audio file');
  const btn=$('#publishBtn');if(btn){btn.disabled=true;btn.classList.add('loading')}
  const fd=new FormData();fd.append('file',f);fd.append('title',$('#utitle')?.value||'');fd.append('artist',$('#uartist')?.value||'');fd.append('album',$('#ualbum')?.value||'');fd.append('language',$('#ulang')?.value||'');fd.append('genre',$('#ugenre')?.value||'');
  if($('#ucov')?.files?.[0])fd.append('cover',await fileData($('#ucov').files[0]));
  const msg=$('#uploadMsg');if(msg)msg.textContent=`Uploading ${formatBytes(f.size)}…`;
  try{
    const added=await api('/api/admin/upload',{method:'POST',headers:{'x-admin-key':ownerKey},body:fd});
    // Use the returned song immediately instead of downloading the entire catalog again.
    songs=[added,...songs.filter(s=>s.id!==added.id)];
    if(msg)msg.textContent=added.cover?'Upload complete. Existing artwork was added automatically.':'Upload complete. The song is now in the shared library.';
    toast('Music published successfully');adminManage();
  }catch(e){if(msg)msg.textContent='Upload failed: '+e.message;toast('Upload failed');if(btn){btn.disabled=false;btn.classList.remove('loading')}}
}


async function adminDeleteSong(id){if(!confirm('Delete this song from the shared catalog? This also removes it from playlists.'))return;try{await api('/api/admin/songs/'+id,{method:'DELETE',headers:{'x-admin-key':ownerKey}});songs=await api('/api/songs');adminManage();toast('Song deleted')}catch(e){toast(e.message)}}
function adminDelete(){const b=$('#adminbody');if(!b)return;const list=songs.map(adminRow).join('');b.innerHTML=`<div class="adminPanel"><div class="adminPanelHead"><div><h2>Delete music</h2><p class="sub">Remove songs permanently from the shared server library.</p></div></div><div class="list adminList">${list||'<div class="adminEmpty"><h3>No music to delete</h3><p>Your shared library is currently empty.</p></div>'}</div></div>`}
async function adminActivity(){const b=$('#adminbody');try{const st=await api('/api/admin/stats',{headers:{'x-admin-key':ownerKey}});const events=st.events.map(activityItem).join('');b.innerHTML=`<div class="adminPanel"><div class="adminPanelHead"><div><h2>Activity & statistics</h2><p class="sub">A clear overview of listening and library activity.</p></div></div><div class="stats adminStats"><div class="stat"><span>Total listening</span><b>${mins(st.listeningSeconds)}</b><small>${fmt(st.listeningSeconds)} tracked</small></div><div class="stat"><span>Languages</span><b>${st.languages.length}</b><small>${esc(st.languages.join(', ')||'None yet')}</small></div><div class="stat"><span>Genres</span><b>${st.genres.length}</b><small>${esc(st.genres.join(', ')||'None yet')}</small></div><div class="stat"><span>Listeners</span><b>${st.users}</b><small>accounts with listening data</small></div></div><div class="activityHead"><h3>Recent activity</h3><span class="countPill">${st.events.length} events</span></div><div class="activitylist adminActivityList">${events||'<div class="adminEmpty compact"><h3>No activity yet</h3><p>Listening and library events will appear here.</p></div>'}</div></div>`}catch{toast('Could not load admin activity')}}
function exportData(){const blob=new Blob([JSON.stringify({songs,playlists},null,2)],{type:'application/json'}),a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='synth-audio-export.json';a.click();URL.revokeObjectURL(a.href)}
function updateMediaSession(s){
  if(!('mediaSession' in navigator)||!s)return;
  try{navigator.mediaSession.metadata=new MediaMetadata({title:String(s.title||'SYNTH AUDIO'),artist:String(s.artist||'Unknown Artist'),album:String(s.album||'SYNTH AUDIO'),artwork:cover(s)?[{src:new URL(cover(s),location.href).href,sizes:'512x512',type:'image/png'}]:[]})}catch{}
}
function bindMediaSession(){
  if(!('mediaSession' in navigator)||bindMediaSession.bound)return;bindMediaSession.bound=true;
  const actions={play:()=>togglePlay(),pause:()=>togglePlay(),previoustrack:()=>prev(),nexttrack:()=>next(),seekbackward:()=>skip(-10),seekforward:()=>skip(10),seekto:e=>{if(e.seekTime!=null){const d=playbackDuration();if(d){const t=Math.max(0,Math.min(d,e.seekTime));if(nativeMode()&&nativeReady)nativeAudio.seek({audioId:NATIVE_AUDIO_ID,timeInSeconds:t}).catch(()=>{});else audio.currentTime=t}}}};
  for(const [name,fn] of Object.entries(actions)){try{navigator.mediaSession.setActionHandler(name,fn)}catch{}}
}
function startLiveRefresh(){
  if(startLiveRefresh.started)return;startLiveRefresh.started=true;bindMediaSession();
  let refreshing=false;
  const refresh=()=>{if(!user||document.hidden||!navigator.onLine||refreshing)return;refreshing=true;refreshData({silent:true}).then(({changed})=>{if(changed&&['home','library','downloads','favorites','recent','playlists'].includes(page)){renderPage();renderPlayer()}}).catch(()=>{}).finally(()=>{refreshing=false})};
  window.addEventListener('focus',refresh,{passive:true});document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh()});window.addEventListener('online',refresh,{passive:true});setInterval(refresh,5000);
}
init();startLiveRefresh();

window.addEventListener('popstate',()=>{
  const h=location.hash.replace(/^#/,'');
  page=h.startsWith('playlist-')?'playlist:'+h.slice(9):(h||'home');
  render();
});

/* SYNTH AUDIO v12 usability layer — additive only; existing features remain intact. */
(function(){
  const originalGo=window.go;
  if(typeof originalGo==='function'){
    window.go=function(p){
      try{document.querySelector('#pageContent')?.classList.remove('routeSwap');}catch{}
      const r=originalGo.apply(this,arguments);
      requestAnimationFrame(()=>document.querySelector('#pageContent')?.classList.add('routeSwap'));
      return r;
    };
  }
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const modal=document.querySelector('.modal');
      if(modal)modal.remove();
      const fp=document.querySelector('.fullplayer');
      if(fp)fp.remove();
    }
  });
  document.addEventListener('click',e=>{
    const modal=e.target.closest('.modal');
    if(modal && e.target===modal) modal.remove();
  });
  document.addEventListener('DOMContentLoaded',()=>{
    document.body.setAttribute('data-app','synth-audio');
  });
})();
