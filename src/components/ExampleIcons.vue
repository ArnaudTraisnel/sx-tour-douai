<script setup>
import { 
  CalendarIcon, 
  TicketIcon, 
  EnvelopeIcon, 
  QuestionMarkCircleIcon 
} from "@heroicons/vue/24/outline"
import IconButton from "./IconButton.vue"
</script>

<template>
  <div class="flex flex-wrap gap-4 p-4">
    <IconButton 
      label="Calendrier" 
      :icon="CalendarIcon" 
      variant="primary" 
    />
    
    <IconButton 
      label="Tickets" 
      :icon="TicketIcon" 
      variant="secondary" 
    />
    
    <IconButton 
      label="Contact" 
      :icon="EnvelopeIcon" 
      variant="outline" 
    />
    
    <IconButton 
      label="FAQ" 
      :icon="QuestionMarkCircleIcon" 
      variant="primary" 
    />
  </div>
</template>
