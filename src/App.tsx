import { Suspense } from 'react'
import { Toaster } from 'react-hot-toast'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { routers } from './routers/routes'
import store from './store/configStore'

function App() {
  return (
    <>
      <Suspense
        fallback={<div className='fixed inset-0 flex items-center justify-center'>Loading...</div>}
      >
        <Provider store={store}>
          <RouterProvider router={routers} />
        </Provider>
      </Suspense>
      <Toaster position='top-center' reverseOrder={false} />
    </>
  )
}

export default App
