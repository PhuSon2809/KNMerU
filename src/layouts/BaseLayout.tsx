import { memo } from 'react'
import { Outlet } from 'react-router-dom'

const BaseLayout = memo(() => {
  return (
    <div>
      <Outlet />
    </div>
  )
})

export default BaseLayout
