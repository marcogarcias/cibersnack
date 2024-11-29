<template>
  <div>
    <h1>Aplicación Electron</h1>
    <button @click="startServer">Iniciar Servidorcvcvcv</button>
    <button @click="startClient">Iniciar Cliente</button>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');

export default {
  methods: {
    startServer() {
      ipcRenderer.send('startServer');
    },
    startClient() {
      ipcRenderer.send('startClient');
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
