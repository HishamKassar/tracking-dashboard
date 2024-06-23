import { useEffect } from 'react'
import { io } from 'socket.io-client'
import { useAppStore } from '../stores'
import { VehicleLocation } from '../services'

export const useSocket = () => {
  const { addOrUpdateVehicleLocation, user } = useAppStore()

  const socket = io(`${import.meta.env.VITE_SOCKET_URL}`, {
    transports: ['websocket'],
    autoConnect: false,
    query: {
      access_token: user?.token ?? ''
    }
  })

  socket.on('connect', () => {
    console.log('Socket connected:', socket.id);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected');
  });

  socket.on('connect_error', (error) => {
    console.error('Socket connection error:', error);
  });

  socket.on('error', (error) => {
    console.error('Socket error:', error);
  });

  useEffect(() => {
    if (user) {
      socket.connect()
    } else {
      socket.disconnect()
    }

    socket?.on('locationUpdate', (data: VehicleLocation) => {
      addOrUpdateVehicleLocation(data)
    })

    return () => {
      socket?.disconnect()
    }
  }, [])
}
