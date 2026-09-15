SYNTH AUDIO v25 — performance + streaming redesign

Built from the working v24 project. Existing music, playlists, downloads, owner administration, responsive layout, offline HTML-audio playback, Media Session support, SSE refresh and persistent storage are preserved.

New in v25:
- Account sign-in with separate email/user ID + password and account creation.
- Passwords are stored server-side using PBKDF2 hashes; login sessions use bearer tokens.
- Favorites and recently played state sync to the server so the same account can use multiple devices.
- Listening time remains tracked in seconds and displayed as minutes on Activity.
- Download/remove-download toggle.
- Playlist add/remove controls and cleaner playlist artwork presentation.
- Apple Music-inspired compact mini-player with previous, -10s, play/pause, +10s, next, queue and more actions.
- Race protection when rapidly changing songs, reducing wrong-song playback after Next/Previous.
- Streaming admin upload with visible upload progress; catalog entry appears as soon as the file is safely written.
- Cleaner welcome screen, typography, transitions, controls, cards and library styling.
- New simple non-neon SYNTH AUDIO logo.
- Service-worker cache bumped to v25.

Railway:
- Keep the Dockerfile deployment.
- Attach a Railway Volume for permanent music/database storage.
- Set STORAGE_DIR to the Volume mount path (for example /app/storage).
- Set ADMIN_KEY and OWNER_EMAIL in Railway variables.
- The app listens on Railway's PORT automatically.

Important limitation:
A browser/PWA can use HTML audio, IndexedDB downloads and Media Session for offline/background playback, but the mobile operating system can still suspend browser tabs. Full OS-level background playback/lock-screen behavior requires the Capacitor native Android source/build that was not included in the uploaded project files. v25 does not fabricate or replace that missing native source.
