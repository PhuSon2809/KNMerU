import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useRef } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { z } from 'zod'
import { icons, images } from '~/assets'
import Arrow from '~/components/icons/Arrow'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import { FormControl, FormField, FormItem } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import Logo from '~/components/shared/Logo'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getUserRoutes } from '~/store/route/route.slice'

export const nameFormSchema = z.object({
  code: z.string()
})

const Event = memo(() => {
  const dispatch = useAppDispatch()

  const { routes } = useAppSelector((s) => s.route)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const form = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { code: '' },
    mode: 'onBlur'
  })

  const code = form.watch('code')

  const handlePassRoute = useCallback(() => {
    dispatch(getUserRoutes())
  }, [])

  useEffect(() => {
    dispatch(getUserRoutes())
  }, [])

  return (
    <div className='relative mx-auto flex h-full w-full max-w-3xl flex-1 flex-col items-stretch overflow-hidden px-4 py-[30px]'>
      <div className='-bottom-[590px] z-[-1] size-[729px] shrink-0 rounded-full bg-skin-main opacity-30 absolute-center-x' />
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
      <div className='mt-10 flex items-end gap-2'>
        <div className='flex w-full gap-[2px]'>
          {routes.map((route, idx) => (
            <div key={route.routeId} className='flex w-full flex-1 flex-col justify-center gap-4'>
              <p className={classNames('h-4 text-center font-dongle text-base text-gray-3')}>
                {route.routeName}
              </p>
              <div
                className={classNames(
                  idx === 0 && 'rounded-l-full',
                  idx === 4 && 'rounded-r-full',
                  route.isCompleted ? 'bg-pink-main' : 'bg-gray-8',
                  'h-3'
                )}
              />
            </div>
          ))}
        </div>
        <img src={images.school} alt='school' className='h-[30px]' />
      </div>

      <div className='relative my-10 flex-1'>
        <Swiper
          ref={swiperRef}
          initialSlide={1}
          slidesPerView={1}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current ? prevRef.current : undefined,
            nextEl: nextRef.current ? nextRef.current : undefined
          }}
        >
          {routes.map((route) => (
            <SwiperSlide key={route.routeId} className='h-full'>
              <div className='flex flex-col items-center justify-center gap-5'>
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

        <button
          ref={prevRef}
          className='left-0 z-10 rotate-180 absolute-center-y'
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <Arrow />
        </button>
        <button
          ref={nextRef}
          className='right-0 z-10 absolute-center-y'
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <Arrow />
        </button>
      </div>

      <div className='flex flex-col items-center justify-center gap-8'>
        <FormProvider {...form}>
          <div className='flex w-full items-center gap-3 lg:w-fit'>
            <FormField
              control={form.control}
              name='code'
              render={({ field, fieldState }) => (
                <FormItem className='w-full md:w-fit'>
                  <FormControl>
                    <InputBase
                      {...field}
                      placeholder='code'
                      value={field.value || ''}
                      error={fieldState.error?.message}
                      containerClassName='w-full md:w-[318px]'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <span
              className={classNames(
                code !== '' ? 'text-green-main' : 'text-gray-5',
                'mgc_check_circle_line'
              )}
            />
          </div>
        </FormProvider>
        <button className='flex size-[87px] items-center justify-center rounded-full border border-pink-main bg-white'>
          <img src={images.cards} alt='cards' />
        </button>
        <ButtonBase
          variant='pink'
          className='w-full max-w-[354px]'
          LeftIcon={() => <span className='mgc_location_fill' />}
          onClick={handlePassRoute}
        >{`Đến trạm`}</ButtonBase>
      </div>
    </div>
  )
})

export default Event
