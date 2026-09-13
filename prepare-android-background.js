const fs=require('fs'),path=require('path');
const manifest=path.join(process.cwd(),'android','app','src','main','AndroidManifest.xml');
const strings=path.join(process.cwd(),'android','app','src','main','res','values','strings.xml');
if(!fs.existsSync(manifest)){console.error('Android project not found. Run: npx cap add android');process.exit(1)}
let m=fs.readFileSync(manifest,'utf8');
for(const p of ['<uses-permission android:name="android.permission.FOREGROUND_SERVICE"/>','<uses-permission android:name="android.permission.FOREGROUND_SERVICE_MEDIA_PLAYBACK" />','<uses-permission android:name="android.permission.WAKE_LOCK" />'])if(!m.includes(p))m=m.replace(/<manifest([^>]*)>/,`<manifest$1>\n    ${p}`);
if(!m.includes('AudioPlayerService'))m=m.replace(/<\/application>/,`    <service android:name="us.mediagrid.capacitorjs.plugins.nativeaudio.AudioPlayerService" android:description="@string/audio_player_service_description" android:foregroundServiceType="mediaPlayback" android:exported="true"><intent-filter><action android:name="androidx.media3.session.MediaSessionService"/></intent-filter></service>\n</application>`);
if(!m.includes('android:usesCleartextTraffic="true"'))m=m.replace(/<application([^>]*)>/,(x,a)=>`<application${a} android:usesCleartextTraffic="true">`);fs.writeFileSync(manifest,m);
if(fs.existsSync(strings)){let st=fs.readFileSync(strings,'utf8');if(!st.includes('audio_player_service_description'))st=st.replace('</resources>','    <string name="audio_player_service_description">Allows for audio to play in the background.</string>\n</resources>');fs.writeFileSync(strings,st)}else{fs.mkdirSync(path.dirname(strings),{recursive:true});fs.writeFileSync(strings,'<resources>\n    <string name="audio_player_service_description">Allows for audio to play in the background.</string>\n</resources>\n')}
console.log('SYNTH AUDIO Android background-audio configuration applied.');
