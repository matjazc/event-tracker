<script setup lang="ts">
import { eventTypesList, priorityList, tableHeaders } from '@/constants/constants'
import { useAuthStore } from '@/store/authStore'
import { useEventsStore } from '@/store/eventsStore'
import { EventType, Role, type EventItem } from '@/types/types'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref, watch } from 'vue'

const eventStore = useEventsStore()
const { events, isLoading } = storeToRefs(eventStore)
const { getEvents, addEvent, deleteEvent, updateEvent } = eventStore

const authStore = useAuthStore()
const { role } = storeToRefs(authStore)

const isDialog = ref(false)
const isDialogDelete = ref(false)
const isNewEvent = ref(false)

onMounted(() => {
  getEvents()
})

const initialEvent: EventItem = {
  name: '',
  type: EventType.APP,
  priority: 0,
  description: '',
}

const editedEvent: EventItem = reactive({ ...initialEvent })

watch(isDialog, (val) => {
  if (!val) closeDialog()
})

watch(isDialogDelete, (val) => {
  if (!val) closeDialogDelete()
})

const addNewEvent = () => {
  isNewEvent.value = true
  isDialog.value = true
  Object.assign(editedEvent, initialEvent)
}

const editEvent = (item: EventItem) => {
  isNewEvent.value = false
  Object.assign(editedEvent, item)
  isDialog.value = true
}

const removeEvent = (item: EventItem) => {
  Object.assign(editedEvent, item)
  isDialogDelete.value = true
}

const removeEventConfirm = () => {
  const id = editedEvent.id as number
  deleteEvent(id)
  closeDialogDelete()
}

const closeDialog = () => {
  isDialog.value = false
  Object.assign(editedEvent, initialEvent)
}

const closeDialogDelete = () => {
  isDialogDelete.value = false
  Object.assign(editedEvent, initialEvent)
}

const saveEvent = () => {
  if (isNewEvent.value) {
    addEvent(editedEvent)
  } else {
    updateEvent(editedEvent)
  }
  closeDialog()
}
</script>

<template>
  <div class="eventsTable">
    <v-data-table v-model:items="events" :loading="isLoading" :headers="tableHeaders">
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Events</v-toolbar-title>
          <v-dialog v-model="isDialog" class="dialog" :transition="false">
            <template v-slot:activator>
              <v-btn class="mb-2" color="primary" @click="addNewEvent()"> Create New Event </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ isNewEvent ? 'New Event' : 'Edit Event' }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field v-model="editedEvent.name" label="Name"></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-text-field
                        v-model="editedEvent.description"
                        label="Description"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                        v-model="editedEvent.type"
                        label="Type"
                        :items="role === Role.ADMIN ? eventTypesList : eventTypesList.slice(0, -1)"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="4" sm="6">
                      <v-select
                        v-model="editedEvent.priority"
                        label="Priority"
                        :items="priorityList"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialog"> Cancel </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="saveEvent"> Save </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="isDialogDelete" class="dialog" :transition="false">
            <v-card>
              <v-card-title class="text-h5"
                >Are you sure you want to delete this event?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="closeDialogDelete"
                  >Cancel</v-btn
                >
                <v-btn color="blue-darken-1" variant="text" @click="removeEventConfirm">OK</v-btn>
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="me-2" size="small" @click="editEvent(item)"> mdi-pencil </v-icon>
        <v-icon size="small" @click="removeEvent(item)"> mdi-delete </v-icon>
      </template>
    </v-data-table>
  </div>
</template>

<style type="scss">
.eventsTable {
  margin: 20px;
  max-width: 1500px;
}

.dialog {
  max-width: 550px;
}
</style>
