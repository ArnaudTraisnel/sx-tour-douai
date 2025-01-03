<template>
  <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo -->
        <div class="flex items-center">
          <router-link to="/" class="text-lg sm:text-xl md:text-2xl lg:text-2xl font-bold whitespace-nowrap">
            <span class="text-gray-800">Supercross</span>
            <span class="text-red-600"> Douai</span>
          </router-link>
        </div>

        <!-- Desktop Menu -->
        <div class="hidden sm:flex sm:items-center">
          <div class="flex items-center space-x-1 md:space-x-2 lg:space-x-4">
            <router-link
              v-for="item in menuItems"
              :key="item.path"
              :to="item.path"
              class="px-2 md:px-3 py-2 rounded-md text-sm md:text-base lg:text-base font-medium hover:text-red-600 transition-colors whitespace-nowrap"
              :class="[$route.path === item.path ? 'text-red-600' : 'text-gray-600']"
            >
              {{ item.name }}
            </router-link>
            <!-- Dashboard Link -->
            <router-link
              v-if="isLoggedIn"
              to="/admin"
              class="px-2 md:px-3 py-2 rounded-md text-sm md:text-base lg:text-base font-medium hover:text-red-600 transition-colors whitespace-nowrap"
              :class="[$route.path.startsWith('/admin') ? 'text-red-600' : 'text-gray-600']"
            >
              Dashboard
            </router-link>
            <!-- Logout Button -->
            <button
              v-if="isLoggedIn"
              @click="handleLogout"
              class="group inline-flex items-center justify-center px-3 md:px-4 py-2 text-sm md:text-base lg:text-base font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl whitespace-nowrap"
            >
              Déconnexion
            </button>
          </div>
        </div>

        <!-- Mobile menu button -->
        <div class="flex items-center sm:hidden">
          <button
            @click="mobileMenuOpen = !mobileMenuOpen"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-red-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
          >
            <span class="sr-only">Open main menu</span>
            <!-- Icon when menu is closed -->
            <svg
              v-if="!mobileMenuOpen"
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <!-- Icon when menu is open -->
            <svg
              v-else
              class="block h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile menu -->
    <div
      v-show="mobileMenuOpen"
      class="sm:hidden bg-white border-b border-gray-200"
    >
      <div class="px-2 pt-2 pb-3 space-y-1">
        <router-link
          v-for="item in menuItems"
          :key="item.path"
          :to="item.path"
          class="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
          :class="[$route.path === item.path ? 'text-red-600' : 'text-gray-600']"
          @click="mobileMenuOpen = false"
        >
          {{ item.name }}
        </router-link>
        <!-- Dashboard Link Mobile -->
        <router-link
          v-if="isLoggedIn"
          to="/admin"
          class="block px-3 py-2 rounded-md text-base font-medium hover:text-red-600 transition-colors"
          :class="[$route.path.startsWith('/admin') ? 'text-red-600' : 'text-gray-600']"
          @click="mobileMenuOpen = false"
        >
          Dashboard
        </router-link>
        <!-- Logout Button Mobile -->
        <button
          v-if="isLoggedIn"
          @click="handleLogout"
          class="w-full text-left px-3 py-2 rounded-md text-base font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          Déconnexion
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '../features/auth/store/auth.store'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const mobileMenuOpen = ref(false)
const isLoggedIn = ref(false)

const menuItems = [
  { path: '/', name: 'Accueil' },
  { path: '/tickets', name: 'Billetterie' },
  { path: '/contact', name: 'Contact' }
]

async function handleLogout() {
  try {
    await authStore.signOut()
    router.push('/')
    mobileMenuOpen.value = false
  } catch (error) {
    console.error('Erreur lors de la déconnexion:', error)
  }
}

async function checkAuthStatus() {
  try {
    await authStore.checkAuth()
    isLoggedIn.value = !!authStore.user
  } catch (error) {
    console.error('Erreur lors de la vérification de l\'authentification:', error)
  }
}

// Vérifier l'état de connexion au chargement et lors des changements
onMounted(checkAuthStatus)
authStore.$subscribe((mutation, state) => {
  isLoggedIn.value = !!state.user
})
</script>
