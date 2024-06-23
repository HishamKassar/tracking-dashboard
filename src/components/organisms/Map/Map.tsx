import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents
} from 'react-leaflet'
import { Map as LeafletMap } from 'leaflet'
import { FC, useEffect, useRef } from 'react'
import { MapProps } from 'components/organisms/Map/Map.types.ts'
import cn from 'classnames'
import styles from './Map.module.scss'

const MapEvents: FC<{ onClick?: (lat: number, lng: number) => void }> = ({
  onClick
}) => {
  useMapEvents({
    click: event => {
      onClick?.(event.latlng.lat, event.latlng.lng)
    }
  })
  return null
}

export const Map: FC<MapProps> = props => {
  const { height, onAddMarker, center, markers } = props
  const mapRef = useRef<LeafletMap>(null)

  useEffect(() => {
    const interval = setInterval(function () {
      mapRef.current?.invalidateSize()
    }, 100)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <MapContainer
      ref={mapRef}
      style={{ height }}
      center={center}
      zoom={12}
      className={cn({
        [styles.pointerCursor]: !!props.onAddMarker
      })}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {markers?.map(marker => (
        <Marker {...marker.markerProps}>
          {marker.popup ? <Popup>{marker.popup}</Popup> : <></>}
        </Marker>
      ))}
      <MapEvents onClick={onAddMarker} />
    </MapContainer>
  )
}
