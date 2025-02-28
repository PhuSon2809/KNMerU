import { Suspense, useEffect, useMemo } from 'react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers/routes'
import { getCharacters } from './store/character/character.slice'
import { useAppDispatch, useAppSelector } from './store/configStore'
import { getGeneralInfor } from './store/root/root.slice'
import { getAccessToken } from './utils'

function App() {
  const dispatch = useAppDispatch()

  const accessToken = getAccessToken()

  const { characters } = useAppSelector((s) => s.character)
  const { isAuthenticated, userInfo } = useAppSelector((s) => s.auth)

  const isLoggedIn = useMemo(
    () => isAuthenticated && accessToken && userInfo && userInfo?.characterId !== null,
    [isAuthenticated, accessToken, userInfo]
  )

  useEffect(() => {
    if (characters.length === 0) dispatch(getCharacters())
    if (isLoggedIn) dispatch(getGeneralInfor())
  }, [characters, isLoggedIn])

  return (
    <>
      <Suspense
        fallback={<div className='fixed inset-0 flex items-center justify-center'>Loading...</div>}
      >
        <RouterProvider router={routers} />
      </Suspense>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
