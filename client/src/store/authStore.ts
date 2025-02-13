import { apiRoutes, BASE_URL, IPIFY_URL } from '@/constants/apiRoutes'
import { Role } from '@/types/types'
import axios from 'axios'
import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'

interface State {
  token: string
  role: Role | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): State => ({
    token: '',
    role: null,
    isLoading: false,
  }),
  actions: {
    async login() {
      this.isLoading = true

      try {
        const responseIpifyApi = await axios.get(IPIFY_URL)
        this.token = responseIpifyApi.data.ip

        const responseRolesApi = await axios.get(`${BASE_URL}${apiRoutes.ROLES}`, {
          headers: {
            Authorization: `Bearer ${this.token}`,
          },
        })

        this.role = responseRolesApi.data.role
      } catch (error) {
        this.role = Role.USER
        toast.error('Authentication error. The least privileged user rights have been applied.', {
          position: 'top-center',
          autoClose: false,
        })
      } finally {
        this.isLoading = false
      }
    },
  },
})
