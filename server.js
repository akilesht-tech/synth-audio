const http=require('http');
const fs=require('fs');
const path=require('path');
const crypto=require('crypto');
const zlib=require('zlib');
const {spawnSync}=require('child_process');
const {URL}=require('url');

const ROOT=__dirname, PUBLIC=path.join(ROOT,'public'), DATA=path.join(ROOT,'data'), UP=path.join(PUBLIC,'uploads');
fs.mkdirSync(DATA,{recursive:true});fs.mkdirSync(UP,{recursive:true});
const DB=path.join(DATA,'db.json');
let db={songs:[],playlists:[],events:[],listening:{}};
try{if(fs.existsSync(DB)) db=Object.assign(db,JSON.parse(fs.readFileSync(DB,'utf8')))}catch{}
function save(){fs.writeFileSync(DB,JSON.stringify(db,null,2))}
const ADMIN_KEY=String(process.env.ADMIN_KEY||'Akil152506dp');
const OWNER_EMAIL=(process.env.OWNER_EMAIL||'akilesht@karunya.edu.in').trim().toLowerCase();
const PORT=Number(process.env.PORT||3000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.svg':'image/svg+xml','.webp':'image/webp','.ico':'image/x-icon','.mp3':'audio/mpeg','.wav':'audio/wav','.ogg':'audio/ogg','.opus':'audio/ogg','.m4a':'audio/mp4','.aac':'audio/aac','.flac':'audio/flac'};
function send(res,status,data,type='application/json'){
  const bodyBuf=Buffer.isBuffer(data)?data:Buffer.from(type.startsWith('application/json')?JSON.stringify(data):data);
  const ae=String(res.req?.headers?.['accept-encoding']||'');
  const headers={'Content-Type':type,'X-Content-Type-Options':'nosniff','Vary':'Accept-Encoding','Access-Control-Allow-Origin':'*','Access-Control-Allow-Methods':'GET,POST,PUT,DELETE,OPTIONS','Access-Control-Allow-Headers':'Content-Type,x-admin-key,Range','Access-Control-Expose-Headers':'Content-Range,Accept-Ranges,Content-Length'};
  if(type.startsWith('application/json'))headers['Cache-Control']='private, max-age=3, stale-while-revalidate=10'; else headers['Cache-Control']='public, max-age=3600';
  if(bodyBuf.length>1024 && /gzip/i.test(ae)){zlib.gzip(bodyBuf,(err,out)=>{if(err){res.writeHead(status,headers);return res.end(bodyBuf)}headers['Content-Encoding']='gzip';headers['Content-Length']=out.length;res.writeHead(status,headers);res.end(out)});return}
  headers['Content-Length']=bodyBuf.length;res.writeHead(status,headers);res.end(bodyBuf);
}
function body(req){return new Promise((resolve,reject)=>{const a=[];req.on('data',c=>a.push(c));req.on('end',()=>resolve(Buffer.concat(a)));req.on('error',reject)})}
async function jsonBody(req){const b=await body(req);return JSON.parse(b.toString()||'{}')}

function readSynchsafe(b,o){return ((b[o]&127)<<21)|((b[o+1]&127)<<14)|((b[o+2]&127)<<7)|(b[o+3]&127)}
function decodeId3Text(buf){
  if(!buf||!buf.length)return '';
  const enc=buf[0]; let body=buf.slice(1);
  try{
    if(enc===0)return body.toString('latin1').replace(/\0.*$/s,'').trim();
    if(enc===1)return body.toString('utf16le').replace(/^\uFEFF/,'').replace(/\0.*$/s,'').trim();
    if(enc===2)return body.toString('utf16le').replace(/^\uFEFF/,'').replace(/\0.*$/s,'').trim();
    return body.toString('utf8').replace(/\0.*$/s,'').trim();
  }catch{return ''}
}
function parseMp3Tags(buf){
  const out={title:'',artist:'',album:'',genre:'',language:'',cover:null};
  if(buf.slice(0,3).toString()!=='ID3')return out;
  const ver=buf[3], size=readSynchsafe(buf,6), end=Math.min(buf.length,10+size); let pos=10;
  while(pos+10<=end){
    const id=buf.slice(pos,pos+4).toString('ascii'); if(!/^[A-Z0-9]{4}$/.test(id)||id==='\0\0\0\0')break;
    let n=ver>=4?readSynchsafe(buf,pos+4):buf.readUInt32BE(pos+4); if(n<=0){pos+=10;continue}
    const frameEnd=Math.min(end,pos+10+n), data=buf.slice(pos+10,frameEnd); pos=frameEnd;
    if(id==='TIT2')out.title=decodeId3Text(data)||out.title;
    else if(id==='TPE1')out.artist=decodeId3Text(data)||out.artist;
    else if(id==='TALB')out.album=decodeId3Text(data)||out.album;
    else if(id==='TCON')out.genre=decodeId3Text(data)||out.genre;
    else if(id==='TLAN')out.language=decodeId3Text(data)||out.language;
    else if(id==='APIC'&&data.length>5){
      let i=1; const z=data.indexOf(0,i); if(z<0)continue; const mime=data.slice(i,z).toString('ascii')||'image/jpeg'; i=z+1; i+=1; const d=data.indexOf(0,i); if(d<0)continue; i=d+1; if(i<data.length)out.cover={mime,data:data.slice(i)};
    }
  }
  return out;
}
function parseFlacTags(buf){
  const out={title:'',artist:'',album:'',genre:'',language:'',cover:null};
  if(buf.slice(0,4).toString()!=='fLaC')return out;
  let pos=4;
  while(pos+4<=buf.length){
    const h=buf[pos], last=!!(h&128), type=h&127, n=buf.readUIntBE(pos+1,3); pos+=4; if(pos+n>buf.length)break; const d=buf.slice(pos,pos+n); pos+=n;
    if(type===4){ const txt=d.toString('utf8'); for(const part of txt.split('\0')){const eq=part.indexOf('=');if(eq<1)continue;const k=part.slice(0,eq).toLowerCase(),v=part.slice(eq+1).trim(); if(k==='title')out.title=v; else if(k==='artist')out.artist=v; else if(k==='album')out.album=v; else if(k==='genre')out.genre=v; else if(k==='language')out.language=v;} }
    if(type===6&&d.length>32){
      let q=0; const read32=()=>{const v=d.readUInt32BE(q);q+=4;return v}; read32(); const mimeLen=read32(); const mime=d.slice(q,q+mimeLen).toString(); q+=mimeLen; const descLen=read32(); q+=descLen; read32();read32();read32();read32(); const dataLen=read32(); if(q+dataLen<=d.length)out.cover={mime:mime||'image/jpeg',data:d.slice(q,q+dataLen)};
    }
    if(last)break;
  }
  return out;
}
function extractEmbeddedMetadata(buf,ext){
  if(ext==='.mp3')return parseMp3Tags(buf);
  if(ext==='.flac')return parseFlacTags(buf);
  return {title:'',artist:'',album:'',genre:'',language:'',cover:null};
}
function saveEmbeddedCover(c){
  if(!c||!c.data||!c.data.length)return '';
  const mime=String(c.mime||'image/jpeg').toLowerCase();
  const ext=mime.includes('png')?'.png':mime.includes('webp')?'.webp':mime.includes('gif')?'.gif':'.jpg';
  const name=crypto.randomUUID()+ext; fs.writeFileSync(path.join(UP,name),c.data); return '/uploads/'+name;
}
function extractCoverWithFfmpeg(filePath){
  try{
    const name=crypto.randomUUID()+'.jpg', out=path.join(UP,name);
    const r=spawnSync('ffmpeg',['-y','-hide_banner','-loglevel','error','-i',filePath,'-an','-frames:v','1','-vf','scale=1000:1000:force_original_aspect_ratio=decrease',out],{timeout:20000,windowsHide:true});
    if(r.status===0&&fs.existsSync(out)&&fs.statSync(out).size>100)return '/uploads/'+name;
    try{fs.unlinkSync(out)}catch{}
  }catch{}
  return '';
}

function safeEqual(a,b){a=String(a||'');b=String(b||'');const aa=Buffer.from(a),bb=Buffer.from(b);return aa.length===bb.length&&crypto.timingSafeEqual(aa,bb)}
function adminAuth(req){return safeEqual(req.headers['x-admin-key'],ADMIN_KEY)}
function ownerIdentity(email,key){return String(email||'').trim().toLowerCase()===OWNER_EMAIL&&safeEqual(key,ADMIN_KEY)}
function event(type,detail,userEmail=''){db.events.unshift({id:crypto.randomUUID(),type,detail,userEmail:String(userEmail||'').toLowerCase(),at:new Date().toISOString()});db.events=db.events.slice(0,1000);save()}
function parseMultipart(buf,ct){const m=/boundary=(?:"([^"]+)"|([^;]+))/i.exec(ct||'');if(!m)throw Error('Missing multipart boundary');const boundary=Buffer.from('--'+(m[1]||m[2]));let pos=0,parts=[];while(true){let s=buf.indexOf(boundary,pos);if(s<0)break;s+=boundary.length;if(buf[s]===45&&buf[s+1]===45)break;if(buf[s]===13&&buf[s+1]===10)s+=2;const e=buf.indexOf(Buffer.from('\r\n\r\n'),s);if(e<0)break;const headers=buf.slice(s,e).toString();const next=buf.indexOf(boundary,e+4);if(next<0)break;const data=buf.slice(e+4,next-2);const nm=/name="([^"]+)"/i.exec(headers),fm=/filename="([^"]*)"/i.exec(headers);if(nm)parts.push({name:nm[1],filename:fm?fm[1]:null,data});pos=next}return parts}
function publicSong(s){const x={...s};delete x.fileSize;return x}
function userEmail(reqUrl){return String(reqUrl.searchParams.get('userEmail')||'').trim().toLowerCase()}

function hydrateMissingArtwork(){
  let changed=false;
  for(const s of db.songs){
    if(s.cover)continue;
    const fp=s.file?path.join(PUBLIC,s.file.replace(/^\//,'').replace(/\//g,path.sep)):'';
    if(!fp||!fs.existsSync(fp))continue;
    try{const ext=path.extname(fp).toLowerCase();const meta=extractEmbeddedMetadata(fs.readFileSync(fp),ext);const c=saveEmbeddedCover(meta.cover);if(c){s.cover=c;changed=true}}catch{}
  }
  if(changed)save();
}
hydrateMissingArtwork();
async function handle(req,res){
 const u=new URL(req.url,'http://localhost'); const p=u.pathname;
 if(req.method==='GET'&&p==='/api/config')return send(res,200,{ownerEmail:OWNER_EMAIL,ownerLoginEnabled:true});
 if(req.method==='GET'&&p==='/api/health')return send(res,200,{ok:true,time:new Date().toISOString(),songs:db.songs.length});
 if(req.method==='POST'&&p==='/api/admin/verify'){try{const b=await jsonBody(req);if(!ownerIdentity(b.email,b.key))return send(res,401,{error:'Owner authorization failed'});return send(res,200,{ok:true})}catch{return send(res,400,{error:'Invalid request'})}}
 if(req.method==='GET'&&p==='/api/songs')return send(res,200,db.songs.map(publicSong));
 if(req.method==='GET'&&p==='/api/playlists'){const email=userEmail(u);const list=email?db.playlists.filter(x=>x.userEmail===email):[];return send(res,200,list)}
 if(req.method==='POST'&&p==='/api/playlists'){const b=await jsonBody(req),email=String(b.userEmail||'').trim().toLowerCase();if(!email)return send(res,400,{error:'User email required'});const pl={id:crypto.randomUUID(),name:String(b.name||'New Playlist').trim().slice(0,100),image:String(b.image||''),songIds:Array.isArray(b.songIds)?b.songIds:[],createdAt:new Date().toISOString(),userEmail:email};db.playlists.push(pl);save();event('playlist_created',pl.name,email);return send(res,200,pl)}
 if(req.method==='PUT'&&p.startsWith('/api/playlists/')){const id=p.split('/').pop(),b=await jsonBody(req),email=String(b.userEmail||'').trim().toLowerCase(),pl=db.playlists.find(x=>x.id===id&&x.userEmail===email);if(!pl)return send(res,404,{error:'Playlist not found'});if(b.name!==undefined)pl.name=String(b.name).trim().slice(0,100);if(b.image!==undefined)pl.image=String(b.image);if(Array.isArray(b.songIds))pl.songIds=b.songIds.filter(id=>db.songs.some(s=>s.id===id));save();return send(res,200,pl)}
 if(req.method==='DELETE'&&p.startsWith('/api/playlists/')){const id=p.split('/').pop(),email=String(u.searchParams.get('userEmail')||'').trim().toLowerCase(),before=db.playlists.length;db.playlists=db.playlists.filter(x=>!(x.id===id&&x.userEmail===email));if(db.playlists.length===before)return send(res,404,{error:'Playlist not found'});event('playlist_deleted',id,email);return send(res,200,{ok:true})}
 if(req.method==='GET'&&p==='/api/user/stats'){const email=userEmail(u);if(!email)return send(res,400,{error:'User email required'});return send(res,200,{listeningSeconds:Number(db.listening[email]||0),events:db.events.filter(e=>e.userEmail===email).slice(0,100)})}
 if(req.method==='POST'&&p==='/api/listening'){const b=await jsonBody(req),email=String(b.userEmail||'').trim().toLowerCase();if(!email)return send(res,400,{error:'User email required'});const sec=Math.max(0,Math.min(30,Number(b.seconds)||0));if(!sec)return send(res,200,{ok:true,totalSeconds:Number(db.listening[email]||0)});db.listening[email]=(Number(db.listening[email]||0)+sec);if(b.songId)event('listening',`${b.songId} · ${Math.round(sec)} sec`,email);else save();return send(res,200,{ok:true,totalSeconds:db.listening[email]})}
 if(req.method==='POST'&&p==='/api/events'){const b=await jsonBody(req),email=String(b.userEmail||'').trim().toLowerCase();if(b.songId&&b.type==='play'){const s=db.songs.find(x=>x.id===b.songId);if(s)s.plays=(s.plays||0)+1}event(b.type||'activity',b.detail||b.songId||'',email);return send(res,200,{ok:true})}
 if(p.startsWith('/api/admin')){
   if(!adminAuth(req))return send(res,401,{error:'Owner authorization required'});
   if(req.method==='GET'&&p==='/api/admin/stats'){
     let bytes=0;for(const s of db.songs)bytes+=Number(s.fileSize||0);
     const listening=Object.values(db.listening).reduce((a,b)=>a+Number(b||0),0);
     return send(res,200,{songs:db.songs.length,storageBytes:bytes,genres:[...new Set(db.songs.map(s=>s.genre).filter(Boolean))],languages:[...new Set(db.songs.map(s=>s.language).filter(Boolean))],events:db.events.slice(0,100),topPlayed:[...db.songs].sort((a,b)=>(b.plays||0)-(a.plays||0)).slice(0,10).map(publicSong),listeningSeconds:listening,users:Object.keys(db.listening).length});
   }
   if(req.method==='POST'&&p==='/api/admin/upload'){
     try{const b=await body(req),parts=parseMultipart(b,req.headers['content-type']);const file=parts.find(x=>x.filename);if(!file)throw Error('Audio file required');const ext=path.extname(file.filename).toLowerCase();if(!['.mp3','.wav','.ogg','.opus','.aac','.m4a','.flac'].includes(ext))throw Error('Unsupported audio format');if(file.data.length>250*1024*1024)throw Error('Audio file is larger than 250 MB');
       const name=crypto.randomUUID()+ext;await fs.promises.writeFile(path.join(UP,name),file.data);const val=k=>{const x=parts.find(z=>z.name===k);return x?x.data.toString().trim():''};
       const embedded=extractEmbeddedMetadata(file.data,ext); const manualCover=val('cover'); let cover=manualCover||saveEmbeddedCover(embedded.cover); if(!cover)cover=extractCoverWithFfmpeg(path.join(UP,name));
       const song={id:crypto.randomUUID(),title:val('title')||embedded.title||path.parse(file.filename).name,artist:val('artist')||embedded.artist||'Unknown Artist',album:val('album')||embedded.album||'Single',genre:val('genre')||embedded.genre||'Other',language:val('language')||embedded.language||'Unknown',duration:Number(val('duration')||0),cover,file:'/uploads/'+name,fileSize:file.data.length,createdAt:new Date().toISOString(),plays:0};db.songs.unshift(song);event('upload',song.title);return send(res,200,publicSong(song));
     }catch(e){return send(res,400,{error:e.message})}
   }
   if(req.method==='DELETE'&&p.startsWith('/api/admin/songs/')){const id=p.split('/').pop(),i=db.songs.findIndex(s=>s.id===id);if(i<0)return send(res,404,{error:'Song not found'});const s=db.songs[i];try{fs.unlinkSync(path.join(UP,path.basename(s.file)))}catch{}db.songs.splice(i,1);db.playlists.forEach(x=>x.songIds=x.songIds.filter(y=>y!==id));event('delete',s.title);return send(res,200,{ok:true})}
 }
 if(req.method==='GET'){
   const rel=p==='/'?'/index.html':p;
   let fp=path.resolve(PUBLIC,'.'+rel); if(!fp.startsWith(PUBLIC+path.sep)||!fs.existsSync(fp)||fs.statSync(fp).isDirectory())fp=path.join(PUBLIC,'index.html');
   try{
     const ext=path.extname(fp).toLowerCase(), type=mime[ext]||'application/octet-stream';
     if(ext.startsWith('.mp3')||['.wav','.ogg','.opus','.m4a','.aac','.flac'].includes(ext)){
       const size=fs.statSync(fp).size, range=req.headers.range;
       if(range){const m=/bytes=(\d*)-(\d*)/.exec(range);if(m){let start=m[1]?Number(m[1]):Math.max(0,size-(Number(m[2])||0));let end=m[2]?Number(m[2]):size-1;start=Math.max(0,Math.min(start,size-1));end=Math.max(start,Math.min(end,size-1));res.writeHead(206,{'Content-Type':type,'Content-Length':end-start+1,'Content-Range':`bytes ${start}-${end}/${size}`,'Accept-Ranges':'bytes','Cache-Control':'public, max-age=3600'});return fs.createReadStream(fp,{start,end}).pipe(res)}}
       res.writeHead(200,{'Content-Type':type,'Content-Length':size,'Accept-Ranges':'bytes','Cache-Control':'public, max-age=3600'});return fs.createReadStream(fp).pipe(res);
     }
     const data=fs.readFileSync(fp);const cache=ext==='.html'?'no-store':(ext==='.js'||ext==='.css'||ext==='.json'?'public, max-age=300':'public, max-age=86400');res.writeHead(200,{'Content-Type':type,'Cache-Control':cache,'Content-Length':data.length});return res.end(data)
   }catch{return send(res,404,{error:'Not found'})}
 }
 return send(res,404,{error:'Not found'});
}
http.createServer((req,res)=>handle(req,res).catch(e=>send(res,500,{error:e.message||'Server error'}))).listen(PORT,'0.0.0.0',()=>console.log(`SYNTH AUDIO running on port ${PORT}`));
