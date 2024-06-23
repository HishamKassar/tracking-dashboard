import type React from 'react'
import { User, Vehicle } from 'services'

export interface AddTripModalProps {
  isOpen: boolean
  vehicles: Vehicle[]
  vendors: User[]
  onAddTrip: (
    driverId: string,
    vehicleId: string,
    startCoords: [number, number],
    endCoords: [number, number]
  ) => void
  onCancel: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
}
