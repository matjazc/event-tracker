<script setup lang="ts">
import { ref } from 'vue';
import EventsTable from '../components/EventsTable.vue';

const drawer = ref(null)
</script>

<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer"> </v-navigation-drawer>

    <v-app-bar>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title>Event Tracker</v-app-bar-title>
    </v-app-bar>

    <v-main> <EventsTable /> </v-main>
  </v-app>
</template>
