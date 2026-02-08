<script setup lang="ts">
type AmroflixCardProps = {
  title?: string
  subtitle?: string
  content?: string
  footer?: string
}

const { title, subtitle, content, footer } = defineProps<AmroflixCardProps>()
</script>

<template>
  <div class="amroflix-card">
    <slot name="header">
      <h3>{{ title }}</h3>
    </slot>
    <slot name="subtitle">
      <h4>{{ subtitle }}</h4>
    </slot>
    <slot name="content">
      <p>{{ content }}</p>
    </slot>
    <slot name="footer">
      <div>{{ footer }}</div>
    </slot>
  </div>
</template>

<style lang="scss" scoped></style>
