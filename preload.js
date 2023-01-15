const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("magicalClipboard", {
  prev: (callback) => ipcRenderer.on("clipboard-write-prev", callback),
  forward: (callback) => ipcRenderer.on("clipboard-write-forward", callback),
  writeText: (value) => ipcRenderer.send("clipboard-writeText", value),
});
