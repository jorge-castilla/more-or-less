import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import RoomView from '@/views/RoomView.vue'
import RoomJoinView from '@/views/RoomJoinView.vue'
import GameRoomPage from '@/pages/GameRoomPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/game-room',
      name: 'game-room',
      component: GameRoomPage
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: RoomView
    },
    {
      path: '/rooms/:id',
      name: 'room-join',
      component: RoomJoinView
    }
  ]
})

export default router
