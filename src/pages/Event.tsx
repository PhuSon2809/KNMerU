import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { memo, useCallback, useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { z } from 'zod'
import { icons, images } from '~/assets'
import DialogCards from '~/components/features/event/DialogCards'
import Arrow from '~/components/icons/Arrow'
import ButtonBase from '~/components/shared/ButtonBase'
import CharactersAvatar from '~/components/shared/CharactersAvatar'
import Comment from '~/components/shared/Comment'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { getUserCards } from '~/store/card/card.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getGeneralInfor } from '~/store/root/root.slice'
import { finishRoute, getUserRoutes, passRoute } from '~/store/route/route.slice'
import { getErrorMessage, isSuccessRes } from '~/utils'

export type OpenState = {
  start: boolean
  cards: boolean
  finish: boolean
  thanks: boolean
}

export const nameFormSchema = z.object({
  code: z.string().min(1, 'Vui lòng nhập mã trạm')
})

const Event = memo(() => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { userInfo } = useAppSelector((s) => s.auth)
  const { generalInfo } = useAppSelector((s) => s.rootData)
  const { routes, routeData, isLoading } = useAppSelector((s) => s.route)

  const swiperRef = useRef<any>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState<OpenState>({
    start: false,
    cards: false,
    finish: false,
    thanks: false
  })

  const form = useForm<z.infer<typeof nameFormSchema>>({
    resolver: zodResolver(nameFormSchema),
    defaultValues: { code: '' },
    mode: 'onBlur'
  })

  const code = form.watch('code')

  const setOpenState = useCallback(
    (key: keyof OpenState) => (open: boolean) => {
      setOpen((prev) => ({ ...prev, [key]: open }))
    },
    []
  )

  const handlePassRoute = useCallback(async (values: z.infer<typeof nameFormSchema>) => {
    try {
      const res = await dispatch(passRoute(values.code)).unwrap()
      if (isSuccessRes(res.status)) {
        toast.success('Chúc mừng bạn đã hoàn hành trạm!')
        dispatch(getUserCards())
        dispatch(getUserRoutes())
        form.reset()
      }
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error))
    }
  }, [])

  const handleFinishRoute = useCallback(async () => {
    try {
      const res = await dispatch(finishRoute()).unwrap()
      if (isSuccessRes(res.status)) {
        toast.success('Chúc mừng bạn đã vượt lớp thành công!')
        await dispatch(getGeneralInfor())
        navigate(path.home)
      }
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error))
    }
  }, [])

  useEffect(() => {
    if (swiperRef.current?.swiper && routeData?.currentRouteIndex) {
      const slideIndex = Number(routeData.currentRouteIndex) - 1
      if (swiperRef.current.swiper.activeIndex !== slideIndex) {
        swiperRef.current.swiper.slideTo(slideIndex)
      }
    }
  }, [routes, routeData])

  useEffect(() => {
    dispatch(getUserRoutes())
    dispatch(getUserCards())
  }, [])

  return (
    <>
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
        {open.thanks ? (
          <div className='mt-10 flex h-full flex-1 flex-col items-center justify-between'>
            <div className='flex flex-col items-center justify-center gap-6 rounded-2xl border-[4px] border-pink-main p-8 text-center'>
              <Logo className='w-[147px]' />
              <p className='text-3xl text-pink-main'>Cảm ơn</p>
              <p className='text-sm text-blue-main'>
                {userInfo?.characterOriginalName?.split(' ')[2]}{' '}
                {userInfo?.characterName || 'TÊN NHÂN VẬT'} đã chung tay 'Khơi nguồn Mơ Ước', mang
                tri thức đến gần hơn với trẻ em Khmer!
              </p>
            </div>
            <img src={images.school} alt='school' className='w-[280px]' />
            <ButtonBase
              isLoading={isLoading}
              variant='pink'
              className='w-full'
              LeftIcon={() => <span className='mgc_location_fill' />}
              onClick={handleFinishRoute}
            >
              Vượt 1 lớp
            </ButtonBase>
          </div>
        ) : (
          <>
            <div className='mt-10 flex items-end gap-2'>
              <div className='relative flex w-full gap-[2px]'>
                {routes.map((route, idx) => {
                  return (
                    <div
                      key={route.routeId}
                      className='flex w-full flex-1 flex-col justify-center gap-4'
                    >
                      <p
                        className={classNames('h-4 text-center font-dongle text-base text-gray-3')}
                      >
                        Trạm {idx + 1}
                      </p>
                      <div className='relative'>
                        <div
                          ref={divRef}
                          className={classNames(
                            idx === 0 && 'rounded-l-full',
                            idx === 4 && 'rounded-r-full',
                            route.isCompleted
                              ? 'bg-pink-main'
                              : routeData?.currentRouteIndex === idx + 1
                                ? 'bg-green-main'
                                : 'bg-gray-8',
                            'h-3'
                          )}
                        />
                        <img
                          src={images.stamp}
                          alt='stamp'
                          className={classNames(
                            routeData?.currentRouteIndex === idx + 1 ? 'scale-100' : 'scale-0',
                            'size-6 absolute-center-y absolute-center-x transition-500'
                          )}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
              <img src={images.school} alt='school' className='h-[30px]' />
            </div>

            <div className='relative my-10 flex-1'>
              <Swiper
                ref={swiperRef}
                initialSlide={Number(routeData?.currentRouteIndex) - 1}
                slidesPerView={1}
                modules={[Navigation]}
                navigation={{
                  prevEl: prevRef.current ? prevRef.current : undefined,
                  nextEl: nextRef.current ? nextRef.current : undefined
                }}
              >
                {routes.map((route, idx) => (
                  <SwiperSlide key={route.routeId} className='h-full'>
                    <div className='flex flex-col items-center justify-center gap-5'>
                      <p className='text-[32px]/[38px] text-pink-main'>Trạm {idx + 1}</p>
                      <div
                        onClick={() => {
                          if (open.finish && idx === 4 && open.finish) setOpenState('thanks')(true)
                        }}
                        className={classNames(
                          idx === 4 ? 'h-[189px] max-w-[280px]' : 'size-[189px]',
                          'flex items-center justify-center'
                        )}
                      >
                        <img
                          src={idx === 4 ? images.school : images.stamp}
                          alt='stamp'
                          className={classNames(
                            idx === 4 && open.finish && 'rounded-1 border border-pink-main',
                            idx === 4 ? 'h-auto w-full' : 'size-full',
                            route.isCompleted ? 'opacity-100' : 'opacity-50'
                          )}
                        />
                      </div>
                      <div className='flex items-center gap-3'>
                        <span className='mgc_location_fill text-pink-main' />
                        <p className='text-xl text-gray-4'>Trạm {route.routeName}</p>
                      </div>

                      {/* Hiển thị thông tin thẻ đã dùng nếu có */}
                      <div>
                        {route.usedCard && (
                          <div className="text-center text-sm text-gray-600 mt-2">
                            Đã sử dụng thẻ: <span className="font-bold text-pink-main">
                              {route.usedCard.cardName}
                            </span>
                            {route.usedCard.usedAt && (
                              <span className="block text-xs text-gray-500">
                                {new Date(route.usedCard.usedAt).toLocaleString()}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              <button
                disabled={isLoading}
                ref={prevRef}
                className={classNames(
                  isLoading ? 'opacity-0' : 'opacity-1000',
                  '-left-1 z-10 rotate-180 absolute-center-y transition-300'
                )}
                onClick={() => {
                  const currentIndex = swiperRef.current?.swiper.activeIndex
                  const prevIndex = currentIndex - 1
                  if (prevIndex >= 0 && routes[prevIndex]?.isCompleted) {
                    swiperRef.current?.swiper.slideTo(prevIndex)
                  }
                }}
              >
                <Arrow />
              </button>
              <button
                disabled={isLoading}
                ref={nextRef}
                className={classNames(
                  isLoading ? 'opacity-0' : 'opacity-1000',
                  '-right-1 z-10 absolute-center-y transition-300'
                )}
                onClick={() => {
                  const currentIndex = swiperRef.current?.swiper.activeIndex
                  const nextIndex = currentIndex + 1
                  if (
                    nextIndex < routes.length &&
                    (routes[nextIndex]?.isCompleted || nextIndex + 1 === Number(routeData?.currentRouteIndex))
                  ) {
                    swiperRef.current?.swiper.slideTo(nextIndex)
                  }
                }}
              >
                <Arrow />
              </button>
            </div>

            <div className='flex flex-col items-center justify-center gap-8'>
              <FormProvider {...form}>
                <div className='mx-auto flex w-full items-center justify-center gap-3 lg:w-fit'>
                  <FormField
                    control={form.control}
                    name='code'
                    render={({ field, fieldState }) => (
                      <FormItem className='w-full md:w-fit'>
                        <FormControl>
                          <InputBase
                            {...field}
                            disabled={routes[Number(routeData?.currentRouteIndex) - 1]?.isCompleted}
                            placeholder='code'
                            value={field.value || ''}
                            error={fieldState.error?.message}
                            containerClassName='w-full md:w-[318px]'
                          />
                          {fieldState.error?.message && (
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                          )}
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
                disabled={isLoading}
                onClick={() => setOpenState('cards')(true)}
                className='flex size-[87px] items-center justify-center rounded-full border border-pink-main bg-white'
              >
                <img src={images.cards} alt='cards' />
              </button>
              {routeData?.isFinished ? (
                <ButtonBase
                  variant='pink'
                  className='w-full max-w-[354px]'
                  onClick={() => setOpenState('finish')(true)}
                >
                  Hoàn thành sự kiện
                </ButtonBase>
              ) : (
                <ButtonBase
                  isLoading={isLoading}
                  variant='pink'
                  className='w-full max-w-[354px]'
                  LeftIcon={() => <span className='mgc_location_fill' />}
                  onClick={() => form.handleSubmit(handlePassRoute)()}
                >
                  Đến trạm {Number(routeData?.currentRouteIndex) + 1}
                </ButtonBase>
              )}

              {open.finish && (
                <Comment
                  content='Click vào hình ngôi trường đễ nhận được những điều bất ngờ'
                  className='bottom-7 w-[95%] max-w-[354px] absolute-center-x'
                />
              )}
            </div>
          </>
        )}
      </div>
      <DialogCards open={open.cards} setOpen={(open) => setOpenState('cards')(open)} />
    </>
  )
})

export default Event