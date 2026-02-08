<script setup lang="ts">
import { ref } from 'vue'
import AmroflixButton from '../essentials/AmroflixButton.vue'
import AmroflixSideBar from './AmroflixSideBar/AmroflixSideBar.vue'
import { useTheme } from '../../composables/useTheme'
import { navigationItems } from '../../router/navigation'

const { theme, toggleTheme } = useTheme()

const isMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div
    class="amroflix-layout"
    :class="{ 'amroflix-layout--sidebar-open': isMenuOpen }"
    :data-theme="theme"
  >
    <header class="amroflix-layout__header">
      <slot name="header">
        <slot name="header__left"
          ><div class="amroflix-layout__header__left">
            <AmroflixButton leading-icon="hamburger" @click="toggleMenu"></AmroflixButton>
            <h1>Amroflix</h1>
          </div></slot
        >
        <div class="amroflix-layout__header__center">
          <slot name="header__center">
            <input type="text" placeholder="Search..." />
          </slot>
        </div>
        <slot name="header__right">
          <div class="amroflix-layout__header__right">
            <AmroflixButton
              @click="toggleTheme"
              :leading-icon="theme === 'light' ? 'night_mode' : 'light_mode'"
            >
              {{ theme }}
            </AmroflixButton>
          </div>
        </slot>
      </slot>
    </header>

    <AmroflixSideBar :is-open="isMenuOpen" :items="navigationItems" />

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
.amroflix-layout {
  /* component tokens */
  --amroflix-layout-sidebar-width-closed: 4rem;
  --amroflix-layout-sidebar-width-open: 12rem;
  --amroflix-layout-sidebar-width: var(--amroflix-layout-sidebar-width-closed);
  --amroflix-layout-header-text-color: var(--theme-text-default-color);
  --amroflix-layout-header-height: var(--brand-header-height);
  --amroflix-layout-header-background-color: color-mix(
    in srgb,
    var(--theme-background-default-color) 80%,
    black
  );
  --amroflix-layout-footer-background-color: var(--neutral-darkest-grey);
  --amroflix-layout-footer-text-color: var(--theme-text-default-color);
  --amroflix-layout-body-background-color: var(--theme-background-default-color);

  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &--sidebar-open {
    --amroflix-layout-sidebar-width: var(--amroflix-layout-sidebar-width-open);
  }

  &__header {
    position: fixed;
    inset: 0 0 auto 0;

    box-sizing: border-box;
    height: var(--amroflix-layout-header-height);
    display: flex;
    align-items: center;
    background-color: var(--amroflix-layout-header-background-color);
    color: var(--amroflix-layout-header-text-color);
    padding: 1rem 0.5rem;

    &__left {
      flex-shrink: 1;
      align-items: center;
      display: flex;
      justify-content: start;
      > * {
        margin-right: 1rem;
      }
    }

    &__center {
      flex-grow: 1;
      align-items: center;
      display: flex;
      justify-content: center;
      padding: 0 1rem;
      > * {
        margin-right: 1rem;
      }
    }

    &__right {
      flex-shrink: 1;
      min-width: 12rem;
      align-items: center;
      display: flex;
      justify-content: end;
      > * {
        margin-right: 1rem;
      }
    }
  }

  &__body {
    background-color: var(--amroflix-layout-body-background-color);
    flex: 1;
    &__content {
      box-sizing: border-box;
      padding: 1rem 0 1rem 1rem;
      margin-top: var(--amroflix-layout-header-height);
      margin-left: var(--amroflix-layout-sidebar-width);
      width: calc(100% - var(--amroflix-layout-sidebar-width));
      transition: margin-left 0.3s ease;
    }
  }

  &__footer {
    background-color: var(--amroflix-layout-footer-background-color);
    color: var(--amroflix-layout-footer-text-color);
    padding: 1rem 2rem;
    text-align: center;
  }
}
</style>
