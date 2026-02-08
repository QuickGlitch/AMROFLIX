import { createRouter, createWebHistory } from 'vue-router'
import AmroflixHome from '@/pages/AmroflixHome.vue'
import AmroflixSearch from '@/pages/AmroflixSearch.vue'

import { ROUTE_HOME, ROUTE_SEARCH } from './navigation'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: ROUTE_HOME,
      component: AmroflixHome,
    },
    {
      path: '/search',
      name: ROUTE_SEARCH,
      component: AmroflixSearch,
    },
  ],
})

export default router
