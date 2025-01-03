<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Desktop Sidebar -->
    <aside class="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:top-[73px] lg:bottom-0 bg-white shadow-lg">
      <div class="flex flex-col flex-1">
        
        <!-- Navigation Links -->
        <nav class="flex-1 px-4 py-4 space-y-2">
          <router-link
            to="/admin"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            :class="{ 'bg-red-50 text-red-600': $route.path === '/admin' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Accueil
          </router-link>

          <router-link
            to="/admin/messages"
            class="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
            :class="{ 'bg-red-50 text-red-600': $route.path === '/admin/messages' }"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Messages
          </router-link>
        </nav>

        <!-- Logout Button -->
        <div class="p-4 border-t border-gray-200">
          <button
            @click="handleLogout"
            class="flex items-center w-full px-4 py-3 text-gray-700 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="lg:pl-64 flex-1">
      <div class="fixed top-[73px] right-0 lg:left-64 left-0 bottom-0 overflow-auto">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
            <router-view v-slot="{ Component }">
              <transition
                enter-active-class="transition-opacity duration-150"
                enter-from-class="opacity-0"
                enter-to-class="opacity-100"
                leave-active-class="transition-opacity duration-150"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0"
                mode="out-in"
              >
                <component :is="Component" />
              </transition>
            </router-view>
          </div>
        </div>
      </div>
    </main>

    <!-- Mobile/Tablet Bottom Navigation -->
    <nav class="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200">
      <div class="grid grid-cols-3 h-16">
        <router-link
          to="/admin"
          class="flex flex-col items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
          :class="{ 'text-red-600': $route.path === '/admin' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span class="text-xs mt-1">Accueil</span>
        </router-link>

        <router-link
          to="/admin/messages"
          class="flex flex-col items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
          :class="{ 'text-red-600': $route.path === '/admin/messages' }"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span class="text-xs mt-1">Messages</span>
        </router-link>

        <button
          @click="handleLogout"
          class="flex flex-col items-center justify-center text-gray-700 hover:text-red-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span class="text-xs mt-1">Déconnexion</span>
        </button>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/features/auth/store/auth.store'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  try {
    await authStore.signOut()
    router.push('/login')
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}
</script>
