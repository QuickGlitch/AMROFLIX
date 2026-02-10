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
@use '@/styles/breakpoints' as *;

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
    overflow-y: auto;

    // Mobile: No padding for full screen
    @include mobile {
      padding: 0;
    }

    // Desktop: Add padding
    @include desktop {
      padding: 1rem;
    }
  }

  &__panel {
    position: relative;
    width: 100%;
    background-color: var(--theme-background-surface-color);
    color: var(--theme-text-default-color);

    // Mobile: Full screen with padding at bottom for sticky button
    @include mobile {
      max-width: 100%;
      min-height: 100vh;
      max-height: none;
      overflow-y: auto;
      border-radius: 0;
      padding: 1.5rem 1rem 5rem 1rem; // Extra padding at bottom for sticky button
    }

    // Desktop: Centered modal
    @include desktop {
      max-width: 800px;
      max-height: 90vh;
      overflow-y: auto;
      border-radius: var(--brand-card-border-radius);
      padding: 1.5rem;
    }

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
    z-index: 10;

    // Mobile: Sticky at bottom
    @include mobile {
      position: sticky;
      bottom: 0;
      left: 0;
      right: 0;
      width: 100%;
      border-radius: 0;
      margin-top: 1rem;
    }

    // Desktop: Top right corner
    @include desktop {
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
    }
  }

  &__error {
    color: var(--theme-status-error-color);
    text-align: center;
    padding: 2rem;
  }

  &__content {
    display: flex;
    gap: 1.5rem;

    @include mobile {
      flex-direction: column;
      gap: 1rem;
    }

    @include desktop {
      flex-direction: row;
    }
  }

  &__media {
    flex-shrink: 0;

    @include mobile {
      width: 100%;
      max-width: 100%;
    }

    @include desktop {
      width: 300px;
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
