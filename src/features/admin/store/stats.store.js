import { defineStore } from 'pinia'
import { ref } from 'vue'
import supabase from '@/services/supabase'

export const useStatsStore = defineStore('stats', () => {
  const stats = ref({
    totalVisits: 0,
    monthlyVisits: 0,
    ticketClicks: 0,
    monthlyVisitsChange: 0,
    ticketClicksChange: 0
  })

  const loading = ref(false)
  const error = ref(null)

  // Enregistre une nouvelle visite
  async function recordVisit() {
    try {
      const { error } = await supabase
        .from('visits')
        .insert([{ 
          timestamp: new Date().toISOString()
        }])

      if (error) throw error
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement de la visite:', err)
    }
  }

  // Enregistre un clic sur le bouton réserver
  async function recordTicketClick() {
    try {
      const { error } = await supabase
        .from('ticket_clicks')
        .insert([{ 
          timestamp: new Date().toISOString()
        }])

      if (error) throw error
    } catch (err) {
      console.error('Erreur lors de l\'enregistrement du clic:', err)
    }
  }

  // Récupère toutes les statistiques
  async function fetchStats() {
    try {
      loading.value = true
      error.value = null

      const now = new Date()
      const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
      const firstDayOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      const firstDayOfTwoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1)

      // Récupère le nombre total de visites
      const { count: totalVisits, error: totalError } = await supabase
        .from('visits')
        .select('*', { count: 'exact' })

      if (totalError) throw totalError

      // Récupère les visites du mois en cours
      const { count: currentMonthVisits, error: currentMonthError } = await supabase
        .from('visits')
        .select('*', { count: 'exact' })
        .gte('timestamp', firstDayOfMonth.toISOString())

      if (currentMonthError) throw currentMonthError

      // Récupère les visites du mois précédent
      const { count: lastMonthVisits, error: lastMonthError } = await supabase
        .from('visits')
        .select('*', { count: 'exact' })
        .gte('timestamp', firstDayOfLastMonth.toISOString())
        .lt('timestamp', firstDayOfMonth.toISOString())

      if (lastMonthError) throw lastMonthError

      // Récupère les clics sur réserver du mois en cours
      const { count: currentMonthClicks, error: currentClicksError } = await supabase
        .from('ticket_clicks')
        .select('*', { count: 'exact' })
        .gte('timestamp', firstDayOfMonth.toISOString())

      if (currentClicksError) throw currentClicksError

      // Récupère les clics sur réserver du mois précédent
      const { count: lastMonthClicks, error: lastClicksError } = await supabase
        .from('ticket_clicks')
        .select('*', { count: 'exact' })
        .gte('timestamp', firstDayOfLastMonth.toISOString())
        .lt('timestamp', firstDayOfMonth.toISOString())

      if (lastClicksError) throw lastClicksError

      // Calcul des pourcentages de changement
      const monthlyVisitsChange = lastMonthVisits > 0 
        ? ((currentMonthVisits - lastMonthVisits) / lastMonthVisits) * 100 
        : 'N/A'

      const ticketClicksChange = lastMonthClicks > 0
        ? ((currentMonthClicks - lastMonthClicks) / lastMonthClicks) * 100
        : 'N/A'

      stats.value = {
        totalVisits,
        monthlyVisits: currentMonthVisits,
        ticketClicks: currentMonthClicks,
        monthlyVisitsChange: monthlyVisitsChange === 'N/A' ? monthlyVisitsChange : Math.round(monthlyVisitsChange),
        ticketClicksChange: ticketClicksChange === 'N/A' ? ticketClicksChange : Math.round(ticketClicksChange)
      }

      return stats.value
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    stats,
    loading,
    error,
    fetchStats,
    recordVisit,
    recordTicketClick
  }
})
