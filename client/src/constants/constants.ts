import { EventType } from '@/types/types'

export const tableHeaders = [
  { title: 'Id', key: 'id' },
  { title: 'Name', key: 'name' },
  { title: 'Type', key: 'type' },
  { title: 'Priority', key: 'priority' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', sortable: false },
]

export const priorityArray: Number[] = [...Array(11)].map((_, index) => index)
export const eventTypesArray: string[] = [
  EventType.ADS,
  EventType.APP,
  EventType.CROSSPROMO,
  EventType.LIVEOPS,
]
