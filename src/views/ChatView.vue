<script setup>
import { ref } from 'vue'
import VideoMessage from '../components/VideoMessage.vue'

const messages = ref([])

const handleMessageRecorded = (message) => {
  messages.value.unshift(message)
  // Keep only the last 10 messages
  if (messages.value.length > 10) {
    // Clean up old video URLs
    URL.revokeObjectURL(messages.value.pop().url)
  }
}
</script>

<template>
  <div class="chat-view">
    <h1>Space Communications Console</h1>
    <div class="chat-container">
      <div class="message-recorder">
        <VideoMessage @message-recorded="handleMessageRecorded" />
      </div>
      
      <div class="message-list">
        <h2>Recent Transmissions</h2>
        <div v-if="messages.length === 0" class="no-messages">
          No transmissions recorded. Be the first to send a message!
        </div>
        <div v-else class="messages">
          <div v-for="(message, index) in messages" :key="index" class="message-item">
            <video 
              :src="message.url" 
              controls 
              class="message-video"
            ></video>
            <div class="message-info">
              <span class="timestamp">{{ new Date(message.timestamp).toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  color: var(--color-terminal-green);
  text-shadow: 0 0 10px var(--color-terminal-green);
}

.chat-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 2rem;
  background: rgba(10, 10, 10, 0.5);
  border: 1px solid var(--color-terminal-border);
  border-radius: 8px;
  padding: 2rem;
}

.message-recorder {
  position: sticky;
  top: 2rem;
}

.message-list {
  border-left: 1px solid var(--color-terminal-border);
  padding-left: 2rem;
}

h2 {
  margin-bottom: 1rem;
  color: var(--color-terminal-green);
}

.no-messages {
  text-align: center;
  padding: 2rem;
  color: var(--color-terminal-border);
  font-style: italic;
}

.messages {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.message-item {
  background: rgba(51, 255, 51, 0.05);
  border: 1px solid var(--color-terminal-border);
  border-radius: 8px;
  padding: 1rem;
  animation: fadeIn 0.3s ease-out;
}

.message-video {
  width: 100%;
  border-radius: 4px;
  margin-bottom: 0.5rem;
}

.message-info {
  display: flex;
  justify-content: flex-end;
  font-size: 0.9rem;
  color: var(--color-terminal-border);
}

.timestamp {
  font-family: var(--font-terminal);
}

@media (max-width: 768px) {
  .chat-container {
    grid-template-columns: 1fr;
  }

  .message-list {
    border-left: none;
    border-top: 1px solid var(--color-terminal-border);
    padding-left: 0;
    padding-top: 2rem;
    margin-top: 2rem;
  }

  .message-recorder {
    position: static;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
