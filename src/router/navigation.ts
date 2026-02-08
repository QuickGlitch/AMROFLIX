import type { AmroflixSideBarItemIcon } from '@/components/blocks/AmroflixSideBar/AmroflixSideBarItem.vue'

export type AmroflixNavigationItem = AmroflixSideBarItemIcon & {
  routeName: string
}

export const ROUTE_HOME = 'home'
export const ROUTE_SEARCH = 'search'

// used for route UI, i.e. the sidebar
export const navigationItems: AmroflixNavigationItem[] = [
  { label: 'Home', icon: 'explore', routeName: ROUTE_HOME },
  { label: 'Search', icon: 'search', routeName: ROUTE_SEARCH },
]
