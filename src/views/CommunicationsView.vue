<template>
  <div class="communications-view">
    <div class="container">
      <div class="grid-layout">
        <VideoDisplay />
        <CommunicationConsole />
      </div>
    </div>
    <AIAssistant />
  </div>
</template>

<script setup>
import CommunicationConsole from '@/components/CommunicationConsole.vue'
import VideoDisplay from '@/components/VideoDisplay.vue'
import AIAssistant from '@/components/AIAssistant.vue'
</script>

<style scoped>
.communications-view {
  min-height: 100vh;
  background: black;
  padding: 1rem;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

/* Responsive layout */
@media (min-width: 1024px) {
  .grid-layout {
    grid-template-columns: 3fr 2fr;
    align-items: start;
  }
}
</style>
