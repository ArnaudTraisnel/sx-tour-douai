<script setup>
import { defineProps } from "vue"

const props = defineProps({
  label: {
    type: String,
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: "primary",
    validator: value => ["primary", "secondary", "outline"].includes(value)
  }
})
</script>

<template>
  <button
    :class="[
      'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300',
      {
        'bg-primary text-white hover:bg-opacity-90': variant === 'primary',
        'bg-gray-200 text-gray-800 hover:bg-gray-300': variant === 'secondary',
        'border-2 border-primary text-primary hover:bg-primary hover:text-white': variant === 'outline'
      }
    ]"
  >
    <component :is="icon" class="w-5 h-5" />
    {{ label }}
  </button>
</template>
