SYNTH AUDIO v17

This version is based directly on the working v15 Phone + Laptop AutoServer project. Existing working features are preserved. Only the requested areas were modified:
- Android background playback + lock-screen media controls.
- Mini-player: Previous, 10-second Back, Play/Pause, 10-second Forward, Next.
- Genre/language filters: normalized case/whitespace matching.
- Responsive layout polish for phone and laptop.

Background audio uses @mediagrid/capacitor-native-audio v2.x, which is the Capacitor 7 line. Do NOT install @jofr/capacitor-media-session (that package is for Capacitor 6).

Android:
1. npm install
2. If android folder does not exist: npx cap add android
3. npm run android:prepare
4. npx cap sync android
5. Build APK with Android Studio or npm run android:build after JAVA_HOME is set to Android Studio\'s jbr.

Offline downloads are preserved. Downloaded tracks continue to use the existing IndexedDB/offline HTML-audio path; server-streamed tracks use native background playback.
