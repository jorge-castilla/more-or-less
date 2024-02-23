<template>
  <div>
    <h1>Room : {{ roomId }}</h1>
    <button @click="copyLink">copiar invitación</button>
    <input id="link" type="text" :value="url" readonly>
    <h2>Usuarios conectados</h2>
    <ul>
      <li v-for="user in connectedUsers" :key="user">{{ user }}</li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', { transports: ['websocket'] })
const route = useRoute()
const roomId = route.params.id
const url = window.location.href
const connectedUsers = ref([]);

onMounted(() => {
  const name = window.prompt('Por favor, introduce tu nombre de usuario:')
  if (name !== null) {
    connectedUsers.value.push(name)
    // Emitir el evento 'joinRoom' al servidor
    socket.emit('joinRoom', route.params.id, name)
  }

  // Escuchar el evento 'updatedUsers' del servidor
  socket.on('updatedUsers', (usersOnRoom) => {
    // Actualizar los usuario con la nueva lista de usuarios conectados
    connectedUsers.value = usersOnRoom;
    console.log('Lista de usuarios actualizada:', usersOnRoom);
    // Por ejemplo, podrías renderizar la lista en un componente Vue
  });
})

const copyLink = () => {
  const $link = document.getElementById('link')
  $link.select();
  document.execCommand('copy')
  console.log('link copiado')
}

</script>
