export interface Event {
  id: number
  name: string
  description: string
  type: EventType
  priority: number
}

export enum EventType {
  CROSSPROMO = 'crosspromo',
  LIVEOPS = 'liveops',
  APP = 'app',
  ADS = 'ads',
}
