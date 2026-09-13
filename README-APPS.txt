SYNTH AUDIO v15 — PHONE + LAPTOP APP — AUTO SERVER

WHAT THIS VERSION IS
- Windows desktop app wrapper using Electron.
- Android app wrapper using Capacitor.
- The existing SYNTH AUDIO web UI, music library, owner/admin, playlists,
  downloads, playback, artwork, search, genre/language filters and statistics
  are preserved.
- The laptop app starts its own local music server automatically — no CMD window is required.
- Closing the laptop app window only minimizes it to the Windows system tray; the server stays online.
- The laptop app is configured to start with Windows so the shared server can come online automatically.
- The Android app connects to the laptop's SYNTH AUDIO server over the same Wi-Fi.

WINDOWS
1. Install Node.js LTS on the laptop.
2. In this folder run: npm install
3. Test: npm run desktop
4. Build an installable Windows app: npm run desktop:dist
   The installer/portable build will be placed in dist/.

ANDROID
1. Install Android Studio + Android SDK once on the build computer.
2. In this folder run: npm install
3. Create the Android project: npx cap add android
4. Sync: npm run android:sync
5. Build/run: npm run android:run
   Or: npm run android:open, then build the APK from Android Studio.

SERVER CONNECTION
- Phone and laptop must be on the same Wi-Fi network.
- Current default laptop address is http://10.90.82.78:3000
- If the laptop IP changes, edit public/native-config.js and rebuild/sync the Android app.
- The SYNTH AUDIO desktop app must remain running (it can stay minimized to the system tray) for the phone to access the shared music library.
- Windows firewall may need TCP port 3000 allowed.

IMPORTANT
This is a client/server music app. The Android APK does not magically host the
shared library; the laptop/server is the music source. Offline downloads still
work on the phone after songs have been downloaded.
