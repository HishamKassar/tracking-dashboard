import { Location } from './tracking.types.ts'

export enum VehicleLocationTripStatus {
  ONLINE = 'online',
  OFFLINE = 'offline',
  CLOSED = 'closed'
}

export type VehicleLocation = {
  id: string
  tripId: string
  vendorId: string
  vehicleId: string
  currentLocation: Location
  status: VehicleLocationTripStatus
}
