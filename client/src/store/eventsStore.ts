import { BASE_URL, apiRoutes } from '@/constants/apiRoutes'
import { type EventItem } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

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
        console.error(error)
        toast.error('Error fetching events.', {
          position: 'top-center',
          autoClose: 1500,
        })
      } finally {
        this.isLoading = false
      }
    },
    async addEvent(event: EventItem) {
      this.isLoading = true

      try {
        const { id, ...rest } = event

        await axios.post<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}`, rest)

        toast.success('Event successfully created!', {
          position: 'top-center',
          autoClose: 1500,
        })
        this.getEvents()
      } catch (error) {
        console.error(error)
        toast.error('Failed to create event.', {
          position: 'top-center',
          autoClose: 1500,
        })
      } finally {
        this.isLoading = false
      }
    },
    async deleteEvent(id: number) {
      this.isLoading = true

      try {
        await axios.delete<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}/${id}`)

        toast.success('Event successfully deleted!', {
          position: 'top-center',
          autoClose: 1500,
        })
        this.getEvents()
      } catch (error) {
        console.error(error)
        toast.error('Failed to delete event.', {
          position: 'top-center',
          autoClose: 1500,
        })
      } finally {
        this.isLoading = false
      }
    },
    async updateEvent(event: EventItem) {
      this.isLoading = true

      try {
        await axios.patch<EventItem[]>(`${BASE_URL}${apiRoutes.EVENTS}/${event.id}`, event)

        toast.success('Event successfully edited!', {
          position: 'top-center',
          autoClose: 1500,
        })
        this.getEvents()
      } catch (error) {
        console.error(error)
        toast.error('Failed to edit event.', {
          position: 'top-center',
          autoClose: 1500,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
})
