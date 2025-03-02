import classNames from 'classnames'
import { memo, useEffect, useRef, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { images } from '~/assets'
import BgTexture from '~/components/shared/BgTexture'
import { path } from '~/constants/path'

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
    <main className='relative flex min-h-[900px] w-full overflow-hidden md:min-h-[1024px]'>
      <div className='relative hidden w-full flex-1 shrink-0 lg:flex'>
        <div
          className='min-h-[900px] w-full md:min-h-[1024px]'
          style={{ height: `${contentHeight}px` }}
        >
          <img
            src={images.KV_photo}
            alt='kv-photo'
            className='size-full object-cover object-center'
          />
        </div>
        <div className='absolute inset-0 size-full bg-yellow-dark opacity-40' />
        <div className='absolute right-0 top-0 h-full w-16 rounded-bl-[32px] rounded-tl-[32px] bg-yellow-main xl:w-20' />
      </div>
      <div
        ref={contentRef}
        className={classNames(
          location.pathname === path.register
            ? 'min-h-[1091px]'
            : 'min-h-[900px] md:min-h-[1024px]',
          'flex size-full min-h-[900px] flex-1 items-center bg-yellow-main px-5 md:min-h-[1024px] md:pl-20 md:pr-20 lg:pl-0 lg:pr-16 xl:pr-20'
        )}
      >
        <Outlet />
      </div>
      <BgTexture />
    </main>
  )
})

export default AuthLayout
