import { Suspense, useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers/routes'
import { getCharacters } from './store/character/character.slice'
import { useAppDispatch, useAppSelector } from './store/configStore'

function App() {
  const dispatch = useAppDispatch()

  const { characters } = useAppSelector((s) => s.character)

  useEffect(() => {
    if (characters.length === 0) dispatch(getCharacters())
  }, [characters])

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
