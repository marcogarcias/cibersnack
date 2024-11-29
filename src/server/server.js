//const { start } = require('@popperjs/core');
const { myEmitter } = require('./../main');
const WebSocket = require('ws');

  function init(){
  
    // se crea el servidor webSocket
    const wss = new WebSocket.Server({ port: 8080 });
  
    console.log('3. Servidor WebSocket corriendo en el puerto 8080');
  
    wss.on('connection', (ws)=>{
      console.log('Cliente conectado');
  
      // Escuchando mensajes del cliente
      ws.on('message', (data)=>{
        const message = JSON.parse(data);
        console.log('Mensaje del cliente (server.js): ', message);
        myEmitter.emit('getMessageFromServer', message);
  
        // Enviar comands al cliente
        ws.on('error', (error)=>{
          console.error('Error: ', error);
        }); 
  
        // Bloquear la pc del cliente
        ws.send(JSON.stringify({ action: 'lock' }));
  
        // Desbloquear la pc del cliente
        ws.send(JSON.stringify({ action: 'unlock' }));
      });
    });
  
    return true;
  }


module.exports.server = { init };
