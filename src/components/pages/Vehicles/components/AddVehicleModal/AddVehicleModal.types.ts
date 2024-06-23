export interface AddVehicleModalProps {
  isOpen: boolean
  isLoading: boolean
  onAddVehicle: (type: string, kind: string) => void
  onCancel: () => void
}
