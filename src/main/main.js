const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron')
const path = require('path');

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false
    },
    backgroundColor: '#0f172a'
  });


  if (app.isPackaged) {

    win.loadFile(path.join(__dirname, '../../dist/renderer/index.html'));
  } else {

    win.loadURL('http://localhost:5173');

  }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

ipcMain.on('window-close', () => {
  app.quit()
})

ipcMain.on('window-minimize', () => {
  const win = BrowserWindow.getFocusedWindow()
  if (win) win.minimize()
})