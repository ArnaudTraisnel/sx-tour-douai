<template>
  <section class="bg-black relative w-full overflow-hidden pt-16 md:pt-24 lg:pt-32">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 md:pb-16 lg:pb-20">
      <!-- En-tête -->
      <div class="text-center max-w-4xl mx-auto mb-10 md:mb-16 lg:mb-20">
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6">
          Nos <span class="text-red-600">Pilotes</span>
        </h2>
        <p class="text-base md:text-lg lg:text-xl text-gray-300 max-w-2xl mx-auto">
          Découvrez les talents qui feront vibrer la piste lors du SX Tour Douai
        </p>
      </div>
    </div>

    <!-- Galerie de pilotes -->
    <div class="w-full flex justify-center">
      <div 
        class="flex flex-col md:flex-row gallery-container"
        :class="{
          'w-[85%] md:w-[90%] lg:w-full': true,
          'h-auto md:h-[60vh] lg:h-[85vh]': true,
          'space-y-2 md:space-y-0': true
        }"
      >
        <div
          v-for="(pilote, index) in pilotes"
          :key="pilote.id"
          class="relative overflow-hidden cursor-pointer transition-all duration-500 ease-in-out group"
          :class="{
            'aspect-[16/9] md:aspect-auto': true,
            'w-full md:w-auto': true,
            'flex-grow-0 flex-shrink-0 md:flex-1': true,
            'h-[12vh] md:h-full': index !== 0,
            'h-[45vh] md:h-full': index === 0,
            'hover:h-[45vh] md:hover:h-full': true,
            'md:basis-[10%] lg:basis-[12%]': true,
            'md:hover:basis-[45%] lg:hover:basis-[35%]': true,
            'md:first:basis-[45%] lg:first:basis-[35%]': true,
            'first-image': index === 0,
            'opacity-70 hover:opacity-100': index !== 0,
            'opacity-100': index === 0
          }"
        >
          <!-- Image -->
          <img
            :src="pilote.image"
            :alt="pilote.fullName"
            class="w-full h-full object-cover transition-all duration-500"
          />

          <!-- Overlay -->
          <div 
            class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300"
            :class="{
              'opacity-100 first-overlay': index === 0,
              'opacity-0 group-hover:opacity-100': index !== 0
            }"
          >
            <!-- Numéro -->
            <div class="absolute top-4 md:top-6 right-4 md:right-6">
              <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-red-600 drop-shadow-lg">
                #{{ pilote.numero }}
              </span>
            </div>

            <!-- Nom -->
            <div 
              class="absolute bottom-0 left-0 right-0 p-4 md:p-6 lg:p-8 transition-all duration-300"
              :class="{
                'translate-y-0 first-content': index === 0,
                'translate-y-full group-hover:translate-y-0': index !== 0
              }"
            >
              <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 drop-shadow-lg">
                {{ pilote.prenom }}
                <span class="text-red-600">{{ pilote.nom }}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'

// Détection responsive
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 768)
const isTablet = computed(() => windowWidth.value >= 768 && windowWidth.value < 1024)
const isDesktop = computed(() => windowWidth.value >= 1024)

const updateWidth = () => {
  windowWidth.value = window.innerWidth
}

onMounted(() => {
  updateWidth()
  window.addEventListener('resize', updateWidth)
})

// Fonction pour extraire les informations du nom de fichier
const extractInfoFromFilename = (filename) => {
  const [prenom, nom, numero] = filename.replace('.jpg', '').split('_')
  return {
    prenom,
    nom,
    numero: numero.replace(/[^0-9]/g, ''), // Garde uniquement les chiffres
  }
}

// Liste des pilotes
const pilotes = [
  'Adrien_ECOFFIER_137.jpg',
  'Anthony_BOURDON_945.jpg',
  'Cedric_SOUBEYRAS_85.jpg',
  'Gregory_ARRANDA_20.jpg',
  'Jorge_ZARAGOZA_99.jpg',
  'Lorenzo_CAMPORESE_384.jpg'
].map((filename, index) => {
  const info = extractInfoFromFilename(filename)
  return {
    id: index + 1,
    image: new URL(`../assets/images/${filename}`, import.meta.url).href,
    filename,
    prenom: info.prenom,
    nom: info.nom,
    numero: info.numero,
    fullName: `${info.prenom} ${info.nom}`
  }
})
</script>

<style scoped>
.gallery-container {
  will-change: contents;
}

.group {
  will-change: transform, height, opacity;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

img {
  backface-visibility: hidden;
  transform: translateZ(0);
  -webkit-font-smoothing: subpixel-antialiased;
}

/* Effet de réduction de la première image quand on survole les autres */
@media (min-width: 768px) {
  .gallery-container:hover .first-image {
    flex-basis: 12% !important;
  }
  
  .gallery-container:hover .first-image .first-overlay {
    opacity: 0 !important;
  }

  .gallery-container:hover .first-image .first-content {
    transform: translateY(100%) !important;
  }
  
  .gallery-container .first-image:hover {
    flex-basis: 35% !important;
  }

  .gallery-container .first-image:hover .first-overlay {
    opacity: 1 !important;
  }

  .gallery-container .first-image:hover .first-content {
    transform: translateY(0) !important;
  }
}
</style>
