const { app, BrowserWindow, ipcMain } = require('electron');
//const { server } = require('./server/server.js');
//const { client } = require('./client/client.js');
const WebSocket = require('ws');
const path = require('path');


let wss;
let win;

function createWindow(){
  console.log('2. Creando ventana...');
  win = new BrowserWindow({
    width: 1080,
    height: 950,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation:false
    }
  });

  if(process.env.DEBUG){
    win.webContents.openDevTools();
    //win.loadURL('http://localhost:8080');
    win.loadFile(path.join(__dirname, '../dist/index.html'));
    // Agregar manejo de errores para debuggear
    win.webContents.on('did-fail-load', (event, errorCode, errorDescription) => {
      console.log('Error al cargar:', errorDescription);
      console.log('Código de error:', errorCode);
      console.log('¿Está corriendo el servidor de desarrollo en http://localhost:8080?');
    });
  }else{
    //win.loadURL(path.join(__dirname, 'dist/index.html'));
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }

  // ventana maximizada
  win.maximize();

  /*
  // eventos IPC
  ipcMain.on('initServer', (e)=>{
    try {
      server.init();
      e.sender.send('serverRes', { success: true, msg: 'El servidor se inició correctamente' });
    }catch(error){
      e.sender.send('serverRes', { success: false, msg: error.message, stack: error.stack });
    }
  });
  
  myEmitter.on('getMessageFromServer', (e, data)=>{
    console.log('Mensaje del cliente (main.js)', data)
    win.webContents.send('serverRes', data);
  });
  
  ipcMain.on('initClient', async (e)=>{
    console.log('*************************');
    console.log('*** INICIANDO CLIENTE ***');
    console.log('*************************');
    try {
      await client.init();
      console.log('** Cliente conectado al servidor...');
      e.sender.send('clientRes', { success: true, msg: 'Se conectó al servidor correctamente' });
      //e.sender.send('ServerRes', { success: true, msg: 'Cliente conectado correctamente' });
    }catch(error){
      console.log('** Error al conectarse al servidor...', error.message, error.stack);
      e.sender.send('clientRes', { success: false, msg: error.message, stack: error.stack });
      //e.sender.send('serverRes', { success: false, msg: error.message });
    }
  });
*/
}

function startServer() {
  wss = new WebSocket.Server({ port: 8080 });
  console.log('** Servidor WebSocket corriendo en el puerto 8080');

  wss.on('connection', (ws) => {
    console.log('Cliente conectado');

    // Escuchar mensajes del cliente
    ws.on('message', (message) => {
      console.log('** Mensaje del cliente:', message);
      // Enviar el mensaje al proceso de renderizado
      if(win){
        win.webContents.send('clientMessage', message);
      }
    });
  });
}

// Escuchar eventos desde el proceso de renderizado
ipcMain.on('startServer', (event) => {
  startServer(); // Iniciar el servidor
});

ipcMain.on('startClient', (event) => {
  // Aquí puedes manejar la lógica para iniciar el cliente
  console.log('Iniciando cliente...');
  // Puedes abrir una nueva ventana para el cliente o manejarlo de otra manera
});

/*app.on('ready', ()=>{
  //app.commandLine.appendSwitch('ignore-certificate-errors');
  console.log('*******************************');
  console.log('***** CIBER SNACK CONTROL *****');
  console.log('*******************************');
  console.log('1. iniciando app...');
  createWindow();
  console.log('*******************************');
});*/
//app.whenReady().then(createWindow);
app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () =>{ 
  if (process.platform !== 'darwin'){ 
    app.quit(); 
  } 
}); 

app.on('activate', () =>{ 
  if(BrowserWindow.getAllWindows().length === 0){
    createWindow(); 
  } 
});

module.exports = { startServer };