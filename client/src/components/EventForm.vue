<script setup lang="ts">
import { Role, type EventItem } from '@/types/types'
import { ref } from 'vue'

defineProps<{
  isNewEvent: boolean
  editedEvent: EventItem
  role: Role | null
  validationRules: ((v: any) => boolean | string)[]
  eventTypesList: string[]
  priorityList: Number[]
}>()

const isFormValid = ref(false)

const emit = defineEmits(['cancel', 'save'])
</script>

<template>
  <v-card>
    <v-card-title>
      <span class="text-h5">{{ isNewEvent ? 'New Event' : 'Edit Event' }}</span>
    </v-card-title>
    <v-card-text>
      <v-form ref="form" v-model="isFormValid">
        <v-container>
          <v-text-field
            v-model.number="editedEvent.eventId"
            label="Id"
            :rules="validationRules"
            required
          ></v-text-field>
          <v-text-field
            v-model="editedEvent.name"
            label="Name"
            :rules="validationRules"
            required
          ></v-text-field>
          <v-row>
            <v-col>
              <v-select
                v-model="editedEvent.type"
                label="Type"
                :items="role === 'ADMIN' ? eventTypesList : eventTypesList.slice(0, -1)"
              ></v-select>
            </v-col>
            <v-col>
              <v-select
                v-model="editedEvent.priority"
                label="Priority"
                :items="priorityList"
              ></v-select>
            </v-col>
          </v-row>
          <v-textarea
            v-model="editedEvent.description"
            label="Description"
            :rules="validationRules"
            required
          ></v-textarea>
        </v-container>
      </v-form>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue-darken-1" variant="text" @click="$emit('cancel')">Cancel</v-btn>
      <v-btn
        :disabled="!isFormValid"
        color="blue-darken-1"
        variant="text"
        type="submit"
        @click="$emit('save')"
      >
        Save
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
