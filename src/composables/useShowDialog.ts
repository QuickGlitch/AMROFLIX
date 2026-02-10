import { ref } from 'vue'

export function useShowDialog() {
  const selectedShowId = ref<number | null>(null)
  const isDialogOpen = ref(false)

  function openDialog(showId: number) {
    selectedShowId.value = showId
    isDialogOpen.value = true
  }

  function closeDialog() {
    isDialogOpen.value = false
  }

  return {
    selectedShowId,
    isDialogOpen,
    openDialog,
    closeDialog,
  }
}
