import { LoginResponse, User, VehicleLocation } from 'services'

export type UserWithAccess = User & {
  token: string
}

export type AppState = {
  user: UserWithAccess | null
  vehicleLocations?: VehicleLocation[]
}

export type AppActions = {
  setUser: (user: LoginResponse | null) => void
  setVehicleLocations: (vehicleLocations: VehicleLocation[]) => void
  addOrUpdateVehicleLocation: (vehicleLocation: VehicleLocation) => void
}
