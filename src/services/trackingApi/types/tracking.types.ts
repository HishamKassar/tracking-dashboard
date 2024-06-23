import { TripStatus } from 'components/pages/Trips/Trips.types.ts'

export type Location = {
  latitude: number
  longitude: number
}

export type Trip = {
  id: string
  vendorId: string
  vehicleId: string
  pickUpLocation: Location
  dropOffLocation: Location
  status: TripStatus
}
