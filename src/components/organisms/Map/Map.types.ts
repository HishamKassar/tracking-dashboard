import { MarkerProps } from 'react-leaflet'
import { ReactElement } from 'react'

export interface MapProps {
  height: string | number
  onAddMarker?: (lat: number, lng: number) => void
  center?: [number, number]
  markers?: {
    markerProps: MarkerProps
    popup?: ReactElement
  }[]
}
