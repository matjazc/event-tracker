<script setup lang="ts">
defineEmits(['cancel', 'confirm'])
</script>

<template>
  <v-card>
    <v-card-title class="text-h5">Are you sure you want to delete this event?</v-card-title>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn color="blue-darken-1" variant="text" @click="$emit('confirm')">OK</v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
