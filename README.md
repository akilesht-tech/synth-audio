# SYNTH AUDIO v10 — Playback, Artwork & Offline Fix

This version preserves the existing app features and fixes three core problem areas:

- Audio files are served with HTTP byte-range support so seeking and browser playback work correctly.
- The service worker no longer caches `/uploads/*` audio/artwork or `/api/*`, preventing stale/full cached audio from breaking seeking and skipping.
- MP3 embedded APIC cover extraction is corrected; FFmpeg is used as a fallback for embedded artwork in supported formats.
- Offline downloads use IndexedDB blobs instead of `localStorage`, avoiding the small localStorage quota that caused “storage full” download failures.
- Existing legacy data-URL downloads are migrated to IndexedDB when possible.
- Upload continues to allow editing the song title before publishing; embedded metadata/artwork are used automatically when present.

## Run

PowerShell:

```powershell
$env:OWNER_EMAIL="akilesht@karunya.edu.in"
$env:ADMIN_KEY="Akil152506dp"
node server.js
```

Open `http://localhost:3000`.

Admin remains inside the app and is visible only to the configured owner after successful owner-key verification.

## Note

For public deployment, change the owner key and keep it out of source control.
