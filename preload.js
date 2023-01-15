const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("magicalClipboard", {
  prev: (callback) => ipcRenderer.on("clipboard-write-prev", callback),
  forward: (callback) => ipcRenderer.on("clipboard-write-forward", callback),
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});
