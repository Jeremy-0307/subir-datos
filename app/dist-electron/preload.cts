import { contextBridge, ipcRenderer } from 'electron';
contextBridge.exposeInMainWorld('electron', {
    readExcelFile: (filePath) => ipcRenderer.invoke('readExcelFile', filePath),
});
