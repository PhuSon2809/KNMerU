import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { images } from '~/assets'

const BaseLayout = memo(() => {
  return (
    <main className='relative flex h-full min-h-screen w-full flex-col items-stretch'>
      <Outlet />
      <img
        src={images.bg_texture}
        alt='bg-texture'
        className='pointer-events-none absolute inset-0 isolate size-full opacity-40'
      />
    </main>
  )
})

export default BaseLayout
