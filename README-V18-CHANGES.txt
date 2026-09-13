SYNTH AUDIO v18 — performance, reactive navigation, mobile and playback polish

Based directly on v17. Existing backend, playlists, downloads, offline playback, owner-only admin, artwork, genre/language filtering, desktop wrapper and Capacitor background audio are preserved.

Key changes:
- Faster navigation: app shell is created once instead of rebuilding sidebar/nav on every route change.
- Faster startup: songs, playlists and stats load in parallel; legacy download migration no longer blocks first render.
- Faster admin upload completion: the returned uploaded song is inserted immediately instead of downloading the entire catalog again.
- Debounced search for user library and admin library.
- Live refresh on focus/online/visibility and every 15 seconds so newly uploaded music appears sooner.
- Web/PWA API base uses the public origin; native Capacitor still uses the configured laptop server.
- Browser Media Session controls for play/pause/previous/next/10-second seek, improving background playback on supported browsers.
- Mobile and desktop typography, touch targets, admin layout, dialogs and spacing strengthened.
- Service-worker cache version bumped so updated UI assets refresh correctly.
- Server JSON responses can use gzip and static assets receive better cache policy.
- Upload disk write is asynchronous to reduce server blocking.
