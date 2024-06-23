import { Location } from 'services'

export interface TripLocationModalProps {
  isOpen: boolean
  startLocation: Location
  endLocation: Location
  onCancel: () => void
}
