import { BASE_URL, apiRoutes } from '@/constants/apiRoutes'
import { type Event } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'

interface State {
  events: Event[]
  isLoading: boolean
}

export const useEventsStore = defineStore('events', {
  state: (): State => ({
    events: [],
    isLoading: false,
  }),
  actions: {
    async getEvents() {
      this.isLoading = true

      try {
        const response = await axios.get<Event[]>(`${BASE_URL}${apiRoutes.EVENTS}`)

        this.events = response.data
      } catch (error) {
        console.error(error)
        return error
      } finally {
        this.isLoading = false
      }
    },
  },
})
