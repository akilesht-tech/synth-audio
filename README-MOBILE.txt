SYNTH AUDIO v13 - Mobile-first build

For phone on same Wi-Fi as laptop:
1. On laptop run: node server.js
2. Find laptop IPv4 with: ipconfig
3. On phone open: http://YOUR-LAPTOP-IP:3000
4. Keep the laptop server running.

For a more app-like experience in Chrome on Android, use the browser menu and choose Install app / Add to Home screen when offered.

This version keeps the existing SYNTH AUDIO features and adds a mobile-first responsive layer.


PHONE + LAPTOP SETUP
1. Install the Windows SYNTH AUDIO app on the laptop.
2. Open SYNTH AUDIO once; its server starts automatically and can stay minimized.
3. Install the Android APK built from this project.
4. Connect phone and laptop to the same Wi-Fi.
5. The Android app uses the configured server URL in public/native-config.js.
