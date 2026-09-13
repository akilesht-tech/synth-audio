SYNTH AUDIO v23

This build keeps the existing SYNTH AUDIO architecture and adds reliability fixes.

Frontend:
- Offline downloads store both audio blobs and song metadata in IndexedDB v2.
- Downloads page can enumerate locally downloaded tracks even when the server is unavailable.
- Cached catalog/Offline catalog is painted before network refresh.
- Mobile mini-player keeps More and Queue actions visible and touch-friendly.
- Song-change playback uses the existing queue/native/background playback architecture.
- Activity page remains Activity-only for users.
- Updated service-worker shell cache to v23.
- Added mobile player/modal animations and interaction polish.

Backend:
- Railway STORAGE_DIR support for persistent Volume storage.
- Playlist client-request idempotency.
- Queued/atomic DB saves.
- SSE realtime event stream.
- Upload responds before optional FFmpeg artwork extraction.

Railway:
- Start command: npm run server
- Attach a persistent Volume and set STORAGE_DIR to its mount path, e.g. /app/storage.
