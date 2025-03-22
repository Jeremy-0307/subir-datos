import path from 'path';
import { isDev } from './util.js';
import { app, BrowserWindow, ipcMain, dialog } from 'electron';
import { getPreloadPath } from './pathResolver.js';
import { excelToTS, mainCreator } from './excelTransformer.js';
function createMainWindow() {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath()
        }
    });
    if (isDev()) {
        mainWindow.loadURL('http://localhost:5123');
    }
    else {
        mainWindow.loadFile(path.join(app.getAppPath(), '/dist-react/index.html'));
    }
    mainWindow.on('close', (event) => {
        event.preventDefault();
        app.quit();
        process.exit(0);
    });
    return mainWindow;
}
app.whenReady().then(() => {
    createMainWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createMainWindow();
        }
    });
});
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
        process.exit(0);
    }
});
ipcMain.handle('open-excel', async () => {
    let output;
    try {
        const { canceled, filePaths } = await dialog.showOpenDialog({
            properties: ['openFile'],
            filters: [{ name: 'Excel Files', extensions: ['xlsx', 'xls'] }]
        });
        if (canceled || filePaths.length === 0) {
            return { success: false, message: 'File selection was canceled' };
        }
        const filePath = filePaths[0];
        output = await excelToTS(filePath);
        console.log(output?.message);
        return { success: output.success, message: output?.message };
    }
    catch (error) {
        console.error('Error processing Excel file:', error);
        if (!output) {
            return { success: false, message: 'No output returned' };
        }
        return { success: false, message: output?.message };
    }
});
ipcMain.handle('upload-excel', async () => {
    let output;
    try {
        output = await mainCreator();
        console.log(output?.message);
        return {
            success: output.success,
            message: output?.message
        };
    }
    catch (error) {
        console.error('Error processing Excel file:', error);
        return {
            success: false,
            message: output?.message
        };
    }
});
