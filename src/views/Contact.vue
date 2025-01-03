<template>
  <div class="min-h-screen bg-gradient-to-b from-pink-50/30 to-blue-50/30 pt-24 pb-16">
    <div class="container-custom mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Section Contact -->
      <div class="max-w-xl mx-auto bg-white rounded-2xl shadow-custom p-8 mb-16">
        <h1 class="text-3xl font-bold text-center mb-3">CONTACTEZ-NOUS</h1>
        <p class="text-center text-slate-600 mb-8">
          Une question ? N'hésitez pas à nous contacter.<br>
          Notre équipe vous répondra dans les plus brefs délais.
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label for="name" class="form-label">
                Nom et prénom <span class="text-red-500">*</span>
              </label>
              <input
                id="name"
                v-model="formData.name"
                type="text"
                required
                class="form-input"
                placeholder="Votre nom complet"
              >
            </div>

            <div>
              <label for="email" class="form-label">
                Email <span class="text-red-500">*</span>
              </label>
              <input
                id="email"
                v-model="formData.email"
                type="email"
                required
                class="form-input"
                placeholder="votre@email.com"
              >
            </div>

            <div>
              <label for="subject" class="form-label">
                Sujet <span class="text-red-500">*</span>
              </label>
              <input
                id="subject"
                v-model="formData.subject"
                type="text"
                required
                class="form-input"
                placeholder="Sujet de votre message"
              >
            </div>

            <div>
              <label for="message" class="form-label">
                Message <span class="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                v-model="formData.message"
                rows="4"
                required
                class="form-input"
                placeholder="Votre message..."
              ></textarea>
            </div>
          </div>

          <button
            type="submit"
            class="w-full flex justify-center items-center px-6 py-3 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200"
          >
            Envoyer le message
            <svg
              class="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"

const formData = ref({
  name: "",
  email: "",
  subject: "",
  message: ""
})

const handleSubmit = () => {
  // Logique d'envoi du formulaire à implémenter
  console.log("Form submitted:", formData.value)
}
</script>

<style lang="scss" scoped>
.container-custom {
  max-width: 1200px;
  margin: 0 auto;
}

.shadow-custom {
  box-shadow: 0 10px 30px -5px rgba(0, 0, 0, 0.1);
}

.form-label {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

.form-input {
  @apply w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors duration-200;
}
</style>
