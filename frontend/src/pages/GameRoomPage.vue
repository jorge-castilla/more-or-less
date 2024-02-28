<template>
    <div class="h-screen relative w-full">
        <div class="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
            <div class="flex gap-4">
                <div class="text-center flex flex-col">
                    Anterior
                    <GameCard :value="'A'" :suit="'club'" />
                </div>
                <div class="text-center flex flex-col">
                    Actual
                    <GameCard :value="'6'" :suit="'club'" />
                </div>
            </div>
            <div class="flex gap-4 justify-center mt-16">
                <button class="w-12 h-12 transition bg-emerald-600 hover:bg-emerald-500 flex justify-center items-center rounded shadow"><Icon icon="fa6-solid:greater-than"></Icon></button>
                <button class="w-12 h-12 transition bg-emerald-600 hover:bg-emerald-500 flex justify-center items-center rounded shadow"><Icon icon="fa6-solid:less-than"></Icon></button>
                <button class="w-12 h-12 transition bg-emerald-600 hover:bg-emerald-500 flex justify-center items-center rounded shadow"><Icon icon="fa6-solid:equals"></Icon></button>
            </div>
        </div>
        <div class="absolute left-4 top-1/2 -translate-y-1/2  flex gap-4 justify-center rotate-90">
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'10'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
        </div>
        <div class="absolute right-0 top-1/2 -translate-y-1/2 flex gap-4 justify-center rotate-90">
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'10'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 bottom-16 flex gap-4 justify-center">
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
        </div>
        <div class="absolute left-1/2 -translate-x-1/2 top-16 flex gap-4 justify-center">
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
            <GameCard :value="'6'" :suit="'club'" />
        </div>

    </div>
</template>

<script setup>
import GameCard from '@/components/GameCard.vue';
import { Icon } from '@iconify/vue'

</script>

<style scoped></style>