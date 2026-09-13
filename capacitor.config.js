const config = {
  appId: 'com.synthaudio.app',
  appName: 'SYNTH AUDIO',
  webDir: 'public',
  server: { url: process.env.SYNTH_PUBLIC_SERVER_URL || 'http://10.90.82.78:3000', cleartext: true }
};
module.exports = config;
