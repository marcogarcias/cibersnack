<template>
  <div>
    <h2>Cliente</h2>
    <p>{{ connectionMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      connectionMessage: 'Conectando...',
    };
  },
  mounted() {
    const ws = new WebSocket('ws://192.168.0.253:8080');

    ws.onopen = () => {
      this.connectionMessage = 'Conectado al servidor';
      ws.send(JSON.stringify({ action: 'clientConnected', message: 'Cliente conectado' }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log('Mensaje del servidor:', data);
    };
  },
};
</script>