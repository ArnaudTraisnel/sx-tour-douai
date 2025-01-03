<template>
  <div class="space-y-4">
    <div
      v-for="(item, index) in faqItems"
      :key="index"
      class="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200"
    >
      <button
        class="w-full px-6 py-4 text-left flex justify-between items-center"
        @click="toggleItem(index)"
      >
        <span class="font-medium text-slate-900">{{ item.question }}</span>
        <ChevronDownIcon
          class="w-5 h-5 text-slate-400 transition-transform duration-200"
          :class="{ 'rotate-180': openIndex === index }"
        />
      </button>
      <div
        v-show="openIndex === index"
        class="px-6 pb-4 text-slate-600"
      >
        {{ item.answer }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { ChevronDownIcon } from "@heroicons/vue/24/outline"

const openIndex = ref(null)

const toggleItem = (index) => {
  openIndex.value = openIndex.value === index ? null : index
}

const faqItems = [
  {
    question: "Quand aura lieu le SX Tour Douai ?",
    answer: "Le SX Tour Douai aura lieu le 15 juin 2024. L'événement se déroulera sur une journée complète avec des qualifications le matin et les finales l'après-midi."
  },
  {
    question: "Comment acheter des billets ?",
    answer: "Les billets sont disponibles sur notre site dans la section 'Tickets'. Vous pouvez choisir entre différentes catégories : Standard, VIP, et Pack Famille."
  },
  {
    question: "Y a-t-il un âge minimum pour assister à l'événement ?",
    answer: "Non, l'événement est ouvert à tous les âges. Les enfants de moins de 12 ans doivent être accompagnés d'un adulte. Des tarifs spéciaux sont disponibles pour les enfants."
  },
  {
    question: "Que faire en cas de pluie ?",
    answer: "L'événement a lieu même en cas de pluie légère. En cas de conditions météorologiques extrêmes, l'événement peut être reporté. Dans ce cas, vos billets resteront valables pour la nouvelle date."
  }
]
</script>
