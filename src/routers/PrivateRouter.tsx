import { memo } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { path } from '~/constants/path'
import { useAppSelector } from '~/store/configStore'
import { getAccessToken } from '~/utils'

const PrivateRouter = memo(() => {
  const location = useLocation()
  const accessToken = getAccessToken()

  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth)

  return isAuthenticated && accessToken && userInfo && userInfo?.characterId !== null ? (
    <Outlet />
  ) : (
    <Navigate to={path.login} state={{ from: location }} />
  )
})

export default PrivateRouter
