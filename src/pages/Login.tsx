// import { zodResolver } from '@hookform/resolvers/zod'
// import { CredentialResponse, GoogleLogin } from '@react-oauth/google'
// import { jwtDecode } from 'jwt-decode'
// import { memo, useCallback, useState } from 'react'
import { memo} from 'react' // xóa lun 
// import { FormProvider, useForm } from 'react-hook-form'
// import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
// import { z } from 'zod'
// import { UserGGInfor } from '~/@types'
import { icons } from '~/assets'
import ButtonBase from '~/components/shared/ButtonBase'
// import { FormControl, FormField, FormItem, FormMessage } from '~/components/shared/Form'
// import InputBase from '~/components/shared/InputBase'
import Logo from '~/components/shared/Logo'
import { path } from '~/constants/path'
// import { socials } from '~/mocks/data'
// import { getUserInfor, login, loginSocial } from '~/store/auth/auth.slice'
// import { useAppDispatch, useAppSelector } from '~/store/configStore'
// import { getErrorMessage, isSuccessRes } from '~/utils'

// export const loginFormSchema = z.object({
//   email: z.string().min(1, 'Vui lòng nhập email').email('Email không đúng định dạng'),
//   password: z.string().min(1, 'Vui lòng nhập mật khẩu')
// })

const Login = memo(() => {
  const navigate = useNavigate()
  // const dispatch = useAppDispatch()

  // const { isLoading } = useAppSelector((s) => s.auth)

  // const [showPassword, setShowPassword] = useState<boolean>(false)
  // const [ggInor, setGGInfor] = useState<UserGGInfor | null>(null)

  // const form = useForm<z.infer<typeof loginFormSchema>>({
  //   resolver: zodResolver(loginFormSchema),
  //   defaultValues: { email: '', password: '' }
  // })

  // const onSubmitForm = useCallback(async (values: z.infer<typeof loginFormSchema>) => {
  //   if (isLoading) return
  //   try {
  //     const payload = await dispatch(login(values)).unwrap()
  //     if (!isSuccessRes(payload.status)) return toast.error('Đăng nhập thất bại! Thử lại nhé.')
  //     const payloadUserInfor = await dispatch(getUserInfor()).unwrap()
  //     if (isSuccessRes(payloadUserInfor.status) && payloadUserInfor.data.characterId !== null) {
  //       navigate(path.home)
  //     } else {
  //       navigate(path.chooseCharacters)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //     toast.error(getErrorMessage(error) || 'Đăng nhâp thất bại! Thử lại nhé.')
  //   }
  // }, [])

  // const onLoginGoogle = useCallback(async (response: CredentialResponse) => {
  //   if (!response.credential) return toast.error('Đăng nhập Google thất bại! Thử lại nhé.')
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
  //     if (!isSuccessRes(payload.status))
  //       return toast.error('Đăng nhập Google thất bại! Thử lại nhé.')
  //     const payloadUserInfor = await dispatch(getUserInfor()).unwrap()
  //     if (isSuccessRes(payloadUserInfor.status) && payloadUserInfor.data.characterId !== null) {
  //       navigate(path.home)
  //     } else {
  //       navigate(path.chooseCharacters)
  //     }
  //   } catch (error) {
  //     console.log('error', error)
  //     toast.error(getErrorMessage(error) || 'Đăng nhâp thất bại! Thử lại nhé.')
  //   }
  // }, [])

  return (
    <div className='relative size-full flex-1 pb-40 pt-20 flex-center'>
      <div className='z-10 flex min-w-full flex-col gap-11 xl:min-w-[569px]'>
        <div className='flex flex-col items-start justify-between gap-5 md:flex-row md:items-center md:gap-0'>
          <ButtonBase variant='green' size='icon' onClick={() => navigate(path.welcome)}>
            <span className='mgc_arrow_left_fill' />
          </ButtonBase>
          <Logo className='mx-auto h-auto w-full md:h-[110px] md:w-auto' />
          <div className='hidden md:flex'></div>
        </div>

        <div className='space-y-5 rounded-1 border-[3px] border-dashed border-pink-main bg-white/90 p-5 backdrop-blur-[20px] md:p-6'>
          {/* <FormProvider {...form}>
            <div className='space-y-[18px]'>
              <FormField
                control={form.control}
                name='email'
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormControl> */}
                    <p>Hành trình Chăm Mer hiện đã kết thúc. Cảm ơn các bạn đã quan tâm đến dự án "Khơi Nguồn Mer Ước".</p>
                      {/* <InputBase
                        // {...field}
                        // label='Hành trình Chăm Mer hiện đã kết thúc. Cảm ơn các bạn đã quan tâm đến dự án "Khơi Nguồn Mer Ước".*'
                        // placeholder='VanA111@gmail.com'
                        // value={field.value || ''}
                        // error={fieldState.error?.message}
                      /> */}
                      {/* {fieldState.error?.message && (
                        <FormMessage>{fieldState.error?.message}</FormMessage>
                      )}
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field, fieldState }) => (
                  <FormItem>
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
              <ButtonBase
                size='md'
                className='!mt-[46px] w-full'
                isLoading={isLoading}
                onClick={() => form.handleSubmit(onSubmitForm)()}
                LeftIcon={() => <span className='mgc_moon_stars_fill' />}
              >
                Đăng nhập
              </ButtonBase>
            </div>
          </FormProvider>
          <div className='flex items-center gap-3'>
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
                onClick={() => console.log('login')}
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
                      <p className='line-clamp-1 truncate text-gray-3'>{ggInor.email}</p>
                    </div>
                  </div>
                ) : (
                  <span className={social.icon} />
                )}
              </ButtonBase>
            ))}
          </div>*/}
        </div>
      </div>

      <img
        src={icons.leaf}
        alt='leaf'
        className='absolute -left-10 top-0 w-[88px] -rotate-45 lg:inset-0'
      />
      <img
        src={icons.crown}
        alt='crown'
        className='absolute -right-10 top-16 w-[90px] rotate-[19deg] md:-top-5 lg:right-0'
      />
      <img
        src={icons.blink_1}
        alt='blink-1'
        className='absolute bottom-5 right-16 w-[105px] lg:bottom-0 lg:right-5'
      />
    </div>
  )
})

export default Login