SYNTH AUDIO v21 — ANDROID BACKGROUND AUDIO FIX

Fixed native Android playback for the Capacitor APK.

Key changes:
- Native AudioPlayer is now created once and reused instead of destroying/recreating it for every song.
- Next/previous song uses changeAudioSource + changeMetadata, which is the supported plugin workflow.
- Native callbacks are registered before initialize.
- Native player cleanup is safer.
- Native playback errors are logged for diagnosis instead of being silently swallowed.
- Existing HTML audio fallback, mini-player, queue, repeat, shuffle, downloads, playlists and UI are preserved.

After extracting v21:
1. npm install
2. npx cap sync android
3. npx cap open android
4. Build a new APK.

IMPORTANT: uninstall the previous SYNTH AUDIO APK from the phone before installing v21, so the old native service/cache cannot interfere.


CORRECTION APPLIED: same-origin/public-tunnel resource URL normalization, playlist persistence, and API CORS/OPTIONS handling. Existing features/UI preserved; no new app feature added.
