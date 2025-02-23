import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'

const Welcome = memo(() => {
  const navigate = useNavigate()

  const buttons = useMemo(
    () => [
      {
        id: 1,
        variant: 'blue',
        label: 'Đăng nhập',
        icon: 'mgc_moon_stars_fill',
        onClick: () => navigate(path.login)
      },
      {
        id: 2,
        variant: 'pink',
        label: 'Đăng ký ngay',
        icon: 'mgc_sun_fill',
        onClick: () => navigate(path.register)
      }
    ],
    []
  )

  return (
    <div className='flex-1 flex-col flex-center'>
      <h2 className='text-5xl leading-[72px] text-pink-main'>Chào mừng bạn đến với</h2>
      <Logo className='text-white-main h-auto w-[83%]' />
      <div className='mt-11 flex items-center gap-[25px]'>
        {buttons.map((button) => (
          <ButtonBase
            key={button.id}
            onClick={button.onClick}
            variant={button.variant as any}
            LeftIcon={() => <span className={button.icon} />}
          >
            {button.label}
          </ButtonBase>
        ))}
      </div>
    </div>
  )
})

export default Welcome
