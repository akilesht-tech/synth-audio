const { app, BrowserWindow, dialog, Tray, Menu } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let serverProcess;
let mainWindow;
let tray;
let quitting = false;
const PORT = 3000;

function waitForServer(url, tries = 40) {
  return new Promise((resolve, reject) => {
    const check = () => {
      const req = http.get(url, res => { res.resume(); resolve(); });
      req.on('error', () => {
        if (--tries <= 0) reject(new Error('SYNTH AUDIO server did not start.'));
        else setTimeout(check, 250);
      });
      req.setTimeout(500, () => req.destroy());
    };
    check();
  });
}

function createTray() {
  tray = new Tray(path.join(__dirname, '..', 'public', 'logo-192.png'));
  const menu = Menu.buildFromTemplate([
    { label: 'Open SYNTH AUDIO', click: () => { mainWindow.show(); mainWindow.focus(); } },
    { label: 'Server: Online', enabled: false },
    { type: 'separator' },
    { label: 'Exit SYNTH AUDIO', click: () => { quitting = true; app.quit(); } }
  ]);
  tray.setToolTip('SYNTH AUDIO — Music Server Online');
  tray.setContextMenu(menu);
  tray.on('double-click', () => { mainWindow.show(); mainWindow.focus(); });
}

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 650,
    backgroundColor: '#09090f',
    title: 'SYNTH AUDIO',
    icon: path.join(__dirname, '..', 'public', 'logo-512.png'),
    webPreferences: { contextIsolation: true, nodeIntegration: false }
  });
  await waitForServer(`http://127.0.0.1:${PORT}/api/config`);
  await mainWindow.loadURL(`http://127.0.0.1:${PORT}`);
  createTray();
  mainWindow.on('close', (event) => {
    if (!quitting) { event.preventDefault(); mainWindow.hide(); }
  });
}

app.whenReady().then(async () => {
  app.setLoginItemSettings({ openAtLogin: true, openAsHidden: true });
  serverProcess = spawn(process.execPath, [path.join(__dirname, '..', 'server.js')], {
    cwd: path.join(__dirname, '..'),
    env: { ...process.env, SYNTH_DESKTOP_APP: '1' },
    stdio: 'ignore',
    windowsHide: true
  });
  try { await createWindow(); }
  catch (e) { dialog.showErrorBox('SYNTH AUDIO', e.message); app.quit(); }
});

app.on('window-all-closed', () => { if (quitting && serverProcess) serverProcess.kill(); if (process.platform !== 'darwin' && quitting) app.quit(); });
app.on('before-quit', () => { if (serverProcess) serverProcess.kill(); });
