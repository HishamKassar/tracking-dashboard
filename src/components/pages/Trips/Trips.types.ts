import { Location } from 'services'

export enum TripStatus {
  IDLE = 'idle',
  STARTED = 'started',
  FINISHED = 'finished'
}

export interface TripColumnDataType {
  key: string
  pickUpLocation: Location
  dropOffLocation: Location
  vendorId: string
  vehicleId: string
  status: TripStatus
}
