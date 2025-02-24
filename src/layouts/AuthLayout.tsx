import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import { images } from '~/assets'

const AuthLayout = memo(() => {
  return (
    <main className='relative flex min-h-[1024px] w-full items-stretch'>
      <div className='relative h-full w-full flex-1'>
        <div className='h-full w-full'>
          <img
            src={images.KV_photo}
            alt='kv-photo'
            className='h-full w-full object-cover object-center'
          />
        </div>
        <div className='absolute inset-0 h-full w-full bg-yellow-dark opacity-40' />
        <div className='absolute right-0 top-0 h-full w-20 rounded-bl-[32px] rounded-tl-[32px] bg-yellow-main' />
      </div>
      <div className='flex h-full w-full flex-1 items-stretch bg-yellow-main pr-20'>
        <Outlet />
      </div>
      <img
        src={images.bg_texture}
        alt='bg-texture'
        className='pointer-events-none absolute inset-0 isolate h-full w-full opacity-55'
      />
    </main>
  )
})

export default AuthLayout
