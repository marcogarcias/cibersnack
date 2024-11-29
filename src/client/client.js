const WebSocket = require('ws');
const {app, BrowserWindow} = require('electron');

//Crear una Ventana de bloqueo
let lockWin = null;
let ws;

function init(){
  return new Promise((resolve, reject)=>{
    try{
      //Conexión al server con WebSockect
      ws = new WebSocket('ws://192.168.0.29:8080');

      ws.onopen = () => {
        //console.log('** Conexión exitosa con el servidor.');
        ws.send(JSON.stringify({ success: true, action: 'clientConected', msg: 'Cliente conectado' }));
        resolve({ success: true, msg: 'Se conectó al servidor correctamente' });
      };

      ws.onerror = (err) => {
        //console.error('** Error al conectar al servidor:', err.message || err);
        reject(new Error(`No se pudo conectar al servidor. ${err.message}` ));
      };

      ws.onclose = () => {
        console.log('** La conexión con el servidor se cerró.');
        reject(new Error('La conexión con el servidor fue cerrada.'));
      };

      ws.on('message', (data) => {
        const res = JSON.parse(data);
        console.log('** Mensaje del servidor: ', res);
      });

      /*
      ws.on('open', ()=>{
        console.log('Conectado al servidor...');
      });
      
      ws.on('message', (data)=>{
        const res = JSON.parse(data);
        if(res.action == 'lock'){
          showLockScreen();
        }else if(res.action == 'unlock'){
          hideLockScreen();
        }
      });
      */
    }catch (error){
      reject(new Error('Error durante la inicialización del cliente WebSocket: ' + err.message));
    }
  });
}

function showLockScreen(){
  if(!lockWin){
    lockWin = new BrowserWindow({
      fullscreen: true,
      frame: false,
      alwaysOnTop: true,
      kiosk: true,
      webPreferences: { nodeIntegration: true }
    });

    lockWin.loadURL(`data:text/html,
      <html>
        <body style="margin: 0; background-color: black; display: flex; align-items: center; justify-content: center;">
          <h1>BLOQUEADO</h1>
        </body>
      </html>`);
    
    lockWin.on('close', (e)=>{
      e.preventDefault();
      // evita que se cierre manualmente
    });
  }
}

function hideLockScreen(){
  if(lockWin){
    lockWin.close();
    lockWin = null;
  }
}

module.exports.client = { init };