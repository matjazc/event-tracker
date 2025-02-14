<script setup lang="ts">
import { eventTypesList, priorityList, tableHeaders } from '@/constants/constants'
import { useAuthStore } from '@/store/authStore'
import { useEventsStore } from '@/store/eventsStore'
import { EventType, type EventItem } from '@/types/types'
import { AxiosError } from 'axios'
import { storeToRefs } from 'pinia'
import { onMounted, reactive, ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import EventDeleteCard from './EventDeleteCard.vue'
import EventForm from './EventForm.vue'

const eventStore = useEventsStore()
const { events, isLoading } = storeToRefs(eventStore)
const { getEvents, addEvent, deleteEvent, updateEvent } = eventStore

const authStore = useAuthStore()
const { role } = storeToRefs(authStore)

const isDialog = ref(false)
const isDialogDelete = ref(false)
const isNewEvent = ref(false)

const validationRules = [(v: any) => !!v || 'This field is required.']

onMounted(() => {
  getEvents()
})

const initialEvent: EventItem = {
  eventId: null,
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

const saveEvent = async () => {
  const action = isNewEvent.value ? addEvent : updateEvent
  const defaultErrorMessage = isNewEvent.value
    ? 'Failed to create event. Try again.'
    : 'Failed to edit event. Try again.'

  try {
    await action(editedEvent)
    closeDialog()
  } catch (err) {
    const error = err as AxiosError
    handleApiError(error, defaultErrorMessage)
  }
}

const extractErrorMessage = (error: AxiosError): string => {
  return (error.response?.data as { message: string })?.message ?? 'An unknown error occurred'
}

const handleApiError = (error: AxiosError, defaultErrorMessage: string) => {
  const status = error.response?.status
  const customMessage = extractErrorMessage(error)

  switch (status) {
    case 403:
      toast.error(
        'You don’t have permission to select the ADS type. Please choose a different type and try again.',
        { position: 'top-center', autoClose: 4000 },
      )
      break
    case 400:
    case 409:
      toast.error(customMessage, { position: 'top-center', autoClose: 4000 })
      break
    default:
      toast.error(defaultErrorMessage, { position: 'top-center', autoClose: 1500 })
      break
  }
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
              <v-btn color="primary" @click="addNewEvent()"> Create New Event </v-btn>
            </template>
            <EventForm
              :isNewEvent="isNewEvent"
              :editedEvent="editedEvent"
              :role="role"
              :validationRules="validationRules"
              :eventTypesList="eventTypesList"
              :priorityList="priorityList"
              @cancel="closeDialog"
              @save="saveEvent"
            />
          </v-dialog>
          <v-dialog v-model="isDialogDelete" class="dialog" :transition="false">
            <EventDeleteCard @cancel="closeDialogDelete" @confirm="removeEventConfirm" />
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
