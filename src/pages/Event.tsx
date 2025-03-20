import classNames from 'classnames'
import { memo, useCallback, useEffect } from 'react'
import { icons, images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import Logo from '~/components/shared/Logo'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import { getUserRoutes } from '~/store/route/route.slice'

const Event = memo(() => {
  const dispatch = useAppDispatch()

  const { routes } = useAppSelector((s) => s.route)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const handlePassRoute = useCallback(() => {
    dispatch(getUserRoutes())
  }, [])

  useEffect(() => {
    dispatch(getUserRoutes())
  }, [])

  return (
    <div className='relative flex h-full w-full max-w-3xl flex-1 flex-col items-stretch px-4 py-[30px]'>
      {/* <div className='-bottom-80 size-[729px] shrink-0 rounded-full bg-skin-main absolute-center-x' /> */}
      <div className='flex items-start justify-between'>
        <Logo className='w-[100px]' />
        <div className='h-full w-full max-w-[136px] flex-1 flex-col rounded-2xl border border-gray-2 p-3 text-[20px]/[20px] text-orange-main flex-center md:w-[170px] xl:w-[189px]'>
          <p className='text-nowrap font-dongle'>Chuỗi hiện tại</p>
          <div className='flex items-center gap-1'>
            <p>{generalInfo?.streak}</p>
            <img src={icons.rose} alt='rose' className='h-auto w-[21px]' />
          </div>
        </div>
      </div>

      <CharactersAvatar className='mt-10 !w-full' />

      {/* Step */}
      <div className='mt-10 flex items-center gap-2'>
        <div className='flex w-full gap-[2px]'>
          {Array.from({ length: 5 }).map((_, idx) => (
            <div className='flex w-full flex-1 flex-col justify-center gap-4'>
              <p className={classNames('h-4 text-center font-dongle text-base text-gray-3')}>
                Trạm {idx + 1}
              </p>
              <div
                className={classNames(
                  idx === 0 && 'rounded-l-full',
                  idx === 4 && 'rounded-r-full',
                  'h-3',
                  'bg-gray-8'
                )}
              />
            </div>
          ))}
        </div>
        <img src={images.school} alt='school' className='h-[30px]' />
      </div>

      <div className='mb-10 mt-5 flex-1'>
        <Swiper className='mySwiper'>
          {routes.map((route) => (
            <SwiperSlide key={route.routeId} className='h-full'>
              <div className='flex flex-col items-center justify-center gap-[10px]'>
                <p className='text-[32px]/[38px] text-pink-main'>Trạm {route.routeId}</p>
                <img src={images.stamp} alt='stamp' className='size-[189px]' />
                <div className='flex items-center gap-3'>
                  <span className='mgc_location_fill text-pink-main' />
                  <p className='text-xl text-gray-4'>Trạm {route.routeName}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className='flex flex-col justify-center'>
        <ButtonBase variant='pink' onClick={handlePassRoute}></ButtonBase>
        <ButtonBase
          variant='pink'
          className='w-full'
          LeftIcon={() => <span className='mgc_location_fill' />}
          onClick={handlePassRoute}
        >{`Đến trạm`}</ButtonBase>
      </div>
    </div>
  )
})

export default Event
