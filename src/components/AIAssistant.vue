<template>
  <div class="ai-assistant" :class="{ 'is-active': isVisible }">
    <div class="assistant-container">
      <div class="assistant-header">
        <div class="ai-status">
          <div class="ai-indicator" :class="{ 'active': isThinking }"></div>
          <span>AI ASSISTANT</span>
        </div>
        <button @click="toggleAssistant" class="toggle-button">
          {{ isVisible ? 'MINIMIZE' : 'NEED HELP?' }}
        </button>
      </div>
      
      <div class="assistant-content" v-if="isVisible">
        <div class="messages-container" ref="messagesContainer">
          <div v-for="(message, index) in messages" 
               :key="index" 
               class="message"
               :class="message.type">
            <div class="message-content">{{ message.content }}</div>
            <div class="message-options" v-if="message.options">
              <button v-for="option in message.options"
                      :key="option"
                      @click="handleOption(option, message.id)"
                      class="option-button">
                {{ option }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="input-container">
          <input v-model="userInput"
                 @keyup.enter="sendMessage"
                 placeholder="Ask me anything..."
                 :disabled="isThinking"
                 class="user-input" />
          <button @click="sendMessage" 
                  :disabled="isThinking"
                  class="send-button">
            SEND
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const isVisible = ref(false)
const isThinking = ref(false)
const userInput = ref('')
const messages = ref([])
const messagesContainer = ref(null)

// Welcome message structure
const welcomeMessage = {
  id: 'welcome',
  type: 'ai',
  content: "Welcome to Space Nexus! I'm your AI assistant. How can I help you today?",
  options: [
    "Show me around",
    "How do I use the camera?",
    "Tell me about messages",
    "What are all these buttons?"
  ]
}

// Tutorial steps for different features
const tutorials = {
  camera: [
    "The camera system lets you monitor different areas. Let me show you how to use it.",
    "First, click 'ENABLE FEED' to start the camera.",
    "If you have multiple cameras, you can switch between them.",
    "Would you like to try it now?"
  ],
  messages: [
    "The communication console shows different types of messages: ALERTS, WARNINGS, and STATUS updates.",
    "You can generate different message types using the buttons below.",
    "The system also generates messages automatically to keep you informed.",
    "Want to try sending a message?"
  ]
}

// Handle user selecting an option
const handleOption = async (option, messageId) => {
  isThinking.value = true
  
  let response = {
    type: 'ai',
    content: '',
    options: []
  }

  switch (option) {
    case "Show me around":
      response.content = "I'll give you a quick tour! What would you like to explore first?"
      response.options = ["Camera System", "Message Console", "AI Features"]
      break
    case "How do I use the camera?":
      response.content = tutorials.camera[0]
      response.options = ["Next Step", "Try it myself", "Show all steps"]
      break
    case "Tell me about messages":
      response.content = tutorials.messages[0]
      response.options = ["Next Step", "Try sending a message", "Show all types"]
      break
    default:
      response.content = "I can help you with that! Let me explain..."
      response.options = ["Tell me more", "Try it out", "Show other features"]
  }

  await new Promise(resolve => setTimeout(resolve, 1000))
  messages.value.push(response)
  isThinking.value = false
  scrollToBottom()
}

// Send a message
const sendMessage = async () => {
  if (!userInput.value.trim() || isThinking.value) return

  // Add user message
  messages.value.push({
    type: 'user',
    content: userInput.value
  })

  userInput.value = ''
  isThinking.value = true

  // Simulate AI thinking
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Add AI response
  messages.value.push({
    type: 'ai',
    content: "I understand you're asking about " + messages.value[messages.value.length - 1].content + ". Let me help you with that!",
    options: ["Learn more", "Try it out", "Show me something else"]
  })

  isThinking.value = false
  scrollToBottom()
}

// Toggle assistant visibility
const toggleAssistant = () => {
  isVisible.value = !isVisible.value
  if (isVisible.value && messages.value.length === 0) {
    messages.value.push(welcomeMessage)
  }
}

// Scroll to bottom of messages
const scrollToBottom = () => {
  setTimeout(() => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }, 100)
}

// Watch for new messages and scroll
watch(messages, () => scrollToBottom(), { deep: true })

onMounted(() => {
  // Show welcome message after a short delay
  setTimeout(() => {
    isVisible.value = true
    messages.value.push(welcomeMessage)
  }, 1000)
})
</script>

<style scoped>
.ai-assistant {
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 400px;
  max-width: calc(100vw - 40px);
  background: var(--color-terminal-dark);
  border: 2px solid var(--color-terminal-border);
  border-radius: 8px;
  font-family: var(--font-terminal);
  z-index: 1000;
  opacity: 0.95;
}

.assistant-container {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.assistant-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid var(--color-terminal-border);
}

.ai-status {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-terminal-green);
}

.ai-indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-terminal-green);
  opacity: 0.5;
}

.ai-indicator.active {
  opacity: 1;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.toggle-button {
  background: transparent;
  border: 1px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  transition: all 0.3s ease;
}

.toggle-button:hover {
  background: rgba(51, 255, 51, 0.1);
}

.assistant-content {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.messages-container {
  flex: 1;
  overflow-y: auto;
  padding: 15px;
}

.message {
  margin-bottom: 15px;
  padding: 10px;
  border-radius: 4px;
  max-width: 85%;
}

.message.ai {
  background: rgba(51, 255, 51, 0.1);
  margin-right: auto;
  border-left: 3px solid var(--color-terminal-green);
}

.message.user {
  background: rgba(51, 255, 51, 0.05);
  margin-left: auto;
  border-right: 3px solid var(--color-terminal-green);
}

.message-content {
  color: var(--color-terminal-green);
  margin-bottom: 10px;
}

.message-options {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.option-button {
  background: transparent;
  border: 1px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.option-button:hover {
  background: rgba(51, 255, 51, 0.1);
}

.input-container {
  display: flex;
  gap: 10px;
  padding: 15px;
  border-top: 1px solid var(--color-terminal-border);
}

.user-input {
  flex: 1;
  background: rgba(51, 255, 51, 0.1);
  border: 1px solid var(--color-terminal-border);
  color: var(--color-terminal-green);
  padding: 8px 12px;
  border-radius: 4px;
  font-family: var(--font-terminal);
}

.user-input:focus {
  outline: none;
  border-color: var(--color-terminal-green);
}

.send-button {
  background: transparent;
  border: 1px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 8px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  transition: all 0.3s ease;
}

.send-button:hover:not(:disabled) {
  background: rgba(51, 255, 51, 0.1);
}

.send-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
