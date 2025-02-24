import { memo, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { images } from '~/assets'
import BgTexture from '~/components/shared/BgTexture'

const AuthLayout = memo(() => {
  const location = useLocation()

  const contentRef = useRef<HTMLDivElement>(null)

  const [contentHeight, setContentHeight] = useState<number>(0)

  useEffect(() => {
    const updateHeight = () => {
      if (contentRef.current) setContentHeight(contentRef.current.clientHeight)
    }
    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [location.pathname])

  return (
    <main className='relative flex min-h-screen w-full'>
      <div className='relative w-full flex-1'>
        <div className='min-h-screen w-full' style={{ height: `${contentHeight}px` }}>
          <img
            src={images.KV_photo}
            alt='kv-photo'
            className='size-full object-cover object-center'
          />
        </div>
        <div className='absolute inset-0 size-full bg-yellow-dark opacity-40' />
        <div className='absolute right-0 top-0 h-full w-20 rounded-bl-[32px] rounded-tl-[32px] bg-yellow-main' />
      </div>
      <div
        ref={contentRef}
        className='flex size-full min-h-screen flex-1 items-center bg-yellow-main pr-20'
      >
        <Outlet />
      </div>
      <BgTexture />
    </main>
  )
})

export default AuthLayout
