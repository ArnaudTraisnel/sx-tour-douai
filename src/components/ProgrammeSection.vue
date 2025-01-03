<template>
  <section class="py-16 md:py-24">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 gap-12 md:gap-16">
        <!-- En-tête -->
        <div class="text-center max-w-4xl mx-auto">
          <h2 class="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8">
            Programme <span class="text-red-600">de la soirée</span>
          </h2>
          <p class="text-lg md:text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto px-4">
            Découvrez le déroulement complet de cette soirée exceptionnelle de Supercross à Douai. 
            Un événement riche en adrénaline qui vous tiendra en haleine du début à la fin.
          </p>
        </div>

        <!-- Liste du programme -->
        <div class="max-w-3xl mx-auto w-full space-y-6 md:space-y-8 px-4">
          <div 
            v-for="(item, index) in programme" 
            :key="index"
            class="flex flex-col items-center text-center p-5 bg-white rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <div class="flex items-center gap-3 mb-1.5">
              <component 
                :is="item.icon" 
                class="w-8 h-8 md:w-10 md:h-10 text-red-600"
                aria-hidden="true"
              />
              <span class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-medium">{{ item.time }}</span>
            </div>
            <p class="text-lg sm:text-xl md:text-2xl text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ClockIcon, FlagIcon, UserGroupIcon, TrophyIcon } from '@heroicons/vue/24/outline'

const programme = [
  {
    time: 'A venir',
    description: 'Le programme sera publié le 18 Février 2025',
    icon: ClockIcon
  },
  {
    time: '18h00',
    description: 'Ouverture des portes et accueil du public',
    icon: ClockIcon
  },
  {
    time: '19h00',
    description: 'Début des échauffements et présentation des pilotes',
    icon: UserGroupIcon
  },
  {
    time: '20h00',
    description: 'Première course - Qualifications',
    icon: FlagIcon
  },
  {
    time: '21h30',
    description: 'Course principale - Finale du Supercross',
    icon: FlagIcon
  },
  {
    time: '22h30',
    description: 'Cérémonie de remise des prix',
    icon: TrophyIcon
  }
]
</script>

<style scoped>
</style>
