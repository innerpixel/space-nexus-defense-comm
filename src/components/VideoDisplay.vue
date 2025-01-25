<template>
  <div class="video-display">
    <div class="display-header">
      <div class="display-title"></div>
      <div class="camera-controls">
        <button @click="toggleCamera" :class="{ active: isCameraOn }">
          {{ isCameraOn ? 'DISABLE FEED' : 'ENABLE FEED' }}
        </button>
        <button @click="switchCamera" :disabled="!hasMultipleCameras">
          SWITCH CAMERA
        </button>
      </div>
    </div>
    <div class="video-container" :class="{ active: isCameraOn }">
      <video ref="videoElement" autoplay playsinline></video>
      <div v-if="!isCameraOn" class="video-overlay">
        <div class="overlay-text">FEED OFFLINE</div>
      </div>
      <div class="scan-line"></div>
      <div class="corner top-left"></div>
      <div class="corner top-right"></div>
      <div class="corner bottom-left"></div>
      <div class="corner bottom-right"></div>
    </div>
    <div class="display-footer">
      <div class="camera-info">
        <span>CAM-{{ currentCamera + 1 }}</span>
        <span>{{ isCameraOn ? 'ACTIVE' : 'STANDBY' }}</span>
      </div>
      <div class="timestamp">{{ currentTime }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const videoElement = ref(null)
const isCameraOn = ref(false)
const currentCamera = ref(0)
const hasMultipleCameras = ref(false)
const currentTime = ref('')
let stream = null
let timeInterval

// Update timestamp
const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
}

// Start camera
const startCamera = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(device => device.kind === 'videoinput')
    hasMultipleCameras.value = videoDevices.length > 1

    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: videoDevices[currentCamera.value]?.deviceId,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    })
    
    if (videoElement.value) {
      videoElement.value.srcObject = stream
      isCameraOn.value = true
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}

// Stop camera
const stopCamera = () => {
  if (stream) {
    stream.getTracks().forEach(track => track.stop())
    stream = null
  }
  if (videoElement.value) {
    videoElement.value.srcObject = null
  }
  isCameraOn.value = false
}

// Toggle camera
const toggleCamera = () => {
  if (isCameraOn.value) {
    stopCamera()
  } else {
    startCamera()
  }
}

// Switch between available cameras
const switchCamera = async () => {
  currentCamera.value = (currentCamera.value + 1) % 2
  if (isCameraOn.value) {
    stopCamera()
    await startCamera()
  }
}

onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  stopCamera()
  clearInterval(timeInterval)
})
</script>

<style scoped>
.video-display {
  background: var(--color-terminal-dark);
  border: 2px solid var(--color-terminal-border);
  border-radius: 8px;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.display-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.display-title {
  font-size: 1.2em;
  font-weight: bold;
  color: var(--color-terminal-green);
}

.camera-controls {
  display: flex;
  gap: 10px;
}

.camera-controls button {
  background: transparent;
  border: 1px solid var(--color-terminal-border);
  color: var(--color-terminal-green);
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-family: var(--font-terminal);
  transition: all 0.3s ease;
  font-size: 0.9em;
}

.camera-controls button:hover:not(:disabled) {
  background: rgba(48, 175, 48, 0.2);
}

.camera-controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.camera-controls button.active {
  border-color: var(--color-alert);
  color: var(--color-alert);
}

.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
  background: black;
  border: 1px solid var(--color-terminal-border);
  border-radius: 4px;
  overflow: hidden;
  margin: 15px 0;
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain; /* Changed from cover to contain to show full face */
}

.video-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.8);
}

.overlay-text {
  color: var(--color-alert);
  font-size: 1.5em;
  font-weight: bold;
}

.scan-line {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: rgba(51, 255, 51, 0.3);
  animation: scan 2s linear infinite;
}

@keyframes scan {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(100%);
  }
}

.corner {
  position: absolute;
  width: 20px;
  height: 20px;
  border: 2px solid var(--color-terminal-green);
}

.top-left {
  top: 10px;
  left: 10px;
  border-right: none;
  border-bottom: none;
}

.top-right {
  top: 10px;
  right: 10px;
  border-left: none;
  border-bottom: none;
}

.bottom-left {
  bottom: 10px;
  left: 10px;
  border-right: none;
  border-top: none;
}

.bottom-right {
  bottom: 10px;
  right: 10px;
  border-left: none;
  border-top: none;
}

.display-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
  color: var(--color-terminal-green);
  font-size: 0.9em;
}

.camera-info {
  display: flex;
  gap: 20px;
}

.timestamp {
  font-family: monospace;
}
</style>
