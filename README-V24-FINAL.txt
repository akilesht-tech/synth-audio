SYNTH AUDIO v24 — consolidated reliability build

Requirements addressed in this build:
- Offline catalog and IndexedDB downloaded-track playback path.
- Persistent mini-player rendering on every track change.
- Mobile action sheet for the mini-player three-dot menu.
- Playlist creation locking and server request-id/name duplicate protection.
- Streaming admin upload endpoint with progress; metadata/artwork work is moved out of the response path.
- Server-sent realtime catalog/activity updates with polling fallback.
- Activity page is Activity-only; statistics cards are removed from the user Activity page and owner Activity tab.
- Mobile touch targets, transitions, modal/player animations and refreshed typography.
- Native URL routing corrected so Capacitor uses the configured server instead of rewriting /uploads to the WebView origin.
- Service worker cache bumped to v24.
- Railway persistent storage supported through STORAGE_DIR.

Railway:
1. Attach a Railway Volume to the service.
2. Set STORAGE_DIR to that Volume mount path, e.g. /app/storage.
3. Keep Start Command: npm run server.
4. Keep ADMIN_KEY and OWNER_EMAIL as Railway environment variables.

Native/Capacitor:
Set SYNTH_PUBLIC_SERVER_URL to the public Railway URL when generating a native build.

Note: this consolidated source contains the frontend/backend files available from the uploaded v21 project. Android/Electron source directories were not among the uploaded files, so they were not fabricated or replaced.
