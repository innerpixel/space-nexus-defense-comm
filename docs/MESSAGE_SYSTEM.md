# Message Generation System

## Overview

The communication console's message system uses a Pinia store to manage and generate sci-fi themed messages. The system includes different message types, automatic generation, and a queue management system.

## Message Types

The system supports five different message types:
- **ALERT**: Critical situations and immediate threats
- **WARNING**: Potential issues and concerning situations
- **STATUS**: Regular system status updates
- **UPDATE**: Progress and change notifications
- **NOTICE**: General information and observations

## How Messages Are Generated

### 1. Message Store Structure

```javascript
state: () => ({
  messages: [],        // Queue of messages
  isActive: true,      // System active status
  messageTypes: ['ALERT', 'WARNING', 'STATUS', 'UPDATE', 'NOTICE']
})
```

### 2. Message Generation Process

```javascript
async generateMessage(type) {
  // Preset messages for each type
  const presetMessages = {
    ALERT: [
      'Incoming transmission from Starbase Alpha',
      'Unidentified vessel approaching from vector 359',
      'Hostile entities detected in lower decks'
    ],
    WARNING: [
      'Anomaly detected in sector 7G',
      'Radiation levels exceeding safety parameters',
      'Hyperspace drive core temperature rising'
    ],
    // ... other message types
  }

  // Select random message from type
  const messages = presetMessages[type] || presetMessages['STATUS']
  const randomMessage = messages[Math.floor(Math.random() * messages.length)]
  
  // Add timestamp and queue message
  this.addMessage({
    type,
    content: randomMessage,
    timestamp: new Date().toLocaleTimeString()
  })
}
```

### 3. Automatic Message Generation

The system automatically generates random messages:

```javascript
startRandomMessages() {
  setInterval(() => {
    if (Math.random() > 0.7) {  // 30% chance of new message
      const randomType = this.messageTypes[
        Math.floor(Math.random() * this.messageTypes.length)
      ]
      this.generateMessage(randomType)
    }
  }, 5000)  // Check every 5 seconds
}
```

## Message Queue Management

Messages are managed using a First-In-First-Out (FIFO) queue with a maximum of 10 messages:

```javascript
addMessage(message) {
  this.messages.unshift(message)  // Add to start
  if (this.messages.length > 10) {
    this.messages.pop()           // Remove oldest if over limit
  }
}
```

## Message Display

Messages are displayed with:
- Message type indicator
- Timestamp
- Content
- Type-specific styling
- Smooth transition animations

## Future Enhancements

1. **API Integration**
   - Replace preset messages with dynamic API calls
   - Add real-time event handling
   - Implement websocket connections

2. **Advanced Features**
   - Message priority system
   - Interactive responses
   - Message filtering
   - Custom message creation
   - Message acknowledgment system

3. **AI Integration**
   - Context-aware message generation
   - Natural language processing
   - Predictive alerts
   - Sentiment analysis

4. **Customization**
   - User-defined message types
   - Custom message templates
   - Frequency controls
   - Alert thresholds
