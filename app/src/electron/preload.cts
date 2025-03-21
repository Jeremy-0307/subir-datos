import { contextBridge, ipcRenderer } from 'electron';

const electron = require("electron");

electron.contextBridge.exposeInMainWorld('electron', {
  openExcel: () => ipcRenderer.invoke('open-excel'),
  uploadExcel: () => ipcRenderer.invoke('upload-excel')
});
