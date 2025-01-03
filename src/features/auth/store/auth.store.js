import { ref } from 'vue'
import { defineStore } from 'pinia'
import { AuthService } from '../services/auth.service'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function signIn(email, password) {
    try {
      loading.value = true
      error.value = null
      const { user: authUser } = await AuthService.signIn(email, password)
      user.value = authUser
      return authUser
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function signOut() {
    try {
      loading.value = true
      error.value = null
      await AuthService.signOut()
      user.value = null
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  async function checkAuth() {
    try {
      loading.value = true
      error.value = null
      const { user: authUser } = await AuthService.getSession()
      user.value = authUser
      return authUser
    } catch (err) {
      error.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  // Vérifier l'authentification au démarrage
  checkAuth()

  return {
    user,
    loading,
    error,
    signIn,
    signOut,
    checkAuth
  }
})
