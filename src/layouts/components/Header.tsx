import { memo } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'

const Header = memo(() => {
  const navigate = useNavigate()

  return (
    <header className='h-[126px] w-full rounded-1 border-2 border-gray-2 bg-gray-1 p-12 flex-between'>
      <div className='flex items-center gap-6'>
        <ButtonBase variant='green' size='icon' onClick={() => navigate(-1)}>
          <span className='mgc_arrow_left_fill' />
        </ButtonBase>
        <p className='text-[32px]/[48px] text-pink-main'>TRANG GIỮ CHUỖI</p>
      </div>
      <div className='flex items-center gap-[10px]'>
        <div className='flex w-[202px] flex-col'>
          <ButtonBase variant='pink' className='w-full' LeftIcon={() => <span className='mgc_' />}>
            Xem thông tin
          </ButtonBase>
          <ButtonBase className='w-full' LeftIcon={() => <span className='mgc_' />}>
            Túi quà
          </ButtonBase>
        </div>
        <div className='h-full rounded-2xl border border-gray-2 p-3 flex-center'>
          <p>Chuỗi hiện tại</p>
          <div className='flex items-center'>
            <p>12</p>
          </div>
        </div>
        <Logo className='h-full w-auto' />
      </div>
    </header>
  )
})

export default Header
