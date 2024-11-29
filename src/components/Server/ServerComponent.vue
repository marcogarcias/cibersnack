<template>
  <div>
    <h2>Servidor WebSocket</h2>
    <div>
      <h3>Mensajes Recibidos:</h3>
      <ul>
        <li v-for="(message, index) in messages" :key="index">{{ message }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: [],
    };
  },
  mounted() {
    const { ipcRenderer } = require('electron');
    ipcRenderer.on('clientMessage', (event, message) => {
      this.messages.push(message); // Agregar mensaje a la lista
    });
  },
};
</script>

<style scoped>
/* Estilos aquí */
</style>