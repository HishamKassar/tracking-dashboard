import { AppTemplate } from 'components/templates/AppTemplate'
import { createRoutesFromElements, Route } from 'react-router-dom'
import { LandingTemplate } from 'components/templates/LandingTemplate'
import { Login } from 'components/organisms/Login'
import { Tracking } from 'components/pages/Tracking'
import { Vehicles } from 'components/pages/Vehicles'
import { Vendors } from 'components/pages/Vendors'
import { Trips } from 'components/pages/Trips'

export const PATHS = {
  homepage: '/',
  login: '/login',
  tracking: '/tracking',
  vehicles: '/vehicles',
  vendors: '/vendors',
  trips: '/trips'
} as const

export const routes = createRoutesFromElements(
  <>
    <Route path={PATHS.homepage} element={<AppTemplate />}>
      <Route path={PATHS.tracking} element={<Tracking />} />
      <Route path={PATHS.vehicles} element={<Vehicles />} />
      <Route path={PATHS.vendors} element={<Vendors />} />
      <Route path={PATHS.trips} element={<Trips />} />
    </Route>
    <Route path={PATHS.login} element={<LandingTemplate />}>
      <Route path={PATHS.login} element={<Login />} />
    </Route>
  </>
)
