import { app, BrowserWindow, ipcMain, globalShortcut, shell } from "electron";
import path from "path";
import { electronApp, optimizer, is } from '@electron-toolkit/utils';


// Configurações básicas da janela
const windowConfig = {
    title: "Bionovis",
    minWidth: 1200,
    minHeight: 768,
    fullscreen: true,
    resizable: false,
    frame: false,
    show: false,
    autoHideMenuBar: true,
    icon: path.resolve(__dirname, '../../resources/icon.png'), // Uso de path.resolve
    webPreferences: {
        preload: path.join(__dirname, '../preload/index.js'),
        sandbox: false,
        contextIsolation: false,
    }
};

function createWindow() {
    const mainWindow = new BrowserWindow(windowConfig);

    app.whenReady().then(() => {
        globalShortcut.register('F11', () => {});
        globalShortcut.register('Alt+F4', () => {});
    });

    mainWindow.once('ready-to-show', () => mainWindow.show());

    mainWindow.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

    const loadUrl = process.env['ELECTRON_RENDERER_URL'] || path.join(__dirname, '../renderer/index.html');
    is.dev ? mainWindow.loadURL(loadUrl) : mainWindow.loadFile(loadUrl);

    //functions invoke
    ipcMain.on("close-app", app.quit);
    ipcMain.on("open-file", (event, path) => {
        shell.openPath(path).catch(err => {
            console.error('Failed to open file:', err);
        });
    })
}

export function LoadWindow() {
    app.whenReady().then(() => {
        electronApp.setAppUserModelId('com.electron.bionovis');
        app.on('browser-window-created', (_, window) => optimizer.watchWindowShortcuts(window));
        createWindow();
        app.on('activate', () => BrowserWindow.getAllWindows().length === 0 && createWindow());
    });

    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit();
    });
}
