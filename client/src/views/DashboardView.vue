<script setup lang="ts">
import { useAuthStore } from '@/store/authStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref } from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/css/index.css'
import EventsTable from '../components/EventsTable.vue'

const store = useAuthStore()
const { isLoading, role } = storeToRefs(store)
const { login } = store

const drawer = ref(null)

onMounted(() => {
  login()
})
</script>

<template>
  <Loading v-if="isLoading" :active="isLoading" />
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Event Tracker</v-app-bar-title>
      <div class="role">
        <div v-if="!isLoading">Role: {{ role }}</div>
        <v-skeleton-loader v-if="isLoading" type="list-item-two-line"></v-skeleton-loader>
      </div>
    </v-app-bar>

    <v-main> <EventsTable /> </v-main>
  </v-app>
</template>

<style>
.role {
  width: 120px;
}
</style>
