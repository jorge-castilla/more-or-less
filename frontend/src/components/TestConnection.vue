<template>
  <div>hola mundo</div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { io } from 'socket.io-client'

const socket = io('http://localhost:3000', { transports: ['websocket'] })

onMounted(() => {
  console.log('hola xd')
})

onUnmounted(() => {
  socket.disconnect()
})
</script>

<style scoped></style>
