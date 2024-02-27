<template>
    <div :class="`-mb-0.5 ${suitColor}`"
        class="relative w-32 aspect-[1/1.4] bg-white shadow-lg rounded-lg flex justify-center items-center p-2 hover:ring-4 ring-rose-600 transition overflow-hidden border-2 border-neutral-200 hover:-translate-y-2">
        <div class="absolute top-0.5 left-1">
            <div class="text-center">
                {{ value }}
            </div>
            <Icon :icon="iconSuit" width="12px" class="-mt-0.5"></Icon>
        </div>
        <div class="grid grid-cols-3 gap-0.5 h-full py-3">
            <div class="flex flex-col justify-between">
                <Icon :icon="iconSuit" :width="iconSize" v-for="index in columnValues[0]" :key="index"></Icon>
            </div>
            <div class="flex flex-col" :class="midColumnClasses">
                <Icon :icon="iconSuit" :width="iconSize" v-for="index in columnValues[1]" :key="index"></Icon>
            </div>
            <div class="flex flex-col justify-between">
                <Icon :icon="iconSuit" :width="iconSize" v-for="index in columnValues[2]" :key="index"></Icon>
            </div>
        </div>
        <div class="absolute bottom-0.5 right-1">
            <Icon :icon="iconSuit" width="12px" class="-mb-0.5"></Icon>
            <div class="text-center">
                {{ value }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed } from 'vue'

const iconSize = '20px'


const props = defineProps({
    value: {
        type: String,
        default: '4'
    },
    suit: {
        type: String,
        default: 'diamond' // heart, spade, diamond, club
    },
})

const suitColor = computed(() => {
    if (props.suit === 'diamond' || props.suit === 'heart') return 'text-red-400'
    return 'text-neutral-600'
})

const columnValues = computed(() => {
    if (props.value === 'A') return [0, 1, 0]
    if (props.value === '2') return [0, 2, 0]
    if (props.value === '3') return [0, 3, 0]
    if (props.value === '4') return [2, 0, 2]
    if (props.value === '5') return [2, 1, 2]
    if (props.value === '6') return [3, 0, 3]
    if (props.value === '7') return [3, 1, 3]
    if (props.value === '8') return [3, 2, 3]
    if (props.value === '9') return [4, 1, 4]
    if (props.value === '10') return [4, 2, 4]
    return [0, 0, 0]
})

const iconSuit = computed(() => {
    return `bi:suit-${props.suit}-fill`
})

const midColumnClasses = computed(() => {
    let classes = ''
    if (props.value === '7') {
        classes += 'justify-start pt-5'
    } else if (props.value === '8' || props.value === '10') {
        classes += 'justify-between py-5'
    }
    else if (columnValues.value[1] > 1) {
        classes += 'justify-between'

    } else {
        classes += 'justify-center'
    }
    return classes
})


</script>

<style scoped></style>