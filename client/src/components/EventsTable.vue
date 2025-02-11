<script setup lang="ts">
import { useEventsStore } from '@/store/eventsStore'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'

const store = useEventsStore()
const { events, isLoading } = storeToRefs(store)
const { getEvents } = store

onMounted(() => {
  getEvents()
})
</script>

<template>
  <div class="eventsTable">
    <v-data-table v-model:items="events" :loading="isLoading"></v-data-table>
  </div>
</template>

<style type="scss">
.eventsTable {
  margin: 20px;
}
</style>
