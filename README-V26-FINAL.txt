SYNTH AUDIO v26

Fixes included:
- Fixed IndexedDB download storage bug that caused Download failed messages.
- Downloads page now works from local metadata and can open in offline mode.
- Offline downloaded songs are available to play without the network.
- Added explicit play-count number beside each song row; 0 means not played yet.
- More menu for the current song now opens as a panel attached to the mini-player.
- Mini-player controls remain visible and touch-friendly on mobile.
- Playlist artwork is resized/compressed before upload for faster creation.
- Playlist creation is locked against double taps and uses a unique request ID.
- Navigation, cards, dialogs, buttons and sections received a full visual polish with colorful active states and entrance animations.
- Existing playback, queue, shuffle/repeat, accounts, sync, activity, admin upload and persistent-storage code retained.

Important:
- Browser/PWA background playback depends on the phone OS/browser. Full native Android lock-screen control requires the native Android project/build.
- For permanent Railway music/database storage, attach a Railway Volume and set STORAGE_DIR to the mounted path.
