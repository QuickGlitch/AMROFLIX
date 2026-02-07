<script setup lang="ts">
import AmroflixButton from './AmroflixButton.vue'
import { useTheme } from '../composables/useTheme'

const { theme, toggleTheme } = useTheme()
</script>

<template>
  <div class="amroflix-layout" :data-theme="theme">
    <header class="amroflix-layout__header">
      <slot name="header">
        <slot name="header__left"
          ><div class="amroflix-layout__header__left">
            <h1>Amroflix</h1>
          </div></slot
        >
        <slot name="header__center"
          ><div class="amroflix-layout__header__center">
            <input type="text" placeholder="Search..." /></div
        ></slot>
        <slot name="header__right">
          <AmroflixButton @click="toggleTheme">{{ theme }}</AmroflixButton>
        </slot>
      </slot>
    </header>

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
  --amroflix-layout-footer-background-color: var(--neutral-darkest-grey);
  --amroflix-layout-footer-text-color: var(--theme-text-default-color);
  --amroflix-layout-body-background-color: var(--theme-background-default-color);

  display: flex;
  flex-direction: column;
  min-height: 100vh;

  &__header {
    display: flex;
    justify-content: end;
    background-color: var(--amroflix-layout-body-background-color);
    color: var(--amroflix-layout-header-text-color);
    padding: 1rem 2rem;

    &__left {
      flex-shrink: 1;
      display: flex;
      justify-content: start;
    }

    &__center {
      flex-grow: 1;
      display: flex;
      justify-content: center;
    }

    &__right {
      flex-shrink: 1;
      display: flex;
      justify-content: end;
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
