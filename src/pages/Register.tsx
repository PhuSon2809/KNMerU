import { zodResolver } from '@hookform/resolvers/zod'
import classNames from 'classnames'
import { memo, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { RegisterInput } from '~/@types'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
import InputBase from '~/components/shared/InputBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
import { register, setIsSuccess } from '~/store/auth/auth.slice'
import { useAppDispatch, useAppSelector } from '~/store/configStore'
import { getErrorMessage, isSuccessRes } from '~/utils'

export const registerFormSchema = z
  .object({
    name: z.string().min(1, 'Vui lòng nhập tên'),
    email: z.string().email('Email không hợp lệ'),
    phone: z
      .string()
      .min(1, 'Vui lòng nhập số điện thoại')
      .regex(/^(?:\+84|0)(?:\d{9}|\d{10})$/, 'Số điện thoại không hợp lệ'),
    password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    checkPassword: z.string().min(6, 'Mật khẩu xác nhận phải có ít nhất 6 ký tự')
  })
  .refine((data) => data.password === data.checkPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['checkPassword']
  })

const Register = memo(() => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { isLoading, isSuccess } = useAppSelector((s) => s.auth)

  // const [ggInor, setGGInfor] = useState<UserGGInfor | null>(null)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showPasswordCheck, setShowPasswordCheck] = useState<boolean>(false)

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: { name: '', email: '', phone: '', password: '', checkPassword: '' }
  })

  const onSubmitForm = async (values: z.infer<typeof registerFormSchema>) => {
    if (isLoading) return
    try {
      const params: RegisterInput = {
        firstName: values.name,
        lastName: '',
        email: values.email,
        phoneNumber: values.phone,
        password: values.password
      }
      const payload = await dispatch(register(params)).unwrap()
      if (isSuccessRes(payload.status)) console.log('register success res ===> ', payload.status)
    } catch (error) {
      console.log('error', error)
      toast.error(getErrorMessage(error) || 'Đăng ký thất bại! Thử lại nhé.')
    }
  }

  // const onLoginGoogle = useCallback(async (response: CredentialResponse) => {
  //   if (!response.credential) return toast.error('Đăng ký Google thất bại! Thử lại nhé.')
  //   if (isLoading) return
  //   try {
  //     const decodedToken: any = jwtDecode(response.credential)
  //     setGGInfor({
  //       email: decodedToken.email,
  //       imageUrl: decodedToken.picture,
  //       name: decodedToken.name
  //     })
  //     const payload = await dispatch(
  //       loginSocial({
  //         idToken: response.credential,
  //         provider: 2
  //       })
  //     ).unwrap()
  //     if (!isSuccessRes(payload.status)) return toast.error('Đăng ký Google thất bại! Thử lại nhé.')
  //     const payloadUserInfor = await dispatch(getUserInfor()).unwrap()
  //     if (isSuccessRes(payloadUserInfor.status) && payloadUserInfor.data.characterId !== null) {
  //       navigate(path.home)
  //     } else {
  //       navigate(path.chooseCharacters)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //     toast.error(getErrorMessage(error) || 'Đăng ký thất bại! Thử lại nhé.')
  //   }
  // }, [])

  return (
    <div className={classNames('relative size-full flex-1 pb-40 pt-20 flex-center')}>
      {isSuccess ? (
        <div className='flex flex-col items-center justify-center gap-11'>
          <Logo className='w-[250px] md:w-[325px]' />
          <div className='flex flex-col items-center gap-3'>
            <img src={icons.star} alt='star' className='w-[80px]' />
            <p className='text-center text-[40px]/[60px] text-pink-main md:text-[60px]/[90px]'>
              Chúc mừng bạn đã đăng ký <span className='text-green-dark'>thành công</span>
            </p>
          </div>
          <div className='w-full gap-3 flex-center md:gap-[25px]'>
            <ButtonBase variant='green' size='icon' onClick={() => dispatch(setIsSuccess(false))}>
              <span className='mgc_arrow_left_fill' />
            </ButtonBase>
            <ButtonBase
              variant='pink'
              onClick={() => navigate(path.chooseCharacters)}
              LeftIcon={() => <span className='mgc_emoji_2_fill' />}
            >
              Tham gia ngay
            </ButtonBase>
          </div>
        </div>
      ) : (
        <div className='z-10 flex h-full min-w-full flex-col gap-11 xl:min-w-[569px]'>
          <div className='flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-0'>
            <ButtonBase variant='green' size='icon' onClick={() => navigate(path.welcome)}>
              <span className='mgc_arrow_left_fill' />
            </ButtonBase>
            <Logo className='mx-auto h-auto w-full md:h-[110px] md:w-auto' />
            <div className='hidden md:flex'></div>
          </div>

          <div className='space-y-5 rounded-1 border-[3px] border-dashed border-pink-main bg-white/90 p-5 backdrop-blur-[20px] md:p-6'>
            <FormProvider {...form}>
              <div className='space-y-[18px]'>
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Tên của bạn*'
                          placeholder='Nguyễn Văn A'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='email'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Email*'
                          placeholder='VanA111@gmail.com'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name='phone'
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormControl>
                        <InputBase
                          {...field}
                          label='Số điện thoại*'
                          type='number'
                          placeholder='0192381923'
                          value={field.value || ''}
                          error={fieldState.error?.message}
                        />
                        {fieldState.error?.message && (
                          <FormMessage>{fieldState.error?.message}</FormMessage>
                        )}
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className='flex w-full flex-col items-center gap-[18px] md:flex-row'>
                  <FormField
                    control={form.control}
                    name='password'
                    render={({ field, fieldState }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <InputBase
                            {...field}
                            label='Nhập mật khẩu*'
                            placeholder='************'
                            value={field.value || ''}
                            error={fieldState.error?.message}
                            type={showPassword ? 'text' : 'password'}
                            RightIcon={() => (
                              <button onClick={() => setShowPassword((prev) => !prev)}>
                                <span
                                  className={showPassword ? 'mgc_eye_fill' : 'mgc_eye_close_fill'}
                                />
                              </button>
                            )}
                          />
                          {fieldState.error?.message && (
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='checkPassword'
                    render={({ field, fieldState }) => (
                      <FormItem className='w-full'>
                        <FormControl>
                          <InputBase
                            {...field}
                            label='Nhập lại mật khẩu*'
                            placeholder='************'
                            value={field.value || ''}
                            error={fieldState.error?.message}
                            type={showPasswordCheck ? 'text' : 'password'}
                            RightIcon={() => (
                              <button onClick={() => setShowPasswordCheck((prev) => !prev)}>
                                <span
                                  className={
                                    showPasswordCheck ? 'mgc_eye_fill' : 'mgc_eye_close_fill'
                                  }
                                />
                              </button>
                            )}
                          />
                          {fieldState.error?.message && (
                            <FormMessage>{fieldState.error?.message}</FormMessage>
                          )}
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <ButtonBase
                  size='md'
                  variant='green'
                  className='!mt-[46px] w-full'
                  isLoading={isLoading}
                  onClick={() => form.handleSubmit(onSubmitForm)()}
                  LeftIcon={() => <span className='mgc_sun_fill' />}
                >
                  Đăng ký ngay
                </ButtonBase>
              </div>
            </FormProvider>
            {/* <div className='flex items-center gap-3'>
              <div className='h-[1px] w-full bg-orange-main' />
              <p className='font-dongle text-2xl text-orange-main'>Hoặc</p>
              <div className='h-[1px] w-full bg-orange-main' />
            </div>
            <div className='flex w-full items-center justify-center gap-[25px]'>
              {socials.slice(0, 1).map((social) => (
                <ButtonBase
                  key={social.id}
                  size='md'
                  variant='gray'
                  className='social relative w-full max-w-[235px]'
                >
                  <div className='absolute top-1/2 z-10 -translate-y-1/2 scale-110 opacity-0'>
                    <GoogleLogin
                      onSuccess={(response) => onLoginGoogle(response)}
                      onError={() => toast.error('Đăng nhập Google thất bại')}
                      useOneTap
                    />
                  </div>
                  {ggInor ? (
                    <div className='flex items-center gap-2'>
                      <img
                        src={ggInor.imageUrl}
                        referrerPolicy='no-referrer'
                        alt={ggInor.name}
                        className='size-8 shrink-0 rounded-full'
                      />
                      <div className='text-left font-dongle text-[20px]/[20px]'>
                        <p className='line-clamp-1'>Đăng nhập với {ggInor.name}</p>
                        <p className='line-clamp-1 text-gray-3'>{ggInor.email}</p>
                      </div>
                    </div>
                  ) : (
                    <span className={social.icon} />
                  )}
                </ButtonBase>
              ))}
            </div> */}
          </div>
        </div>
      )}
      {!isSuccess && (
        <>
          <img
            src={icons.leaf}
            alt='leaf'
            className='absolute left-5 top-60 w-[70px] -rotate-45 md:left-0 md:top-40 lg:-left-5 xl:left-0'
          />
          <img
            src={icons.crown}
            alt='crown'
            className='absolute -right-10 top-11 w-[90px] rotate-[19deg] lg:-right-10 xl:right-0'
          />
          <img
            src={icons.blink_1}
            alt='blink-1'
            className='xl 2xl: absolute bottom-5 right-10 w-[105px] lg:-right-5 xl:right-0'
          />
        </>
      )}
    </div>
  )
})

export default Register
