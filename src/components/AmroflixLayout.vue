<script setup lang="ts">
import { ref } from 'vue'
import AmroflixButton from './AmroflixButton.vue'
import AmroflixSideBar from './AmroflixSideBar.vue'
import { useTheme } from '../composables/useTheme'
import AmroflixIcon from './AmroflixIcon/AmroflixIcon.vue'

const { theme, toggleTheme } = useTheme()

const isMenuOpen = ref<boolean>(false)
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}
</script>

<template>
  <div class="amroflix-layout" :data-theme="theme">
    <header class="amroflix-layout__header">
      <slot name="header">
        <slot name="header__left"
          ><div class="amroflix-layout__header__left">
            <AmroflixButton @click="toggleMenu"><AmroflixIcon name="hamburger" /></AmroflixButton>
            <h1>Amroflix</h1>
          </div></slot
        >
        <slot name="header__center"
          ><div class="amroflix-layout__header__center">
            <input type="text" placeholder="Search..." /></div
        ></slot>
        <slot name="header__right">
          <div class="amroflix-layout__header__right">
            <AmroflixButton @click="toggleTheme">
              <AmroflixIcon :name="theme === 'light' ? 'night_mode' : 'light_mode'" />
            </AmroflixButton>
          </div>
        </slot>
      </slot>
    </header>

    <AmroflixSideBar :is-open="isMenuOpen" />

    <main class="amroflix-layout__body">
      <slot> </slot>
    </main>

    <footer class="amroflix-layout__footer">
      <slot name="footer"> </slot>
    </footer>
  </div>
</template>

<style lang="scss" scoped>
.amroflix-layout {
  /* component tokens */
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

  &__header {
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
  }

  &__footer {
    background-color: var(--amroflix-layout-footer-background-color);
    color: var(--amroflix-layout-footer-text-color);
    padding: 1rem 2rem;
    text-align: center;
  }
}
</style>
