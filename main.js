const {
  app,
  BrowserWindow,
  ipcMain,
  globalShortcut,
  clipboard,
} = require("electron");
const path = require("path");
const { exit } = require("process");

const createWindow = () => {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  const prevShortcut = globalShortcut.register(
    "CommandOrControl+Shift+<",
    () => {
      mainWindow.webContents.send("clipboard-write-prev");
    }
  );
  const forwardShortcut = globalShortcut.register(
    "CommandOrControl+Shift+>",
    () => {
      mainWindow.webContents.send("clipboard-write-forward");
    }
  );

  if (!prevShortcut || !forwardShortcut) {
    console.error("Shortcut Registration Error!");
    exit(1);
  }

  mainWindow.loadFile("index.html");
};

app.whenReady().then(() => {
  ipcMain.on("clipboard-writeText", (_event, value) => {
    clipboard.writeText(String(value));
  });

  createWindow();
  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

/*
Looks like this is recommended, but I don't prefer this so comment out it.
https://www.electronjs.org/docs/latest/tutorial/quick-start#quit-the-app-when-all-windows-are-closed-windows--linux

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") app.quit();
// });
*/
