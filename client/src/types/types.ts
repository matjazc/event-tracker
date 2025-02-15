export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

export interface EventItem {
  id?: number
  eventId: number | null
  name: string
  description: string
  type: EventType
  priority: number
}

export enum EventType {
  CROSSPROMO = 'CROSSPROMO',
  LIVEOPS = 'LIVEOPS',
  APP = 'APP',
  ADS = 'ADS',
}
