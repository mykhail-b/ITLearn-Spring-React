import { createRouter, createWebHistory } from 'vue-router'

import Courses from '../src/components/Courses.vue'
import Leaderboard from '../src/components/Leaderboard.vue'
import Profile from '../src/components/Profile.vue'

const routes = [
  { path: '/', redirect: '/courses' }, // Redirect root to Courses
  { path: '/courses', component: Courses, name: 'Courses' },
  { path: '/leaderboard', component: Leaderboard, name: 'Leaderboards' },
  { path: '/profile', component: Profile, name: 'Profile' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
