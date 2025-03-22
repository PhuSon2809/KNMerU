import classNames from 'classnames'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { z } from 'zod'
import { Swiper, SwiperSlide } from 'swiper/react'
import { icons, images } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import { FormControl, FormField, FormItem } from '~/components/shared/Form'
import Logo from '~/components/shared/Logo'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getUserRoutes } from '~/store/route/route.slice'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import InputBase from '~/components/shared/InputBase'
import Arrow from '~/components/icons/Arrow'
import { Navigation } from 'swiper/modules'

export const codeFormSchema = z.object({
  code: z.string()
})

const Event = memo(() => {
  const dispatch = useAppDispatch()

  const { routes } = useAppSelector((s) => s.route)
  const { generalInfo } = useAppSelector((s) => s.rootData)

  const swiperRef = useRef<any>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const [isOpenCards, setIsOpenCards] = useState<boolean>(false)

  const form = useForm<z.infer<typeof codeFormSchema>>({
    resolver: zodResolver(codeFormSchema),
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
      <div className='-bottom-[570px] z-[-1] size-[729px] shrink-0 rounded-full bg-skin-main opacity-30 absolute-center-x' />
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
                  'h-3',
                  'bg-gray-8'
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
          grabCursor={false}
          slidesPerView={1}
          initialSlide={1}
          modules={[Navigation]}
          navigation={{
            prevEl: prevRef.current ? prevRef.current : undefined,
            nextEl: nextRef.current ? nextRef.current : undefined
          }}
          onInit={(swiper) => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.prevEl = prevRef.current
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line no-param-reassign
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.update()
          }}
        >
          {routes.map((route) => (
            <SwiperSlide key={route.routeId} className='h-full'>
              <div className='flex flex-col items-center justify-center gap-[10px]'>
                <p className='text-[32px]/[38px] text-pink-main'>Trạm {route.routeId}</p>
                <img src={images.stamp} alt='stamp' className='my-5 size-[189px]' />
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
          className='left-0 z-[10] rotate-180 absolute-center-y'
          onClick={() => swiperRef.current?.swiper.slidePrev()}
        >
          <Arrow />
        </button>
        <button
          ref={nextRef}
          className='right-0 z-[10] absolute-center-y'
          onClick={() => swiperRef.current?.swiper.slideNext()}
        >
          <Arrow />
        </button>
      </div>

      <div className='ite flex flex-col items-center justify-center gap-8'>
        <FormProvider {...form}>
          <div className='flex w-full items-center justify-center gap-3 lg:w-fit'>
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
        <button
          onClick={() => setIsOpenCards((prev) => !prev)}
          className='flex size-[87px] items-center justify-center rounded-full border border-pink-main bg-white'
        >
          <img src={icons.cards} alt='cards' />
        </button>
        <ButtonBase
          variant='pink'
          className='w-full max-w-[360px]'
          LeftIcon={() => <span className='mgc_location_fill' />}
          onClick={handlePassRoute}
        >{`Đến trạm`}</ButtonBase>
      </div>
    </div>
  )
})

export default Event
