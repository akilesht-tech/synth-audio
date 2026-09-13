// SYNTH AUDIO server routing. Set SYNTH_PUBLIC_SERVER_URL for a deployed native build; otherwise keep the legacy LAN fallback.
window.SYNTH_SERVER_URL = window.SYNTH_PUBLIC_SERVER_URL || localStorage.getItem('synthServerUrl') || 'http://10.90.82.78:3000';
