"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron = require("electron");
electron.contextBridge.exposeInMainWorld('electron', {
    openExcel: () => electron_1.ipcRenderer.invoke('open-excel'),
    uploadExcel: () => electron_1.ipcRenderer.invoke('upload-excel')
});
