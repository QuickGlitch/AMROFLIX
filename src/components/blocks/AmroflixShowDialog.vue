<script setup lang="ts">
import { computed } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionRoot, TransitionChild } from '@headlessui/vue'
import { useShowById } from '@/composables/TVMaze/useShowById'
import AmroflixSpinner from '@/components/essentials/AmroflixSpinner.vue'
import AmroflixButton from '@/components/essentials/AmroflixButton.vue'
import AmroflixIcon from '@/components/essentials/AmroflixIcon/AmroflixIcon.vue'

const props = defineProps<{
  showId: number | null
  open: boolean
}>()

const emit = defineEmits<{
  close: []
}>()

const {
  data: show,
  isLoading,
  isError,
  error,
} = useShowById(() => (props.open ? props.showId : null))

const errorMessage = computed(() =>
  error.value instanceof Error ? error.value.message : 'Failed to load show details',
)

function closeDialog() {
  emit('close')
}
</script>

<template>
  <TransitionRoot :show="open" as="template">
    <Dialog @close="closeDialog" class="amroflix-show-dialog">
      <TransitionChild
        as="template"
        enter="amroflix-show-dialog__backdrop--animate"
        enter-from="amroflix-show-dialog__backdrop--hidden"
        leave="amroflix-show-dialog__backdrop--animate"
        leave-to="amroflix-show-dialog__backdrop--hidden"
      >
        <div class="amroflix-show-dialog__backdrop" aria-hidden="true" />
      </TransitionChild>

      <div class="amroflix-show-dialog__container">
        <TransitionChild
          as="template"
          enter="amroflix-show-dialog__panel--animate"
          enter-from="amroflix-show-dialog__panel--hidden"
          leave="amroflix-show-dialog__panel--animate"
          leave-to="amroflix-show-dialog__panel--hidden"
        >
          <DialogPanel class="amroflix-show-dialog__panel">
            <AmroflixButton
              class="amroflix-show-dialog__close"
              leading-icon="close"
              @click="closeDialog"
            />

            <AmroflixSpinner v-if="isLoading" size="large" label="Loading show details..." />

            <div v-else-if="isError" class="amroflix-show-dialog__error">
              {{ errorMessage }}
            </div>

            <template v-else-if="show">
              <div class="amroflix-show-dialog__content">
                <div class="amroflix-show-dialog__media">
                  <img
                    v-if="show.image?.original || show.image?.medium"
                    :src="show.image?.original || show.image?.medium"
                    :alt="show.name"
                  />
                </div>

                <div class="amroflix-show-dialog__info">
                  <DialogTitle class="amroflix-show-dialog__title">{{ show.name }}</DialogTitle>

                  <div v-if="show.rating?.average" class="amroflix-show-dialog__rating">
                    <AmroflixIcon name="circle_star" />
                    <span>{{ show.rating.average.toFixed(1) }}</span>
                  </div>

                  <div v-if="show.genres?.length" class="amroflix-show-dialog__genres">
                    <span
                      v-for="genre in show.genres"
                      :key="genre"
                      class="amroflix-show-dialog__genre"
                    >
                      {{ genre }}
                    </span>
                  </div>

                  <div class="amroflix-show-dialog__meta">
                    <span v-if="show.premiered">Premiered: {{ show.premiered }}</span>
                    <span v-if="show.status">Status: {{ show.status }}</span>
                    <span v-if="show.language">Language: {{ show.language }}</span>
                    <span v-if="show.runtime">Runtime: {{ show.runtime }} min</span>
                  </div>

                  <div
                    v-if="show.summary"
                    class="amroflix-show-dialog__summary"
                    v-html="show.summary"
                  />

                  <a
                    v-if="show.officialSite"
                    :href="show.officialSite"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="amroflix-show-dialog__link"
                  >
                    Visit Official Site
                  </a>
                </div>
              </div>
            </template>
          </DialogPanel>
        </TransitionChild>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<style lang="scss">
.amroflix-show-dialog {
  /* component tokens */
  --amroflix-dialog-backdrop-color: rgba(0, 0, 0, 0.6);
  --amroflix-dialog-transition-duration: var(--theme-duration-default);

  position: fixed;
  inset: 0;
  z-index: 1;

  &__backdrop {
    position: fixed;
    inset: 0;
    background-color: var(--amroflix-dialog-backdrop-color);
    backdrop-filter: blur(4px);

    &--animate {
      transition: opacity var(--amroflix-dialog-transition-duration) ease;
    }

    &--hidden {
      opacity: 0;
    }
  }

  &__container {
    position: fixed;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    overflow-y: auto;
  }

  &__panel {
    position: relative;
    width: 100%;
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
    background-color: var(--theme-background-surface-color);
    border-radius: var(--brand-card-border-radius);
    padding: 1.5rem;
    color: var(--theme-text-default-color);

    &--animate {
      transition:
        opacity var(--amroflix-dialog-transition-duration) ease,
        transform var(--amroflix-dialog-transition-duration) ease;
    }

    &--hidden {
      opacity: 0;
      transform: scale(0.95) translateY(10px);
    }
  }

  &__close {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    z-index: 10;
  }

  &__error {
    color: var(--theme-status-error-color);
    text-align: center;
    padding: 2rem;
  }

  &__content {
    display: flex;
    gap: 1.5rem;

    @media (max-width: 600px) {
      flex-direction: column;
    }
  }

  &__media {
    flex-shrink: 0;
    width: 300px;

    @media (max-width: 600px) {
      width: 100%;
      max-width: 300px;
      margin: 0 auto;
    }

    img {
      width: 100%;
      height: auto;
      border-radius: var(--brand-card-border-radius);
    }
  }

  &__info {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  &__title {
    font-size: var(--theme-text-huge-size);
    font-weight: var(--theme-text-bold-weight);
    color: var(--theme-text-default-color);
    margin: 0;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: var(--brand-secondary-color);
    font-weight: var(--theme-text-bold-weight);
    font-size: var(--theme-text-large-size);
  }

  &__genres {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  &__genre {
    background-color: var(--theme-cta-primary-color);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: var(--theme-text-small-size);
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    font-size: var(--theme-text-small-size);
    opacity: 0.8;
  }

  &__summary {
    line-height: 1.6;

    :deep(p) {
      margin: 0.5rem 0;
    }
  }

  &__link {
    display: inline-block;
    margin-top: 0.5rem;
    color: var(--brand-secondary-color);
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
</style>
