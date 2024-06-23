import { create } from 'zustand'
import { devtools } from 'zustand/middleware'

import { AppActions, AppState, UserWithAccess } from './useAppStore.types.ts'

const userString = localStorage.getItem('user')
const initialState = {
  user: userString ? (JSON.parse(userString) as UserWithAccess) : null,
  vehicleLocations: undefined
}

export const useAppStore = create<AppState & AppActions>()(
  devtools(
    set => ({
      ...initialState,
      setUser: user => set(state => ({ ...state, user })),
      setVehicleLocations: vehicleLocations =>
        set(state => ({ ...state, vehicleLocations })),
      addOrUpdateVehicleLocation: vehicleLocation =>
        set(state => {
          const vehicleLocations = state.vehicleLocations?.slice() ?? []
          const targetIndex = vehicleLocations.findIndex(
            v => v.vehicleId === vehicleLocation.vehicleId
          )
          if (targetIndex !== -1) {
            vehicleLocations[targetIndex] = vehicleLocation
          } else {
            vehicleLocations.push(vehicleLocation)
          }
          return {
            ...state,
            vehicleLocations
          }
        })
    }),
    { name: 'appStore' }
  )
)
