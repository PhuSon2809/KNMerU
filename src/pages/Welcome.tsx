import { memo, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import ButtonBase from '~/components/shared/ButtonBase'
import Logo from '~/components/shared/Logo'
// import toast from 'react-hot-toast'
import { path } from '~/constants/path'
import { setIsSuccess } from '~/store/auth/auth.slice'
import { useAppDispatch } from '~/store/configStore'

const Welcome = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

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
        onClick: () => {
          dispatch(setIsSuccess(false))
          navigate(path.register)
        }
      }
    ],
    []
  )

  // const buttons = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       variant: 'blue',
  //       label: 'Đăng nhập',
  //       icon: 'mgc_moon_stars_fill',
  //       onClick: () => {
  //         toast.error(
  //           'Hành trình Chăm Mer hiện đã kết thúc. Cảm ơn các bạn đã quan tâm đến dự án "Khơi Nguồn Mer Ước".',
  //           {
  //             position: 'top-right',
  //             style: {
  //               whiteSpace: 'pre-line'
  //             }
  //           }
  //         );
  //       }
  //     },
  //     {
  //       id: 2,
  //       variant: 'pink',
  //       label: 'Đăng ký ngay',
  //       icon: 'mgc_sun_fill',
  //       onClick: () => {
  //         toast.error(
  //           'Hành trình Chăm Mer hiện đã kết thúc. Cảm ơn các bạn đã quan tâm đến dự án "Khơi Nguồn Mer Ước".',
  //           {
  //             position: 'top-right',
  //             style: {
  //               whiteSpace: 'pre-line'
  //             }
  //           }
  //         );
  //       }
  //     }
  //   ],
  //   []
  // )

  return (
    <div className='flex-1 flex-col flex-center'>
      <h2 className='text-center text-4xl leading-[50px] text-pink-main md:text-5xl md:leading-[72px]'>
        Chào mừng bạn đến với
      </h2>
      <Logo className='text-white-main h-auto w-[83%]' />
      <div className='mt-11 flex flex-col items-center gap-3 md:flex-row md:gap-[25px]'>
        {buttons.map((button) => (
          <ButtonBase
            key={button.id}
            onClick={button.onClick}
            variant={button.variant as any}
            LeftIcon={() => <span className={button.icon} />}
            className='min-w-[200px] md:min-w-fit'
          >
            {button.label}
          </ButtonBase>
        ))}
      </div>
    </div>
  )
})

export default Welcome
