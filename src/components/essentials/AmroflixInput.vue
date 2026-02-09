<script setup lang="ts">
import { computed } from 'vue'
import type { InputHTMLAttributes } from 'vue'
import type { IconName } from './AmroflixIcon/AmroflixIcon.vue'
import AmroflixButton from './AmroflixButton.vue'

const modelValue = defineModel<string>({ default: '' })

defineOptions({ inheritAttrs: false })

// bind all input attrs as props, helps with autocomplete
interface AmroflixInput extends /* @vue-ignore */ InputHTMLAttributes {
  icon?: IconName
}

const props = defineProps<AmroflixInput>()

const emit = defineEmits<{
  search: [value: string]
}>()

// separate icon from native input attrs
const inputAttrs = computed(() => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...rest } = props
  return rest as InputHTMLAttributes
})

function onKeydown(event: KeyboardEvent) {
  if (event.key === 'Enter') {
    emit('search', modelValue.value)
  }
}

function onIconClick() {
  emit('search', modelValue.value)
}
</script>

<template>
  <div class="amroflix-input" :class="{ 'amroflix-input--has-icon': props.icon }">
    <input
      v-bind="inputAttrs"
      v-model="modelValue"
      class="amroflix-input__field"
      @keydown="onKeydown"
    />
    <AmroflixButton
      v-if="props.icon"
      variant="plain"
      :leading-icon="props.icon"
      class="amroflix-input__icon"
      aria-label="Search"
      @click="onIconClick"
    />
  </div>
</template>

<style lang="scss" scoped>
.amroflix-input {
  /* component tokens */
  --amroflix-input-padding: var(--theme-input-padding);
  --amroflix-input-border-radius: var(--brand-input-border-radius);
  --amroflix-input-border-color: var(--theme-input-border-color);
  --amroflix-input-background-color: var(--theme-input-background-color);
  --amroflix-input-text-color: var(--theme-input-font-color);
  --amroflix-input-font-size: var(--theme-text-default-size);
  --amroflix-input-focus-border-color: var(--theme-input-focus-border-color);
  --amroflix-input-max-width: var(--theme-input-max-width);
  --amroflix-input-icon-size: 1.25rem;
  --amroflix-input-icon-color: var(--theme-text-subtle-color);
  --amroflix-input-icon-hover-color: var(--brand-primary-color);

  position: relative;
  width: 100%;
  max-width: var(--amroflix-input-max-width);

  &__field {
    box-sizing: border-box;
    width: 100%;
    padding: var(--amroflix-input-padding);
    border-radius: var(--amroflix-input-border-radius);
    border: 1px solid var(--amroflix-input-border-color);
    font-size: var(--amroflix-input-font-size);
    background: var(--amroflix-input-background-color);
    color: var(--amroflix-input-text-color);
    outline: none;
    transition: border-color var(--theme-duration-short) ease;

    &:focus {
      border-color: var(--amroflix-input-focus-border-color);
      border-width: 2px;
    }

    &::placeholder {
      color: var(--theme-text-subtle-color);
    }
  }

  &--has-icon &__field {
    padding-right: 2.5rem;
  }

  &__icon {
    all: unset;
    position: absolute;
    right: 0.75rem;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: var(--amroflix-input-icon-size);
    color: var(--amroflix-input-icon-color);
    transition: color var(--theme-duration-short) ease;

    &:hover {
      color: var(--amroflix-input-icon-hover-color);
    }
  }
}
</style>
