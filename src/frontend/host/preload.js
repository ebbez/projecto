const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld('myAPI', {
	onScreens: (callback) => ipcRenderer.on('screens', (_event, value) => callback(value)),
	pickScreen: (screen) => ipcRenderer.send('pickScreen', screen),
	onAddress: (callback) => ipcRenderer.on('address', (_event, value) => callback(value))
})
