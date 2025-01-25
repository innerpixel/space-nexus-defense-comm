<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const stream = ref(null)
const videoPreview = ref(null)
const recordedChunks = ref([])
const mediaRecorder = ref(null)
const isRecording = ref(false)
const countdown = ref(3)
const recordingTimer = ref(null)

const startRecording = async () => {
  try {
    stream.value = await navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    videoPreview.value.srcObject = stream.value
    
    mediaRecorder.value = new MediaRecorder(stream.value)
    recordedChunks.value = []
    
    mediaRecorder.value.ondataavailable = (e) => {
      if (e.data.size > 0) {
        recordedChunks.value.push(e.data)
      }
    }
    
    mediaRecorder.value.onstop = () => {
      const blob = new Blob(recordedChunks.value, { type: 'video/webm' })
      const url = URL.createObjectURL(blob)
      emit('message-recorded', { url, timestamp: new Date().toISOString() })
      stopStream()
    }

    isRecording.value = true
    countdown.value = 3
    
    // Start countdown
    recordingTimer.value = setInterval(() => {
      countdown.value--
      if (countdown.value === 0) {
        clearInterval(recordingTimer.value)
        mediaRecorder.value.start()
        
        // Stop after 3 seconds
        setTimeout(() => {
          if (mediaRecorder.value && mediaRecorder.value.state === 'recording') {
            mediaRecorder.value.stop()
            isRecording.value = false
          }
        }, 3000)
      }
    }, 1000)
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}

const stopStream = () => {
  if (stream.value) {
    stream.value.getTracks().forEach(track => track.stop())
    stream.value = null
  }
  if (videoPreview.value) {
    videoPreview.value.srcObject = null
  }
}

onUnmounted(() => {
  stopStream()
  if (recordingTimer.value) {
    clearInterval(recordingTimer.value)
  }
})

const emit = defineEmits(['message-recorded'])
</script>

<template>
  <div class="video-message">
    <div class="video-container">
      <video ref="videoPreview" autoplay muted playsinline></video>
      <div v-if="isRecording" class="recording-overlay">
        <div class="countdown">{{ countdown }}</div>
        <div class="recording-indicator"></div>
      </div>
    </div>
    <button 
      @click="startRecording" 
      :disabled="isRecording"
      class="record-button"
    >
      {{ isRecording ? 'Recording...' : 'Record Message' }}
    </button>
  </div>
</template>

<style scoped>
.video-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.video-container {
  position: relative;
  width: 320px;
  height: 240px;
  border: 2px solid var(--color-terminal-green);
  border-radius: 8px;
  overflow: hidden;
  background: var(--color-terminal-dark);
}

video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.recording-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
}

.countdown {
  font-size: 4rem;
  color: var(--color-terminal-green);
  text-shadow: 0 0 10px var(--color-terminal-green);
  animation: pulse 1s infinite;
}

.recording-indicator {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 1rem;
  height: 1rem;
  background: var(--color-alert);
  border-radius: 50%;
  animation: blink 1s infinite;
}

.record-button {
  background: transparent;
  border: 2px solid var(--color-terminal-green);
  color: var(--color-terminal-green);
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  transition: all 0.3s ease;
}

.record-button:hover:not(:disabled) {
  background: rgba(51, 255, 51, 0.1);
  box-shadow: 0 0 10px rgba(51, 255, 51, 0.2);
}

.record-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes blink {
  0% { opacity: 1; }
  50% { opacity: 0; }
  100% { opacity: 1; }
}
</style>
