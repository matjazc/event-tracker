import { BASE_URL, apiRoutes } from '@/constants/apiRoutes'
import { type EventItem } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'

interface State {
  events: EventItem[]
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
        const response = await axios.get<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}`)

        this.events = response.data
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
    async addEvent(event: EventItem) {
      this.isLoading = true

      const { id, ...rest } = event

      try {
        await axios.post<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}`, rest)
        this.getEvents()
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
    async deleteEvent(id: number) {
      this.isLoading = true

      try {
        await axios.delete<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}/${id}`)
        this.getEvents()
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
    async updateEvent(event: EventItem) {
      this.isLoading = true

      try {
        await axios.patch<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}/${event.id}`, event)
        this.getEvents()
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
  },
})
