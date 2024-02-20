<template>
  <input type="text" ref="inputRef">
  <button @click="joinRoom1()">Unirse a sala 1</button>
  <button @click="joinRoom2()">Unirse a sala 2</button>

</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { io } from 'socket.io-client'

const inputRef = ref(null)
const socket = io('http://localhost:3000', { transports: ['websocket'] })

onMounted(() => {
  socket.on('hello', (msg) => {
    alert(msg)
  })
})

const joinRoom1 = () => {
  socket.emit('joinRoom', 'room1', inputRef.value.value)
}

const joinRoom2 = () => {
  socket.emit('joinRoom', 'room2', inputRef.value.value)
}
onUnmounted(() => {
  socket.disconnect()
})
</script>

<style scoped></style>
