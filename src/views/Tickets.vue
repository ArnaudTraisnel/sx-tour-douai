<template>
  <div class="tickets-page min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30">
    <div class="container-custom mx-auto px-4 sm:px-6 lg:px-8 h-screen">
      <section class="flex flex-col justify-center items-center h-screen pt-20">
        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-center mb-16 sm:mb-20">
          BILLETTERIE
        </h1>
        
        <a 
          href="https://www.ticketmaster.fr/fr/manifestation/sx-tour-douai-billet/idmanif/555666"
          target="_blank"
          @click="handleTicketClick"
          class="group inline-flex items-center justify-center px-8 sm:px-10 py-4 sm:py-5 text-lg sm:text-xl font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Réserver ma place
          <svg 
            class="w-5 h-5 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              stroke-linecap="round" 
              stroke-linejoin="round" 
              stroke-width="2" 
              d="M14 5l7 7m0 0l-7 7m7-7H3"
            />
          </svg>
        </a>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useStatsStore } from '@/features/admin/store/stats.store'

const statsStore = useStatsStore()

const handleTicketClick = async () => {
  // Enregistre le clic avant la redirection
  await statsStore.recordTicketClick()
}
</script>

<style lang="scss" scoped>
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
}

.h-screen {
  height: 100vh;
}
</style>
