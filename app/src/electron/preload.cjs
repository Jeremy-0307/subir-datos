"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var electron = require("electron");
electron.contextBridge.exposeInMainWorld('electron', {
    openExcel: function () { return electron_1.ipcRenderer.invoke('open-excel'); },
    uploadExcel: function () { return electron_1.ipcRenderer.invoke('upload-excel'); }
});
