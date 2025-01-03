<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4 sm:p-6 transition-all duration-300">
    <!-- Visites totales -->
    <div 
      class="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
      :class="{ 'animate-pulse': loading }"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2 truncate">Visites totales</h3>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 transition-all group-hover:text-red-600">
            {{ loading ? '...' : stats.totalVisits }}
          </p>
        </div>
        <div class="flex-shrink-0 bg-red-50 rounded-full p-3 group-hover:bg-red-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </div>
      </div>
    </div>

    <!-- Visites mensuelles -->
    <div 
      class="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
      :class="{ 'animate-pulse': loading }"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2 truncate">Visites mensuelles</h3>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 transition-all group-hover:text-red-600">
            {{ loading ? '...' : stats.monthlyVisits }}
          </p>
        </div>
        <div class="flex-shrink-0 bg-red-50 rounded-full p-3 group-hover:bg-red-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center text-sm">
          <span v-if="stats.monthlyVisitsChange !== 'N/A'" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getChangeClass(stats.monthlyVisitsChange)">
            <svg v-if="stats.monthlyVisitsChange > 0" class="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
              <path d="M4 0l4 4H0z" />
            </svg>
            <svg v-else class="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
              <path d="M4 8l4-4H0z" />
            </svg>
            {{ stats.monthlyVisitsChange > 0 ? '+' : '' }}{{ stats.monthlyVisitsChange }}%
          </span>
          <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            N/A
          </span>
          <span class="ml-2 text-gray-600">par rapport au mois dernier</span>
        </div>
      </div>
    </div>

    <!-- Clics sur "Réserver" -->
    <div 
      class="bg-white rounded-lg shadow-md p-4 sm:p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group"
      :class="{ 'animate-pulse': loading }"
    >
      <div class="flex items-center justify-between">
        <div class="flex-1 min-w-0">
          <h3 class="text-base sm:text-lg font-medium text-gray-900 mb-1 sm:mb-2 truncate">Clics sur "Réserver"</h3>
          <p class="text-2xl sm:text-3xl font-bold text-gray-900 transition-all group-hover:text-red-600">
            {{ loading ? '...' : stats.ticketClicks }}
          </p>
        </div>
        <div class="flex-shrink-0 bg-red-50 rounded-full p-3 group-hover:bg-red-100 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
          </svg>
        </div>
      </div>
      <div class="mt-4">
        <div class="flex items-center text-sm">
          <span v-if="stats.ticketClicksChange !== 'N/A'" class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium" :class="getChangeClass(stats.ticketClicksChange)">
            <svg v-if="stats.ticketClicksChange > 0" class="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
              <path d="M4 0l4 4H0z" />
            </svg>
            <svg v-else class="mr-1.5 h-2 w-2" fill="currentColor" viewBox="0 0 8 8">
              <path d="M4 8l4-4H0z" />
            </svg>
            {{ stats.ticketClicksChange > 0 ? '+' : '' }}{{ stats.ticketClicksChange }}%
          </span>
          <span v-else class="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            N/A
          </span>
          <span class="ml-2 text-gray-600">par rapport au mois dernier</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useStatsStore } from '../store/stats.store'

const statsStore = useStatsStore()
const stats = ref({
  totalVisits: 0,
  monthlyVisits: 0,
  ticketClicks: 0,
  monthlyVisitsChange: 0,
  ticketClicksChange: 0
})
const loading = ref(true)

const getChangeClass = (change) => {
  if (change === 'N/A') return 'bg-gray-100 text-gray-800'
  return change > 0
    ? 'bg-green-100 text-green-800'
    : 'bg-red-100 text-red-800'
}

onMounted(async () => {
  try {
    stats.value = await statsStore.fetchStats()
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: .7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
