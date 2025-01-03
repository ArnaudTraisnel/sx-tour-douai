import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../features/auth/store/auth.store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    meta: {
      title: "Accueil - SX Tour Douai"
    }
  },
  {
    path: '/tickets',
    name: 'Tickets',
    component: () => import('../views/Tickets.vue'),
    meta: {
      title: "Billetterie - SX Tour Douai"
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Contact.vue'),
    meta: {
      title: "Contact - SX Tour Douai"
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../features/auth/components/LoginForm.vue'),
  },
  {
    path: '/admin',
    component: () => import('../features/admin/components/AdminLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      {
        path: '',
        name: 'AdminHome',
        component: () => import('../features/admin/components/Dashboard.vue'),
      },
      {
        path: 'messages',
        name: 'AdminMessages',
        component: () => import('../features/admin/components/Messages.vue'),
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve(savedPosition)
        } else {
          resolve({ top: 0 })
        }
      }, 300)
    })
  }
})

// Navigation guards
router.beforeEach(async (to, from, next) => {
  // Update page title
  document.title = to.meta.title || "SX Tour Douai"
  
  // Vérifier si la route nécessite une authentification
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const authStore = useAuthStore()
    try {
      await authStore.checkAuth()
      if (authStore.user) {
        next()
      } else {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      }
    } catch (error) {
      console.error('Erreur lors de la vérification de l\'authentification:', error)
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
