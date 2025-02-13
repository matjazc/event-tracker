import { EventType } from '@/types/types'

export const tableHeaders = [
  { title: 'Id', key: 'eventId' },
  { title: 'Name', key: 'name' },
  { title: 'Type', key: 'type' },
  { title: 'Priority', key: 'priority' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', sortable: false },
]

export const priorityList: Number[] = [...Array(11)].map((_, index) => index)
export const eventTypesList: string[] = [
  EventType.APP,
  EventType.CROSSPROMO,
  EventType.LIVEOPS,
  EventType.ADS,
]
