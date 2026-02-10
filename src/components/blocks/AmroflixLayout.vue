<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import AmroflixButton from '../essentials/AmroflixButton.vue'
import AmroflixInput from '../essentials/AmroflixInput.vue'
import AmroflixSideBar from './AmroflixSideBar/AmroflixSideBar.vue'
import { useTheme } from '../../composables/useTheme'
import { navigationItems, ROUTE_SEARCH } from '../../router/navigation'

const router = useRouter()
const { theme, toggleTheme } = useTheme()

const headerSearchQuery = ref('')

const isMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

function onHeaderSearchSubmit(query: string) {
  if (query.trim()) {
    router.push({ name: ROUTE_SEARCH, query: { q: query.trim() } })
    headerSearchQuery.value = ''
  }
}
</script>

<template>
  <div
    id="amroflix-app"
    class="amroflix-layout"
    :class="{ 'amroflix-layout--sidebar-open': isMenuOpen }"
  >
    <header class="amroflix-layout__header">
      <slot name="header">
        <slot name="header__left"
          ><div class="amroflix-layout__header__left">
            <AmroflixButton leading-icon="hamburger" @click="toggleMenu"></AmroflixButton>
            <img src="/logo.svg" alt="AmroFlix" class="amroflix-layout__logo" /></div
        ></slot>
        <div class="amroflix-layout__header__center">
          <slot name="header__center">
            <AmroflixInput
              v-model="headerSearchQuery"
              type="search"
              placeholder="Search for shows..."
              icon="search"
              @search="onHeaderSearchSubmit"
            />
          </slot>
        </div>
        <slot name="header__right">
          <div class="amroflix-layout__header__right">
            <AmroflixButton
              @click="toggleTheme"
              :leading-icon="theme === 'light' ? 'night_mode' : 'light_mode'"
            >
            </AmroflixButton>
          </div>
        </slot>
      </slot>
    </header>

    <AmroflixSideBar :is-open="isMenuOpen" :items="navigationItems" @close="isMenuOpen = false" />

    <main class="amroflix-layout__body">
      <div class="amroflix-layout__body__content">
        <slot> </slot>
      </div>
    </main>

    <footer class="amroflix-layout__footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
@use '@/styles/breakpoints' as *;

.amroflix-layout {
  /* component tokens */
  --amroflix-layout-sidebar-width-closed: 4rem;
  --amroflix-layout-sidebar-width-open: 12rem;
  --amroflix-layout-sidebar-width: 0;
  --amroflix-layout-header-text-color: var(--theme-text-default-color);
  --amroflix-layout-header-height: var(--brand-header-height);
  --amroflix-layout-header-background-color: var(--theme-header-background-color);
  --amroflix-layout-footer-background-color: var(--neutral-darkest-grey);
  --amroflix-layout-footer-text-color: var(--theme-text-default-color);
  --amroflix-layout-body-background-color: var(--theme-background-default-color);
  --amroflix-layout-default-text-color: var(--theme-text-default-color);

  display: flex;
  flex-direction: column;
  min-height: 100vh;
  color: var(--amroflix-layout-default-text-color);

  // Mobile: Sidebar doesn't take space (overlays)
  @include mobile {
    --amroflix-layout-sidebar-width: 0;
  }

  // Desktop: Sidebar takes space
  @include desktop {
    --amroflix-layout-sidebar-width: var(--amroflix-layout-sidebar-width-closed);

    &--sidebar-open {
      --amroflix-layout-sidebar-width: var(--amroflix-layout-sidebar-width-open);
    }
  }

  &__header {
    z-index: 1;
    position: fixed;
    inset: 0 0 auto 0;

    box-sizing: border-box;
    height: var(--amroflix-layout-header-height);
    display: flex;
    align-items: center;
    background-color: var(--amroflix-layout-header-background-color);
    color: var(--amroflix-layout-header-text-color);
    padding: 1rem 0.5rem;
    gap: 0.5rem;

    &__left {
      flex-shrink: 0;
      align-items: center;
      display: flex;
      justify-content: start;
      gap: 0.5rem;
    }

    &__center {
      flex-grow: 1;
      align-items: center;
      display: flex;
      justify-content: center;
      padding: 0 0.5rem;

      @include mobile {
        display: hidden;
      }
    }

    &__right {
      flex-shrink: 0;
      align-items: center;
      display: flex;
      justify-content: end;

      @include desktop {
        min-width: 8rem;
      }
    }
  }

  &__logo {
    height: 2.5rem;
    width: auto;

    @include mobile {
      height: 2rem;
    }
  }

  &__body {
    background-color: var(--amroflix-layout-body-background-color);
    background-image: var(--theme-background-gradient);
    flex: 1;
    overflow-x: hidden;

    &__content {
      box-sizing: border-box;
      padding: 1rem;
      margin-top: var(--amroflix-layout-header-height);
      margin-left: var(--amroflix-layout-sidebar-width);
      width: calc(100% - var(--amroflix-layout-sidebar-width));
      transition:
        margin-left 0.3s ease,
        width 0.3s ease;

      @include mobile {
        padding: 0.5rem;
      }
    }
  }

  &__footer {
    background-color: var(--amroflix-layout-footer-background-color);
    color: var(--amroflix-layout-footer-text-color);
    padding: 1rem 2rem;
    text-align: center;

    @include mobile {
      padding: 1rem;
    }
  }
}
</style>
