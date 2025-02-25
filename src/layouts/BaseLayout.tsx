import { memo } from 'react'
import { Outlet } from 'react-router-dom'
import BgTexture from '~/components/shared/BgTexture'

const BaseLayout = memo(() => {
  return (
    <main className='relative flex h-full min-h-screen w-full flex-col items-stretch'>
      <Outlet />
      <BgTexture />
    </main>
  )
})

export default BaseLayout
