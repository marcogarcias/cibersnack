import { createApp } from 'vue'
import App from './App.vue'
import "./assets/css/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";



const app = createApp(App);
app.mount('#app');


const { ipcRenderer } = window.require('electron');
//const { startServer } = require('./main');
/*
ipcRenderer.on('startServer', () => {
  //startServer(); // Iniciar el servidor
  ipcRenderer.send('startServer');
});
*/

ipcRenderer.on('startClient', () => {
  ipcRenderer.send('startClient');
  //const clientApp = require('./components/Client/ClientComponent.vue');
  // Aquí puedes montar el componente del cliente en la interfaz
});