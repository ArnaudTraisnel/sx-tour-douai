<script setup>
import { onMounted, onUnmounted, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import Navigation from "./components/Navigation.vue"
import Footer from "./components/Footer.vue"
import { useStatsStore } from './features/admin/store/stats.store'

const route = useRoute()
const statsStore = useStatsStore()

const showFooter = computed(() => {
  return !route.path.startsWith('/admin')
})

onMounted(async () => {
  console.log('App mounted, current route:', route.name)
  // Enregistre une visite à chaque chargement de l'app
  if (!route.path.startsWith('/admin')) {
    await statsStore.recordVisit()
  }
})
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <Navigation />
    <main class="flex-1 w-full">
      <Suspense>
        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
        <template #fallback>
          <div class="flex items-center justify-center h-full">
            <div class="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-red-600"></div>
          </div>
        </template>
      </Suspense>
    </main>
    <Footer v-if="showFooter" />
  </div>
</template>

<style lang="scss">
.min-h-screen {
  min-height: 100vh;
}

.flex-1 {
  flex: 1;
}

.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
