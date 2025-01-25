<template>
  <div class="communication-console">
    <div class="console-header">
      <div class="console-title">STARFLEET COMMUNICATIONS TERMINAL</div>
      <div class="status-indicator" :class="{ active: isActive }"></div>
    </div>
    
    <div class="messages-container" ref="messagesContainer">
      <div v-for="(message, index) in messages" 
           :key="index" 
           class="message"
           :class="message.type.toLowerCase()">
        <span class="timestamp">{{ message.timestamp }}</span>
        <span class="type">{{ message.type }}:</span>
        <span class="content">{{ message.content }}</span>
      </div>
    </div>

    <div class="console-controls">
      <button @click="generateMessage('ALERT')" class="control-btn alert">ALERT</button>
      <button @click="generateMessage('WARNING')" class="control-btn warning">WARNING</button>
      <button @click="generateMessage('STATUS')" class="control-btn status">STATUS</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CommunicationConsole',
  data() {
    return {
      isActive: true,
      messages: [],
      messageTypes: ['ALERT', 'WARNING', 'STATUS', 'UPDATE', 'NOTICE']
    }
  },
  mounted() {
    // Generate initial messages
    this.generateMessage('STATUS')
    this.startRandomMessages()
  },
  methods: {
    generateMessage(type) {
      const presetMessages = {
        ALERT: [
          'Incoming transmission from Starbase Alpha',
          'Unidentified vessel approaching from vector 359',
          'Hostile entities detected in lower decks'
        ],
        WARNING: [
          'Shield capacity at 65%',
          'Minor fluctuations in warp core',
          'Environmental systems need maintenance'
        ],
        STATUS: [
          'All systems nominal',
          'Routine maintenance completed',
          'Ship status: Green'
        ]
      }

      const messages = presetMessages[type] || presetMessages.STATUS
      const message = {
        type,
        content: messages[Math.floor(Math.random() * messages.length)],
        timestamp: new Date().toLocaleTimeString()
      }

      this.messages.push(message)
      this.$nextTick(() => {
        const container = this.$refs.messagesContainer
        container.scrollTop = container.scrollHeight
      })
    },
    startRandomMessages() {
      setInterval(() => {
        const randomType = this.messageTypes[Math.floor(Math.random() * this.messageTypes.length)]
        this.generateMessage(randomType)
      }, 5000)
    }
  }
}
</script>

<style scoped>
.communication-console {
  background-color: #0a0a0a;
  border: 2px solid #33ff33;
  border-radius: 8px;
  padding: 20px;
  height: 500px;
  display: flex;
  flex-direction: column;
  font-family: 'Courier New', monospace;
  color: #33ff33;
  box-shadow: 0 0 20px rgba(51, 255, 51, 0.2);
}

.console-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #33ff33;
}

.console-title {
  font-size: 1.2em;
  font-weight: bold;
}

.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #333;
}

.status-indicator.active {
  background-color: #33ff33;
  box-shadow: 0 0 10px #33ff33;
  animation: pulse 2s infinite;
}

.messages-container {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  padding-right: 10px;
}

.message {
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
  background-color: rgba(51, 255, 51, 0.1);
}

.message.alert {
  background-color: rgba(255, 0, 0, 0.2);
  border-left: 3px solid #ff0000;
}

.message.warning {
  background-color: rgba(255, 165, 0, 0.2);
  border-left: 3px solid #ffa500;
}

.message.status {
  border-left: 3px solid #33ff33;
}

.timestamp {
  font-size: 0.8em;
  opacity: 0.7;
  margin-right: 10px;
}

.type {
  font-weight: bold;
  margin-right: 10px;
}

.console-controls {
  display: flex;
  gap: 10px;
}

.control-btn {
  background-color: transparent;
  border: 1px solid #33ff33;
  color: #33ff33;
  padding: 8px 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: 'Courier New', monospace;
}

.control-btn:hover {
  background-color: rgba(51, 255, 51, 0.2);
}

.control-btn.alert {
  border-color: #ff0000;
  color: #ff0000;
}

.control-btn.alert:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.control-btn.warning {
  border-color: #ffa500;
  color: #ffa500;
}

.control-btn.warning:hover {
  background-color: rgba(255, 165, 0, 0.2);
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(51, 255, 51, 0.4);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(51, 255, 51, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(51, 255, 51, 0);
  }
}

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #0a0a0a;
}

::-webkit-scrollbar-thumb {
  background: #30af30;
  border-radius: 4px;
}
</style>
