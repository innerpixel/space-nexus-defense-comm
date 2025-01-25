<template>
  <div class="communication-console">
    <div class="console-header">
      <div class="console-title">STARFLEET COMMUNICATIONS TERMINAL</div>
      <div class="status-indicator" :class="{ active: isActive }"></div>
    </div>
    
    <div ref="messagesContainer" class="messages-container">
      <TransitionGroup name="message">
        <div v-for="(message, index) in messages" 
             :key="index" 
             class="message"
             :class="message.type.toLowerCase()">
          <span class="timestamp">{{ message.timestamp }}</span>
          <span class="type">{{ message.type }}:</span>
          <span class="content">{{ message.content }}</span>
        </div>
      </TransitionGroup>
    </div>

    <div class="console-controls">
      <button v-for="type in ['ALERT', 'WARNING', 'STATUS']" 
              :key="type"
              @click="generateMessage(type)"
              :class="type.toLowerCase()">
        {{ type }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useCommunicationsStore } from '@/stores/communications'
import { storeToRefs } from 'pinia'

const store = useCommunicationsStore()
const { messages, isActive } = storeToRefs(store)
const messagesContainer = ref(null)

const generateMessage = (type) => {
  store.generateMessage(type)
}

onMounted(() => {
  store.generateMessage('STATUS')
  store.startRandomMessages()
})
</script>

<style scoped>
.communication-console {
  background: var(--color-terminal-dark);
  border: 2px solid var(--color-terminal-border);
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--color-terminal-border);
  padding-bottom: 10px;
  margin-bottom: 15px;
}

.console-title {
  font-size: 1.2em;
  font-weight: bold;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--color-alert);
  transition: all 0.3s ease;
}

.status-indicator.active {
  background: var(--color-terminal-green);
  box-shadow: 0 0 10px rgba(51, 255, 51, 0.5);
}

.messages-container {
  flex: 1;
  min-height: 300px;
  overflow-y: auto;
  margin-bottom: 15px;
  padding: 10px;
  border: 1px solid var(--color-terminal-border);
  border-radius: 4px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  background: rgba(48, 175, 48, 0.1);
}

.message .timestamp {
  color: #888;
  margin-right: 10px;
}

.message .type {
  font-weight: bold;
  margin-right: 10px;
}

.message.alert {
  border-left: 3px solid var(--color-alert);
}

.message.warning {
  border-left: 3px solid var(--color-warning);
}

.message.status {
  border-left: 3px solid var(--color-terminal-green);
}

.console-controls {
  display: flex;
  gap: 10px;
}

.console-controls button {
  background: transparent;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  transition: all 0.3s ease;
}

.console-controls button:hover {
  background: rgba(48, 175, 48, 0.2);
}

.console-controls button.alert {
  border: 1px solid var(--color-alert);
  color: var(--color-alert);
}

.console-controls button.warning {
  border: 1px solid var(--color-warning);
  color: var(--color-warning);
}

.console-controls button.status {
  border: 1px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
}

.message-enter-active,
.message-leave-active {
  transition: all 0.5s ease;
}

.message-enter-from {
  opacity: 0;
  transform: translateX(-20px);
}

.message-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-terminal-dark);
}

::-webkit-scrollbar-thumb {
  background: var(--color-terminal-border);
  border-radius: 4px;
}
</style>
