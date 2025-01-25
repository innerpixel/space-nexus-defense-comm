# Space Nexus Defense Communications Console

A sci-fi themed communication console with integrated video surveillance capabilities, built with Vue.js.

## Features

### 🎥 Video Surveillance System
- Real-time camera feed display
- Multiple camera support with switching capability
- Sci-fi inspired UI elements:
  - Scanning line animation
  - Corner brackets
  - Status indicators
  - Real-time timestamp
  - Camera identification

### 💬 Communications Console
- Real-time message display
- Multiple message types (ALERT, WARNING, STATUS)
- Auto-generated sci-fi messages
- Message animations
- Timestamp tracking

## Technical Implementation

### Video Display Component

The video display system (`VideoDisplay.vue`) utilizes the WebRTC API through the `navigator.mediaDevices` interface to access the user's camera:

```javascript
// Access camera feed
const startCamera = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices()
    const videoDevices = devices.filter(device => device.kind === 'videoinput')
    
    stream = await navigator.mediaDevices.getUserMedia({
      video: {
        deviceId: videoDevices[currentCamera.value]?.deviceId,
        width: { ideal: 1280 },
        height: { ideal: 720 }
      }
    })
    
    videoElement.value.srcObject = stream
  } catch (error) {
    console.error('Error accessing camera:', error)
  }
}
```

Key features:
- Camera device enumeration for multiple camera support
- Optimal video resolution settings
- Stream handling and cleanup
- Camera switching functionality

### Video Display Layout

The video container maintains a perfect 16:9 aspect ratio using the padding-top technique:

```css
.video-container {
  position: relative;
  width: 100%;
  padding-top: 56.25%; /* 16:9 Aspect Ratio */
}

.video-container video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
}
```

This ensures:
- Consistent video dimensions
- No face cropping
- Proper scaling across different screen sizes
- Maintained aspect ratio during window resizing

### Communications Console

The communications system (`CommunicationConsole.vue`) uses Vue 3's Composition API with Pinia for state management:

- Real-time message generation
- Message type differentiation
- Animated message transitions
- Timestamp synchronization

### Responsive Grid Layout

The main view (`CommunicationsView.vue`) implements a responsive grid layout:

```css
.grid-layout {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 1024px) {
  .grid-layout {
    grid-template-columns: 3fr 2fr;
    align-items: start;
  }
}
```

This provides:
- Mobile-first design
- Optimal space utilization
- Flexible component sizing
- Consistent spacing

## Styling

The application uses CSS variables for consistent theming:

```css
:root {
  --color-terminal-dark: #1a1a1a;
  --color-terminal-green: #33ff33;
  --color-terminal-border: #33ff33;
  --color-alert: #ff3333;
  --color-warning: #ffff33;
  --font-terminal: 'Courier New', monospace;
}
```

## Future Enhancements

Potential improvements:
1. Video recording capabilities
2. Face detection overlays
3. Advanced message filtering
4. Custom message input
5. Video effects and filters
6. Network status monitoring
7. Emergency broadcast system
8. User authentication
9. Secure video encryption
10. Remote camera access
