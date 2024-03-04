<template>
  <div>
    <button @click="copyLink">copiar invitación</button>
    <input id="link" type="text" :value="url" readonly />
    <h2>Usuarios conectados</h2>
    <ul>
      <li v-for="user in connectedUsers" :key="user">{{ user }} 
        <button v-if="imCreator && user.id !== id"
        class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
        >Kick
        </button>

      </li>
          <div v-if="imCreator === false">
                  <input
                  v-model="isReady"
                  type="checkbox"
                  id="ready"
                  name="ready"
                  class="mr-2"
                />
                <label for="ready">Estoy listo para jugar</label>
              </div> 
    </ul>
    <button
      v-if="usersAreReady && imCreator"
      type="button"
      class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
    >
      Star game
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { io } from 'socket.io-client'
import { v4 as uuid } from 'uuid'

const socket = io('http://localhost:3000', { transports: ['websocket'] })
const route = useRoute()
const url = window.location.href
const roomId = route.params.id
const connectedUsers = ref([])
const id = ref(null)
const name = ref(null)
const isReady = ref(false)


const usersAreReady = computed(() => {
  if (connectedUsers.value.length < 2) return false
  return connectedUsers.value.every((user) => user.isReady) && connectedUsers.value.length > 1
})

const imCreator = computed(() => {
  if (connectedUsers.value.length === 0) return false
  const currentUser =  connectedUsers.value.find((user) => user.id === localStorage.getItem('id'));
  return currentUser.isCreator
})

watch(isReady, (newValue) => {
  socket.emit('userReady', roomId, id.value, newValue)
})

onMounted(() => {
  if (localStorage.getItem('id')) {
    id.value = localStorage.getItem('id')
    name.value = localStorage.getItem('name')
  } else {
    do {
      name.value = window.prompt('Por favor, introduce tu nombre de usuario:')
    } while (name.value === null || name.value === '')
    id.value = uuid()
    localStorage.setItem('id', id.value)
    localStorage.setItem('name', name.value)
  }

  socket.emit('joinRoom', roomId, name.value, id.value)

  // Escuchar el evento 'updatedUsers' del servidor
  socket.on('updatedUsers', (usersOnRoom) => {
    // Actualizar los usuario con la nueva lista de usuarios conectados
    connectedUsers.value = usersOnRoom
    console.log('Lista de usuarios actualizada:', usersOnRoom)
    // Por ejemplo, podrías renderizar la lista en un componente Vue
  })
})

const copyLink = () => {
  const $link = document.getElementById('link')
  $link.select()
  document.execCommand('copy')
  console.log('link copiado')
}


</script>
