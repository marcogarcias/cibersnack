<template>
  <div>
    <h1>Elige el tipo de instalación</h1>
    <div>
      <a href="#" class="btn btn-outline-success" @click.prevent="initServer">Servidor</a>
      <a href="#" class="btn btn-outline-success" @click.prevent="initClient">Cliente</a>
    </div>
  </div>
</template>

<script>
const { ipcRenderer } = window.require('electron');

export default {
  name: 'InstalationType',
  mounted(){
    ipcRenderer.on('serverRes', (e, res)=>{
      console.log('Servidor mensaje: ', res);
    });

    ipcRenderer.on('clientRes', (e, res)=>{
      console.log('Cliente mensaje: ', res);
    });
  },
  methods: {
    initServer(){
      console.log('iniciando cliente espere...');
      ipcRenderer.send('initServer');
    },
    initClient(){
      console.log('iniciando cliente espere...');
      ipcRenderer.send('initClient');
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
