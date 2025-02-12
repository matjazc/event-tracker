import { IPIFY_URL } from '@/constants/apiRoutes'
import { Role } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'

interface State {
  token: string
  role: Role
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: '',
    role: Role.USER,
    isLoading: false,
  }),
  actions: {
    async login() {
      this.isLoading = true

      try {
        const response = await axios.get(`${IPIFY_URL}`)
        this.token = response.data.ip
      } catch (error) {
        return error
      } finally {
        this.isLoading = false
      }
    },
  },
})
