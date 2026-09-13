// SYNTH AUDIO server routing. Web/PWA always uses the public origin; Capacitor uses the saved laptop/LAN server.
window.SYNTH_SERVER_URL = localStorage.getItem('synthServerUrl') || 'http://10.90.82.78:3000';
