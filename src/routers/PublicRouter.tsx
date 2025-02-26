import { memo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { path } from '~/constants/path'
import { useAppSelector } from '~/store/configStore'
import { getAccessToken } from '~/utils'

const PublicRouter = memo(() => {
  const accessToken = getAccessToken()

  const { isAuthenticated, userInfo } = useAppSelector((state) => state.auth)

  return isAuthenticated && accessToken && userInfo && userInfo?.characterId !== null ? (
    <Navigate to={path.home} />
  ) : (
    <Outlet />
  )
})

export default PublicRouter
