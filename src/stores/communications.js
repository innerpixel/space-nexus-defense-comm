import { defineStore } from 'pinia'
import axios from 'axios'

export const useCommunicationsStore = defineStore('communications', {
  state: () => ({
    messages: [],
    isActive: true,
    messageTypes: ['ALERT', 'WARNING', 'STATUS', 'UPDATE', 'NOTICE'],
  }),

  actions: {
    async generateMessage(type) {
      try {
        // TODO: Replace with actual API call once backend is set up
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
          STATUS: [
            'Life support systems nominal',
            'Artificial gravity systems functioning normally',
            'Shield generators operating at 85% capacity'
          ],
          UPDATE: [
            'Shield generators operating at 85% capacity',
            'Security protocols engaged in all sectors',
            'Wormhole stability at critical threshold'
          ],
          NOTICE: [
            'Quantum flux readings indicate temporal distortion',
            'Receiving distress signal from Colony Outpost Beta',
            'Atmospheric processors require maintenance'
          ]
        }

        const messages = presetMessages[type] || presetMessages['STATUS']
        const randomMessage = messages[Math.floor(Math.random() * messages.length)]
        
        this.addMessage({
          type,
          content: randomMessage,
          timestamp: new Date().toLocaleTimeString()
        })
      } catch (error) {
        console.error('Error generating message:', error)
      }
    },

    addMessage(message) {
      this.messages.unshift(message)
      if (this.messages.length > 10) {
        this.messages.pop()
      }
    },

    startRandomMessages() {
      setInterval(() => {
        if (Math.random() > 0.7) {
          const randomType = this.messageTypes[
            Math.floor(Math.random() * this.messageTypes.length)
          ]
          this.generateMessage(randomType)
        }
      }, 5000)
    },
  },
})
