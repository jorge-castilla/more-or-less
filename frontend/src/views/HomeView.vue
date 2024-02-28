<template>
  <main class="flex flex-col max-w-3xl min-h-screen justify-center items-center mx-auto gap-4 ">

    <button>Crear a room</button>
    <input type="text" ref="inputRef">
    <fwButton @click="joinRoom1()">Unirse a sala 1</fwButton>
    <fwButton @click="joinRoom2()">Unirse a sala 2</fwButton>
    <div class="flex">
      <GameCard v-for="index in 4" :key="index" class="ml-2" @click="createRandomNumber()" :value="cardValue[index]" :suit="cardSuit[index]" />

    </div>
  </main>


</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { io } from 'socket.io-client'
import fwButton from '@/components/ButtonComponent.vue'
import GameCard from '@/components/GameCard.vue'


const cardValue = ref(['A', '2', '3'])
const cardPossibleValues = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10']
const cardSuit = ref(['diamond', 'heart', 'spade'])
const cardPossibleSuits = ['diamond', 'heart', 'spade', 'club']

const createRandomNumber = () => {
  for (let index = 0; index < 25; index++) {
    for (let innerIndex = 0; innerIndex < 5; innerIndex++) {
        setTimeout(() => {
        const randomNumber = Math.floor(Math.random() * cardPossibleValues.length)
        const randomSuitIndex = Math.floor(Math.random() * cardPossibleSuits.length)
        cardSuit.value[innerIndex] = cardPossibleSuits[randomSuitIndex]
        cardValue.value[innerIndex] = cardPossibleValues[randomNumber]
      }, 200 * index);
      }
    }
}


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

<style scoped>
</style>
