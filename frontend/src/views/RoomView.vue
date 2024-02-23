<template>
    <div>
        <h1>Room</h1>
        <button @click="createRoom()">Crear sala</button>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { v4 as uuid } from 'uuid';

const roomId = ref('');




const createRoom = () => {
    roomId.value = uuid();
    window.location.href = `/rooms/${roomId.value}`;
    
}

</script>

<style scoped></style>
