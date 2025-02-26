import { Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers/routes'
import store, { useAppDispatch } from './store/configStore'
import { getCharacters } from './store/character/character.slice'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getCharacters())
  }, [])

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
