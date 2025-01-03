import { ref } from 'vue'
import { defineStore } from 'pinia'
import { ApiService } from '@/services/api.service'

export const useAppStore = defineStore('app', () => {
  // State
  const pilotes = ref([])
  const tickets = ref([])
  const programme = ref([])
  const loading = ref(false)
  const error = ref(null)


  async function fetchTickets() {
    try {
      loading.value = true
      error.value = null
      tickets.value = await ApiService.getTickets()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  async function fetchProgramme() {
    try {
      loading.value = true
      error.value = null
      programme.value = await ApiService.getProgramme()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  return {
    // State
    pilotes,
    tickets,
    programme,
    loading,
    error,
    // Actions
    fetchPilotes,
    fetchTickets,
    fetchProgramme
  }
})
