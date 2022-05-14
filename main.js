const { app, BrowserWindow, ipcMain, Notification, nativeTheme } = require('electron');
const path = require("path");

let win;

const loadMainWindow = () => {
    win = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            // preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadFile(path.join(__dirname, "index.html"));

    ipcMain.handle('dark-mode:toggle', () => {
        if (nativeTheme.shouldUseDarkColors) {
            nativeTheme.themeSource = 'light'
        } else {
            nativeTheme.themeSource = 'dark'
        }
        return nativeTheme.shouldUseDarkColors
    })

    ipcMain.handle('dark-mode:system', () => {
        nativeTheme.themeSource = 'system'
    })
}

app.on("ready", () => {
    loadMainWindow();

    app.setAppUserModelId("com.ikobit.desktop-notifications");
    //app.setAppUserModelId(process.execPath);
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        loadMainWindow();
    }
});

ipcMain.handle('show-notification', (event, ...args) => {
    const notification = {
        title: 'New Task',
        body: `Added: ${args[0]}`
    }

    new Notification(notification).show()
});

// Listen for message from (any) render thread.
ipcMain.on('message:fromRender', (event, message) => {
    console.log(message);
});

// ipcMain.on("toMain", (event, args) => {
//     fs.readFile("path/to/file", (error, data) => {
//         // Do something with file contents

//         // Send result back to renderer process
//         win.webContents.send("fromMain", responseObj);
//     });
// });